const express = require('express');
const cors = require('cors');

console.log('Starting Regal Stay API...');

const app = express();
app.use(cors());
app.use(express.json());

console.log('Middleware configured...');

// Endpoint test
app.get('/', (req, res) => {
  console.log('Health check endpoint called');
  res.json({
    status: "OK",
    message: "Regal Stay API running"
  });
});

// Contoh endpoint data kamar
app.get('/api/rooms', (req, res) => {
  console.log('Rooms endpoint called');
  res.json([
    { id: 1, room: "Deluxe Room", price: 750000 },
    { id: 2, room: "Executive Suite", price: 1200000 }
  ]);
});

const PORT = 3000;
console.log(`Attempting to start server on port ${PORT}...`);

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
  console.log(`Server will keep running...`);
});

// Keep the event loop alive
setInterval(() => {
  // Keep alive
}, 1000);