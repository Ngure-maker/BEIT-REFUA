const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const pool = require('../db');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });

// GET /api/gallery — list all gallery images (metadata only, no image data)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, alt, category, title, description, visible, created_at, updated_at FROM gallery_images ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error listing gallery:', err);
    res.status(500).json({ error: 'Failed to list gallery images' });
  }
});

// GET /api/gallery/:id/image — serve gallery image binary
router.get('/:id/image', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT image_data, mime_type FROM gallery_images WHERE id = $1',
      [req.params.id]
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
    console.error('Error serving gallery image:', err);
    res.status(500).json({ error: 'Failed to serve image' });
  }
});

// POST /api/gallery — add a new gallery image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const id = uuidv4();
    const { alt, category, title, description, visible } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    const mimeType = req.file.mimetype || 'image/jpeg';
    await pool.query(
      `INSERT INTO gallery_images (id, image_data, mime_type, alt, category, title, description, visible)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        id,
        req.file.buffer,
        mimeType,
        alt || '',
        category || 'Facilities',
        title || '',
        description || '',
        visible !== 'false',
      ]
    );
    res.json({ success: true, id });
  } catch (err) {
    console.error('Error adding gallery image:', err);
    res.status(500).json({ error: 'Failed to add gallery image' });
  }
});

// PUT /api/gallery/:id — update gallery image metadata
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { alt, category, title, description, visible } = req.body;
    await pool.query(
      `UPDATE gallery_images
       SET alt = $1, category = $2, title = $3, description = $4, visible = $5, updated_at = NOW()
       WHERE id = $6`,
      [alt || '', category || 'Facilities', title || '', description || '', visible !== false, id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Error updating gallery image:', err);
    res.status(500).json({ error: 'Failed to update gallery image' });
  }
});

// DELETE /api/gallery/:id — delete a gallery image
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM gallery_images WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting gallery image:', err);
    res.status(500).json({ error: 'Failed to delete gallery image' });
  }
});

module.exports = router;
