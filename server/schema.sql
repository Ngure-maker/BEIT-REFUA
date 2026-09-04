-- Site content (key-value store for all page text)
CREATE TABLE IF NOT EXISTS site_content (
  key VARCHAR(255) PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Section images (hero, mission, healthcare, finalCta, programs, logo)
CREATE TABLE IF NOT EXISTS section_images (
  field_key VARCHAR(255) PRIMARY KEY,
  image_data BYTEA NOT NULL,
  mime_type VARCHAR(50) DEFAULT 'image/jpeg',
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Gallery images
CREATE TABLE IF NOT EXISTS gallery_images (
  id VARCHAR(255) PRIMARY KEY,
  image_data BYTEA NOT NULL,
  mime_type VARCHAR(50) DEFAULT 'image/jpeg',
  alt TEXT DEFAULT '',
  category VARCHAR(100) DEFAULT 'Facilities',
  title VARCHAR(500) DEFAULT '',
  description TEXT DEFAULT '',
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
