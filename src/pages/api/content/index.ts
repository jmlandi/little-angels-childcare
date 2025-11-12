import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '@infrastructure/database/PostgresClient';
import { verifyToken, readCookie } from '@infrastructure/auth';

interface SiteContent {
  id: number;
  section: string;
  key: string;
  value: string;
  updated_at: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        await handleGet(req, res);
        break;
      case 'PUT':
        await handlePut(req, res);
        break;
      case 'POST':
        await handlePost(req, res);
        break;
      case 'DELETE':
        await handleDelete(req, res);
        break;
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'POST', 'DELETE']);
        res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Site content API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { section, key } = req.query;
  
  const client = await pool.connect();
  try {
    let query = 'SELECT * FROM site_content';
    const params: any[] = [];
    
    if (section) {
      query += ' WHERE section = $1';
      params.push(section);
      
      if (key) {
        query += ' AND key = $2';
        params.push(key);
      }
    }
    
    query += ' ORDER BY section, key';
    
    const result = await client.query(query, params);
    
    if (section && key && result.rows.length === 1) {
      res.status(200).json({ content: result.rows[0] });
    } else {
      res.status(200).json({ content: result.rows });
    }
  } finally {
    client.release();
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  // Check authentication for updates
  const token = readCookie(req, 'authToken');
  if (!token || !verifyToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { section, key, value } = req.body;
  
  if (!section || !key || value === undefined) {
    return res.status(400).json({ error: 'Section, key, and value are required' });
  }

  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO site_content (section, key, value, updated_at) 
       VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
       ON CONFLICT (section, key) 
       DO UPDATE SET value = $3, updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [section, key, value]
    );

    res.status(200).json({ content: result.rows[0] });
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

  const { section, key, value } = req.body;
  
  if (!section || !key || value === undefined) {
    return res.status(400).json({ error: 'Section, key, and value are required' });
  }

  const client = await pool.connect();
  try {
    // Check if content already exists
    const existingResult = await client.query(
      'SELECT id FROM site_content WHERE section = $1 AND key = $2',
      [section, key]
    );

    if (existingResult.rows.length > 0) {
      return res.status(409).json({ error: 'Content already exists. Use PUT to update.' });
    }

    const result = await client.query(
      'INSERT INTO site_content (section, key, value) VALUES ($1, $2, $3) RETURNING *',
      [section, key, value]
    );

    res.status(201).json({ content: result.rows[0] });
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
    return res.status(400).json({ error: 'Content ID is required' });
  }

  const client = await pool.connect();
  try {
    const result = await client.query(
      'DELETE FROM site_content WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Content not found' });
    }

    res.status(200).json({ message: 'Content deleted successfully' });
  } finally {
    client.release();
  }
}