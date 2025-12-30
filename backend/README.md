# Regal Stay Backend

Simple Express.js API for Regal Stay hotel management system.

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

3. Create a directory for your project:
```bash
mkdir regal-stay-backend
cd regal-stay-backend
```

4. Create package.json:
```bash
npm init -y
```

5. Install dependencies:
```bash
npm install express cors
```

6. Create index.js with the API code (see index.js file)

7. Start the server:
```bash
node index.js
```

### API Endpoints

- `GET /` - Health check
- `GET /api/rooms` - Get all rooms

### Running in Background

To run the server in the background using PM2:

1. Install PM2 globally:
```bash
sudo npm install -g pm2
```

2. Start the application:
```bash
pm2 start index.js --name "regal-stay-backend"
```

3. Save PM2 configuration:
```bash
pm2 save
pm2 startup
```

### Networking

Make sure your VM's firewall allows traffic on port 3000:

```bash
sudo ufw allow 3000
```

The API will be accessible at `http://your-vm-ip:3000/api/rooms`