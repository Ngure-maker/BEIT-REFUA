const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: __dirname + '/.env' });

const pool = require('./db');
const contentRoutes = require('./routes/content');
const imageRoutes = require('./routes/images');
const galleryRoutes = require('./routes/gallery');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// API routes
app.use('/api/content', contentRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/gallery', galleryRoutes);

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', database: 'disconnected', error: err.message });
  }
});

// Initialize database tables
async function initDB() {
  try {
    const fs = require('fs');
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await pool.query(schema);
    console.log('Database tables initialized');
  } catch (err) {
    console.error('Error initializing database:', err.message);
    console.error('Make sure PostgreSQL is running and the database exists.');
    process.exit(1);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API: http://localhost:${PORT}/api`);
    console.log(`Health: http://localhost:${PORT}/api/health`);
  });
});
