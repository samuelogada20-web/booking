// server.js - simple Express endpoint to accept bookings
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let bookings = []; // in-memory store (not persistent)

app.post('/api/book', (req, res) => {
  const payload = req.body;
  payload.id = Date.now().toString(36);
  payload.receivedAt = new Date().toISOString();
  bookings.unshift(payload);
  // send simple response
  res.json({ ok: true, ref: payload.id });
});

// optional endpoint to list stored bookings
app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('Server listening on', PORT));
