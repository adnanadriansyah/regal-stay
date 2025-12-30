const sqlite3 = require('sqlite3').verbose();

// Create database
const db = new sqlite3.Database('./hotel.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create tables
db.serialize(() => {
  // Rooms table
  db.run(`
    CREATE TABLE IF NOT EXISTS rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      price INTEGER NOT NULL,
      description TEXT,
      capacity INTEGER DEFAULT 2,
      amenities TEXT,
      available BOOLEAN DEFAULT 1,
      image_url TEXT
    )
  `);

  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phone TEXT,
      role TEXT DEFAULT 'customer',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Bookings table
  db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      room_id INTEGER,
      check_in DATE NOT NULL,
      check_out DATE NOT NULL,
      guests INTEGER DEFAULT 1,
      total_price INTEGER NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id),
      FOREIGN KEY (room_id) REFERENCES rooms (id)
    )
  `);

  // Insert sample data
  const sampleRooms = [
    {
      name: 'Deluxe Room',
      type: 'deluxe',
      price: 150000,
      description: 'Spacious room with city views and modern amenities',
      capacity: 2,
      amenities: 'WiFi, TV, Mini Bar, Air Conditioning',
      image_url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304'
    },
    {
      name: 'Suite',
      type: 'suite',
      price: 250000,
      description: 'Luxurious suite with separate living area and premium services',
      capacity: 4,
      amenities: 'WiFi, TV, Mini Bar, Air Conditioning, Jacuzzi, Room Service',
      image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'
    },
    {
      name: 'Executive Room',
      type: 'executive',
      price: 200000,
      description: 'Executive room designed for business travelers with work desk',
      capacity: 2,
      amenities: 'WiFi, TV, Mini Bar, Air Conditioning, Work Desk',
      image_url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791'
    },
    {
      name: 'Standard Room',
      type: 'standard',
      price: 100000,
      description: 'Comfortable standard room with essential amenities',
      capacity: 2,
      amenities: 'WiFi, TV, Air Conditioning',
      image_url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427'
    }
  ];

  // Insert sample rooms
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO rooms (name, type, price, description, capacity, amenities, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  sampleRooms.forEach(room => {
    stmt.run(room.name, room.type, room.price, room.description, room.capacity, room.amenities, room.image_url);
  });

  stmt.finalize();

  console.log('Database initialized with sample data.');
});

db.close((err) => {
  if (err) {
    console.error('Error closing database:', err.message);
  } else {
    console.log('Database connection closed.');
  }
});