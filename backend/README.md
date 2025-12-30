# Regal Stay Backend

Backend API for Regal Stay hotel management system with SQLite database.

## Features

- SQLite database for data persistence
- RESTful API for rooms, bookings, and users
- CORS enabled for frontend integration
- Automatic database initialization with sample data

## Database Schema

### Tables

- **rooms**: Room information (id, name, type, price, description, capacity, amenities, image_url)
- **users**: User accounts (id, name, email, password, phone, role)
- **bookings**: Room bookings (id, user_id, room_id, check_in, check_out, guests, total_price, status)

## Setup on Debian 13 VM

### Prerequisites
- Node.js (version 16 or higher)
- npm

### Installation

1. Update your system:
```bash
sudo apt update && sudo apt upgrade -y
```

2. Install Node.js and npm:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. Clone or copy the backend code to your VM:
```bash
# Assuming you have the code in a directory
cd /path/to/backend
```

4. Install dependencies:
```bash
npm install
```

5. Initialize the database with sample data:
```bash
npm run init-db
```

6. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

### API Endpoints

- `GET /api/rooms` - Get all available rooms
- `GET /api/rooms/:id` - Get room by ID
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create a new booking
- `POST /api/users` - Create a new user
- `GET /health` - Health check

### Sample API Usage

#### Get Rooms
```bash
curl http://localhost:3000/api/rooms
```

#### Create Booking
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "room_id": 1,
    "check_in": "2025-01-15",
    "check_out": "2025-01-17",
    "guests": 2,
    "total_price": 300000
  }'
```

### Networking

Make sure your VM's firewall allows traffic on port 3000:

```bash
sudo ufw allow 3000
```

### Running in Background

To run the server in the background using PM2:

1. Install PM2 globally:
```bash
sudo npm install -g pm2
```

2. Start the application:
```bash
pm2 start server.js --name "regal-stay-backend"
```

3. Save PM2 configuration:
```bash
pm2 save
pm2 startup
```

### Database Management

The SQLite database file `hotel.db` will be created in the backend directory. For production, consider:

- Regular backups of `hotel.db`
- Database migration scripts for schema changes
- Connection pooling for high traffic

### Alternative: PostgreSQL Setup

For production environments, you can switch to PostgreSQL:

1. Install PostgreSQL:
```bash
sudo apt install postgresql postgresql-contrib
```

2. Create database and user:
```bash
sudo -u postgres psql
CREATE DATABASE regal_stay;
CREATE USER hotel_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE regal_stay TO hotel_user;
\q
```

3. Update connection string in server.js and install `pg` package instead of `sqlite3`