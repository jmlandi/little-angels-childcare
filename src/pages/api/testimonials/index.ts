import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { pool } from '@infrastructure/database/PostgresClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    let allReviews: any[] = [];

    // 1. Fetch reviews from database (your managed reviews)
    try {
      const dbResult = await pool.query(
        'SELECT author_name as author, text, rating, created_at FROM reviews WHERE visible = true ORDER BY created_at DESC'
      );
      
      const dbReviews = dbResult.rows.map((review: any) => ({
        author: review.author,
        text: review.text,
        rating: review.rating,
        source: 'database',
        date: review.created_at
      }));
      
      allReviews.push(...dbReviews);
      console.log(`Found ${dbReviews.length} database reviews`);
    } catch (dbError) {
      console.warn('Database reviews not available:', dbError);
    }

    // 2. Fetch reviews from Google Maps API (if available)
    try {
      const apiKey = process.env.MAPS_API_KEY;
      const placeId = process.env.MAPS_PLACE_ID;

      if (apiKey && placeId && apiKey !== 'demo_access_key' && placeId !== 'demo_place_id') {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;
        const response = await axios.get(url);

        if (response.data.status === 'OK' && response.data.result?.reviews) {
          const googleReviews = response.data.result.reviews.map((review: any) => ({
            author: review.author_name,
            text: review.text,
            rating: review.rating,
            source: 'google',
            date: new Date(review.time * 1000).toISOString()
          }));
          
          allReviews.push(...googleReviews);
          console.log(`Found ${googleReviews.length} Google Maps reviews`);
        }
      } else {
        console.log('Google Maps API credentials not configured, using database reviews only');
      }
    } catch (googleError) {
      console.warn('Google Maps reviews not available:', googleError);
    }

    // 3. Sort by date (newest first) and format for testimonials display
    const sortedReviews = allReviews
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(review => ({
        author: review.author,
        text: review.text,
        rating: review.rating || 5,
        source: review.source
      }));

    // Return formatted testimonials (keep the same format for compatibility)
    res.status(200).json(sortedReviews);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
