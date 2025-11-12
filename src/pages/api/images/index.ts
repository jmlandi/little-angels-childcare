import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { IncomingForm, File, Files } from 'formidable';
import { readFileSync } from 'fs';
import { pool } from '@infrastructure/database/PostgresClient';
import { S3Service } from '@infrastructure/services/S3Service';
import { verifyToken, readCookie } from '@infrastructure/auth';

export const config = {
  api: {
    bodyParser: false,
  },
};

interface ImageRecord {
  id: string;
  name: string;
  url: string;
  alt_text: string | null;
  created_at: string;
  updated_at: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check authentication
  const token = readCookie(req, 'authToken');
  if (!token || !verifyToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    switch (req.method) {
      case 'GET':
        await handleGet(req, res);
        break;
      case 'POST':
        await handlePost(req, res);
        break;
      case 'PUT':
        await handlePut(req, res);
        break;
      case 'DELETE':
        await handleDelete(req, res);
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Images API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT id, name, url, alt_text, created_at, updated_at FROM images ORDER BY created_at DESC'
    );
    res.status(200).json({ images: result.rows });
  } finally {
    client.release();
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const form = new IncomingForm({
    maxFileSize: 10 * 1024 * 1024, // 10MB
  });

  form.parse(req, async (err: any, fields: any, files: any) => {
    if (err) {
      return res.status(400).json({ error: 'File parsing error' });
    }

    const file = Array.isArray(files.image) ? files.image[0] : files.image;
    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
    const altText = Array.isArray(fields.altText) ? fields.altText[0] : fields.altText;

    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    try {
      // Read file and upload to S3
      const fileBuffer = readFileSync(file.filepath);
      const imageUrl = await S3Service.uploadImage(
        fileBuffer,
        file.originalFilename || 'unnamed.jpg',
        file.mimetype || 'image/jpeg'
      );

      // Save to database
      const client = await pool.connect();
      try {
        const result = await client.query(
          'INSERT INTO images (name, url, alt_text) VALUES ($1, $2, $3) RETURNING *',
          [name || file.originalFilename, imageUrl, altText || null]
        );

        res.status(201).json({ image: result.rows[0] });
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Failed to upload image' });
    }
  });
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ error: 'Image ID is required' });
  }

  const form = new IncomingForm({
    maxFileSize: 10 * 1024 * 1024, // 10MB
  });

  form.parse(req, async (err: any, fields: any, files: any) => {
    if (err) {
      return res.status(400).json({ error: 'File parsing error' });
    }

    const file = Array.isArray(files.image) ? files.image[0] : files.image;
    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
    const altText = Array.isArray(fields.altText) ? fields.altText[0] : fields.altText;

    const client = await pool.connect();
    try {
      let updateQuery = 'UPDATE images SET updated_at = CURRENT_TIMESTAMP';
      const queryParams: any[] = [];
      let paramCount = 0;

      if (name) {
        updateQuery += `, name = $${++paramCount}`;
        queryParams.push(name);
      }

      if (altText !== undefined) {
        updateQuery += `, alt_text = $${++paramCount}`;
        queryParams.push(altText);
      }

      // If new file is provided, upload to S3 and update URL
      if (file) {
        // Get old image URL to delete from S3
        const oldImageResult = await client.query('SELECT url FROM images WHERE id = $1', [id]);
        if (oldImageResult.rows.length > 0) {
          try {
            await S3Service.deleteImage(oldImageResult.rows[0].url);
          } catch (error) {
            console.warn('Failed to delete old image from S3:', error);
          }
        }

        // Upload new image
        const fileBuffer = readFileSync(file.filepath);
        const imageUrl = await S3Service.uploadImage(
          fileBuffer,
          file.originalFilename || 'unnamed.jpg',
          file.mimetype || 'image/jpeg'
        );

        updateQuery += `, url = $${++paramCount}`;
        queryParams.push(imageUrl);
      }

      updateQuery += ` WHERE id = $${++paramCount} RETURNING *`;
      queryParams.push(id);

      const result = await client.query(updateQuery, queryParams);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Image not found' });
      }

      res.status(200).json({ image: result.rows[0] });
    } finally {
      client.release();
    }
  });
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Image ID is required' });
  }

  const client = await pool.connect();
  try {
    // Get image URL to delete from S3
    const imageResult = await client.query('SELECT url FROM images WHERE id = $1', [id]);
    
    if (imageResult.rows.length === 0) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const imageUrl = imageResult.rows[0].url;

    // Delete from database
    await client.query('DELETE FROM images WHERE id = $1', [id]);

    // Delete from S3
    try {
      await S3Service.deleteImage(imageUrl);
    } catch (error) {
      console.warn('Failed to delete image from S3:', error);
    }

    res.status(200).json({ message: 'Image deleted successfully' });
  } finally {
    client.release();
  }
}