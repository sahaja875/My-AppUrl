// server.js

const express = require('express');
const cors = require('cors');
const shortid = require('shortid');

const app = express();
const port = 7070; // You can use any port you prefer

const urlDatabase = {}; // A simple in-memory database to store short URLs

app.use(cors());
app.use(express.json());

// API endpoint for creating short URLs
app.post('/shorten', (req, res) => {
  const longUrl = req.body.url;
  const shortUrl = shortid.generate();
  urlDatabase[shortUrl] = longUrl;
  res.json({ shortUrl: `http://localhost:${port}/${shortUrl}` });
});

// API endpoint for handling URL redirection
app.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl;
  const longUrl = urlDatabase[shortUrl];
  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
