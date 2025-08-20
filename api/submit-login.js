import { kv } from '@vercel/kv'; // or use a cloud DB like MongoDB

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = await req.json();
    const timestamp = new Date().toISOString();
    
    // Save to database
    const logins = JSON.parse(await kv.get('logins') || '[]');
    logins.push({ username, password, timestamp });
    await kv.set('logins', JSON.stringify(logins));

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
