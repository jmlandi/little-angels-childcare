CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE contacts (
    id uuid DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    email VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE pages_content (
    id SERIAL PRIMARY KEY,
    page_name TEXT NOT NULL UNIQUE,
    content JSONB NOT NULL
);

