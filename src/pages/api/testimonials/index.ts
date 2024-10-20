import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const accessToken = req.headers.authorization?.split(' ')[1];
  const accountId = process.env.GMB_ACCOUNT_ID;
  const locationId = process.env.GMB_LOCATION_ID;

  if (!accessToken) {
    return res.status(401).json({ error: 'Access token is missing' });
  }

  try {
    // URL da API para obter reviews da Google My Business
    const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const reviews = response.data.reviews.map((review: any) => ({
      author: review.reviewer.profileName,
      text: review.comment,
      rating: review.starRating,
    }));

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
}
