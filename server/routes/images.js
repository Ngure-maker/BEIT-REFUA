const express = require('express');
const multer = require('multer');
const pool = require('../db');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });

// GET /api/images — list all stored image field keys
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT field_key FROM section_images ORDER BY field_key');
    res.json(result.rows);
  } catch (err) {
    console.error('Error listing images:', err);
    res.status(500).json({ error: 'Failed to list images' });
  }
});

// GET /api/images/:fieldKey — serve an image
router.get('/:fieldKey', async (req, res) => {
  try {
    const { fieldKey } = req.params;
    const result = await pool.query(
      'SELECT image_data, mime_type FROM section_images WHERE field_key = $1',
      [fieldKey]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Image not found' });
    }
    const { image_data, mime_type } = result.rows[0];
    const buffer = Buffer.isBuffer(image_data) ? image_data : Buffer.from(image_data);
    res.setHeader('Content-Type', mime_type || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.end(buffer);
  } catch (err) {
    console.error('Error serving image:', err);
    res.status(500).json({ error: 'Failed to serve image' });
  }
});

// POST /api/images/:fieldKey — upload/replace an image
router.post('/:fieldKey', upload.single('image'), async (req, res) => {
  try {
    const { fieldKey } = req.params;
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    const mimeType = req.file.mimetype || 'image/jpeg';
    await pool.query(
      `INSERT INTO section_images (field_key, image_data, mime_type, updated_at)
       VALUES ($1, $2, $3, NOW())
       ON CONFLICT (field_key) DO UPDATE SET image_data = $2, mime_type = $3, updated_at = NOW()`,
      [fieldKey, req.file.buffer, mimeType]
    );
    res.json({ success: true, fieldKey });
  } catch (err) {
    console.error('Error uploading image:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// DELETE /api/images/:fieldKey — delete an image
router.delete('/:fieldKey', async (req, res) => {
  try {
    await pool.query('DELETE FROM section_images WHERE field_key = $1', [req.params.fieldKey]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting image:', err);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

module.exports = router;
