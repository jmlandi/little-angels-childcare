-- Safe schema bootstrap for existing database without dropping data
-- Creates any missing tables and supporting extension. Idempotent.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- contacts
CREATE TABLE IF NOT EXISTS contacts (
    id uuid DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    email VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- pages_content
CREATE TABLE IF NOT EXISTS pages_content (
    id SERIAL PRIMARY KEY,
    page_name TEXT NOT NULL,
    content JSONB NOT NULL
);

-- images
CREATE TABLE IF NOT EXISTS images (
    id uuid DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    alt_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- site_content
CREATE TABLE IF NOT EXISTS site_content (
    id SERIAL PRIMARY KEY,
    section VARCHAR(100) NOT NULL,
    key VARCHAR(100) NOT NULL,
    value TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ensure unique(section,key) on site_content if not already present
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'site_content'::regclass
      AND conname = 'site_content_section_key_key'
  ) THEN
    ALTER TABLE site_content
      ADD CONSTRAINT site_content_section_key_key UNIQUE (section, key);
  END IF;
END$$;

-- reviews
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    author_name VARCHAR(255) NOT NULL,
    rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    visible BOOLEAN DEFAULT true
);
