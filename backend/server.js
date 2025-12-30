const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample room data
const rooms = [
  { id: 1, room: 'Deluxe Room', price: 150000 },
  { id: 2, room: 'Suite', price: 250000 },
  { id: 3, room: 'Executive Room', price: 200000 },
  { id: 4, room: 'Standard Room', price: 100000 }
];

// API Routes
app.get('/api/rooms', (req, res) => {
  res.json(rooms);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Regal Stay Backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});