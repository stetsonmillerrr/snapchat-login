import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const logins = JSON.parse(await kv.get('logins') || '[]');
    res.status(200).json(logins);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
