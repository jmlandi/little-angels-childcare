import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const apiKey = process.env.MAPS_API_KEY;
      const placeId = process.env.MAPS_PLACE_ID;

      if (!apiKey || !placeId) {
        throw new Error('Missing API key or Place ID');
      }

      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;

      const response = await axios.get(url);

      if (response.data.status !== 'OK') {
        throw new Error('Failed to fetch reviews from Google Maps API');
      }

      const reviews = response.data.result.reviews.map((review: any) => ({
        author: review.author_name,
        text: review.text,
      }));

      res.status(200).json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
