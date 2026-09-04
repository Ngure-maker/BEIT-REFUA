const express = require('express');
const pool = require('../db');
const router = express.Router();

// GET /api/content — load all site content
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT key, value FROM site_content');
    const content = {};
    for (const row of result.rows) {
      content[row.key] = row.value;
    }
    res.json(content);
  } catch (err) {
    console.error('Error loading content:', err);
    res.status(500).json({ error: 'Failed to load content' });
  }
});

// PUT /api/content — save entire site content object
router.put('/', async (req, res) => {
  try {
    const content = req.body;
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      for (const [key, value] of Object.entries(content)) {
        await client.query(
          `INSERT INTO site_content (key, value, updated_at)
           VALUES ($1, $2, NOW())
           ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()`,
          [key, JSON.stringify(value)]
        );
      }
      await client.query('COMMIT');
      res.json({ success: true });
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Error saving content:', err);
    res.status(500).json({ error: 'Failed to save content' });
  }
});

// PUT /api/content/:key — save a single content key
router.put('/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const value = req.body;
    await pool.query(
      `INSERT INTO site_content (key, value, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()`,
      [key, JSON.stringify(value)]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Error saving content key:', err);
    res.status(500).json({ error: 'Failed to save content' });
  }
});

module.exports = router;
