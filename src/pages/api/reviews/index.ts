import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '@infrastructure/database/PostgresClient';
import { verifyToken, readCookie } from '@infrastructure/auth';

interface Review {
  id: number;
  author_name: string;
  rating: number;
  text: string;
  created_at: string;
  visible: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
      case 'PATCH':
        await handlePatch(req, res);
        break;
      case 'DELETE':
        await handleDelete(req, res);
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']);
        res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Reviews API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { visible } = req.query;
  
  const client = await pool.connect();
  try {
    let query = 'SELECT * FROM reviews';
    const params: any[] = [];
    
    if (visible !== undefined) {
      query += ' WHERE visible = $1';
      params.push(visible === 'true');
    }
    
    query += ' ORDER BY created_at DESC';
    
    const result = await client.query(query, params);
    res.status(200).json({ reviews: result.rows });
  } finally {
    client.release();
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  // Check authentication
  const token = readCookie(req, 'authToken');
  if (!token || !verifyToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { author_name, rating, text, visible = true } = req.body;
  
  if (!author_name || !rating) {
    return res.status(400).json({ error: 'Author name and rating are required' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO reviews (author_name, rating, text, visible) VALUES ($1, $2, $3, $4) RETURNING *',
      [author_name, rating, text, visible]
    );

    res.status(201).json({ review: result.rows[0] });
  } finally {
    client.release();
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  // Check authentication
  const token = readCookie(req, 'authToken');
  if (!token || !verifyToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  const { author_name, rating, text, visible } = req.body;
  
  if (!id) {
    return res.status(400).json({ error: 'Review ID is required' });
  }

  if (!author_name || !rating) {
    return res.status(400).json({ error: 'Author name and rating are required' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  const client = await pool.connect();
  try {
    const result = await client.query(
      'UPDATE reviews SET author_name = $1, rating = $2, text = $3, visible = $4 WHERE id = $5 RETURNING *',
      [author_name, rating, text, visible !== undefined ? visible : true, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.status(200).json({ review: result.rows[0] });
  } finally {
    client.release();
  }
}

async function handlePatch(req: NextApiRequest, res: NextApiResponse) {
  // Check authentication
  const token = readCookie(req, 'authToken');
  if (!token || !verifyToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  const { visible } = req.body;
  
  if (!id) {
    return res.status(400).json({ error: 'Review ID is required' });
  }

  if (visible === undefined) {
    return res.status(400).json({ error: 'Visible field is required for PATCH' });
  }

  const client = await pool.connect();
  try {
    const result = await client.query(
      'UPDATE reviews SET visible = $1 WHERE id = $2 RETURNING *',
      [visible, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.status(200).json({ review: result.rows[0] });
  } finally {
    client.release();
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  // Check authentication
  const token = readCookie(req, 'authToken');
  if (!token || !verifyToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ error: 'Review ID is required' });
  }

  const client = await pool.connect();
  try {
    const result = await client.query(
      'DELETE FROM reviews WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } finally {
    client.release();
  }
}