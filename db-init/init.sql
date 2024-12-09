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
    page_name TEXT NOT NULL,
    content JSONB NOT NULL
);

INSERT INTO pages_content (page_name, content)
VALUES
(
    'homepage', 
    '{
        "title": "Welcome to Little Angels",
        "subtitle": "Where children blossom into their best selves.",
        "image_url": "https://example.com/images/hero.jpg",
        "button": {
            "text": "Learn More",
            "url": "/about-us"
        }
    }'
),
(
    'about_us',  
    '{
        "title": "Our Mission",
        "description": "To provide a nurturing environment that supports the holistic growth of children.",
        "image_url": "https://example.com/images/mission.jpg"
    }'
),
(
    'contact_us',
    '{
        "form_fields": [
            {"name": "full_name", "type": "text", "label": "Full Name"},
            {"name": "email", "type": "email", "label": "Email Address"},
            {"name": "message", "type": "textarea", "label": "Your Message"}
        ],
        "submit_button": {"text": "Send Message"}
    }'
);

