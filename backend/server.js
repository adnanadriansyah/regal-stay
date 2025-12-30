const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

// Database setup
const db = new sqlite3.Database('./hotel.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    process.exit(1);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Keep database connection open
db.run('SELECT 1', (err) => {
  if (err) {
    console.error('Database connection test failed:', err.message);
    process.exit(1);
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to run database queries
function runQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// API Routes
app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await runQuery(`
      SELECT id, name as room, price, type, description, capacity, amenities, image_url
      FROM rooms
      WHERE available = 1
      ORDER BY price ASC
    `);
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/rooms/:id', async (req, res) => {
  try {
    const room = await runQuery(`
      SELECT * FROM rooms WHERE id = ?
    `, [req.params.id]);

    if (room.length === 0) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json(room[0]);
  } catch (error) {
    console.error('Error fetching room:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Bookings endpoints
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await runQuery(`
      SELECT b.*, r.name as room_name, r.price as room_price
      FROM bookings b
      JOIN rooms r ON b.room_id = r.id
      ORDER BY b.created_at DESC
    `);
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/bookings', async (req, res) => {
  const { user_id, room_id, check_in, check_out, guests, total_price } = req.body;

  if (!user_id || !room_id || !check_in || !check_out || !guests || !total_price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Check if room is available for the dates
    const conflictingBookings = await runQuery(`
      SELECT id FROM bookings
      WHERE room_id = ?
      AND status != 'cancelled'
      AND (
        (check_in <= ? AND check_out > ?) OR
        (check_in < ? AND check_out >= ?) OR
        (check_in >= ? AND check_out <= ?)
      )
    `, [room_id, check_in, check_out, check_in, check_out, check_in, check_out]);

    if (conflictingBookings.length > 0) {
      return res.status(409).json({ error: 'Room not available for selected dates' });
    }

    // Create booking
    const result = await new Promise((resolve, reject) => {
      db.run(`
        INSERT INTO bookings (user_id, room_id, check_in, check_out, guests, total_price)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [user_id, room_id, check_in, check_out, guests, total_price], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });

    res.status(201).json({ id: result.id, message: 'Booking created successfully' });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Users endpoints
app.post('/api/users', async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await new Promise((resolve, reject) => {
      db.run(`
        INSERT INTO users (name, email, password, phone)
        VALUES (?, ?, ?, ?)
      `, [name, email, password, phone], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });

    res.status(201).json({ id: result.id, message: 'User created successfully' });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      res.status(409).json({ error: 'Email already exists' });
    } else {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Regal Stay Backend is running' });
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
    process.exit(0);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});