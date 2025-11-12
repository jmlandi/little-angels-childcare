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

-- Images table for S3-stored images
CREATE TABLE images (
    id uuid DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    alt_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- Site content table for editable text content
CREATE TABLE site_content (
    id SERIAL PRIMARY KEY,
    section VARCHAR(100) NOT NULL,
    key VARCHAR(100) NOT NULL,
    value TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(section, key)
);

-- Reviews table for Google reviews management
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    author_name VARCHAR(255) NOT NULL,
    rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    visible BOOLEAN DEFAULT true
);

-- Insert comprehensive site content from all pages
INSERT INTO site_content (section, key, value) VALUES

-- Hero Section
('hero', 'title', 'Welcome to Little Angels Childcare'),
('hero', 'subtitle', 'A safe and nurturing environment for your child''s growth and development'),
('hero', 'description', 'We provide quality childcare services with experienced staff and a caring environment.'),

-- Contact Information
('contact', 'phone', '+1 (503) 896-3013'),
('contact', 'email', 'littleangelspdx@gmail.com'),
('contact', 'address', '11640 NE Knott St, Portland-OR, 97220'),
('contact', 'hours', 'Monday to Friday, 8am to 5pm'),

-- About Us - Mission
('about', 'mission_title', 'Our Mission'),
('about', 'mission_paragraph1', 'We believe that children thrive in an environment which values their own uniqueness, while providing support and opportunities to grow emotionally, socially and creatively. By building on each child''s strengths, interests and curiosities, we guide each child to explore the world around them as well as develop new abilities and form close relationships.'),
('about', 'mission_paragraph2', 'We are bilingual, and will teach your child a second language. Research shows that learning a second language boosts problem-solving, critical-thinking, and listening skills, in addition to improving memory, concentration, and the ability to multitask. Children proficient in other languages also show signs of enhanced creativity and mental flexibility.'),

-- About Us - Philosophy
('about', 'philosophy_title', 'Our Philosophy'),
('about', 'philosophy_paragraph', 'We believe that children thrive in an environment which values their own uniqueness, while providing support and opportunities to grow emotionally, socially and creatively. By building on each child''s strengths, interests and curiosities, we guide each child to explore the world around them as well as develop new abilities and form close relationships. We understand that each child is unique and deserves an environment that fosters their individual growth. Our programs are designed to inspire creativity, encourage curiosity, and build a strong foundation for lifelong learning. We emphasize the importance of social, emotional, and cognitive development, ensuring that your child is well-prepared for their next steps in education and life.'),

-- About Us - Environment
('about', 'environment_title', 'Our Environment'),
('about', 'environment_paragraph', 'At Little Angels, we are more than just a childcare center; we are a community. We value the relationships we build with families and believe in open communication and collaboration. We are dedicated to providing a high-quality, caring, and inclusive environment where every child feels valued and supported.'),

-- About Us - Team
('about', 'team_title', 'Our Team'),
('about', 'team_name', 'Mariana Ricci'),
('about', 'team_bio_paragraph1', 'Mariana, originally from Brazil and now a U.S. citizen, has been living in the U.S. for over 12 years. With 18+ years of experience working with children, her journey began at 15, caring for her younger relatives. After discovering her passion for child development, she worked at a daycare in Brazil for two years before moving to the U.S. through an Au Pair program, where she worked as a full-time nanny. After completing the program, Mariana pursued college and continued working with children of all ages, from newborns to teenagers. She is deeply passionate about supporting children''s growth and development.'),
('about', 'team_bio_paragraph2', 'In her free time, Mariana enjoys running, surfing, hiking, rollerblading, painting, gardening, cooking, traveling, and exploring new places.'),

-- Philosophy Page
('philosophy', 'main_title', 'Play Based Philosophy — Playing to Learn/Learning to Play'),
('philosophy', 'main_quote', 'There''s a lot happening during playtime. Little ones are lifting, dropping, looking, pouring, bouncing, hiding, building, knocking down, and more. Children are more than busy when they''re playing. When your children play with you, they are also learning that they are loved and important and that they are fun to be around'),
('philosophy', 'paragraph1', 'Our play-based childhood program teaches children to think creatively so they may succeed in our complex and ever-changing world. Purposeful play is developmentally appropriate and a significant element of any early childhood program.'),
('philosophy', 'paragraph2', 'Our program emphasizes the importance of play in a child''s intellectual, social, emotional, and physical development. Play is a way of learning for children. During a typical day, structured and unstructured periods will enable children to learn at their own rate.'),
('philosophy', 'paragraph3', 'We believe in the importance of Outdoors and Physical Activities for babies, and toddlers, and will encourage and motivate your child to Play and be active at Little Angels.'),
('philosophy', 'benefits_list', 'Physical activities promotes healthy growth and development.|It helps build a healthier body composition, stronger bones and muscles.|It improves the child''s cardiovascular fitness.|It helps in the development of better motor skills and in concentration and thinking skills.|reduces children''s risk of getting heart disease, cancer and type-2 diabetes later in life.'),
('philosophy', 'paragraph4', 'Physical activity also boosts children''s wellbeing. For example, active children are more likely to:'),
('philosophy', 'wellbeing_list', 'be confident and feel like they belong|be relaxed and sleep well|concentrate better at school|get along with others and make friends easily|share, take turns and cooperate'),

-- Tuition Page
('tuition', 'title', 'Tuition'),
('tuition', 'rates_title', '2026 Tuition Rates:'),
('tuition', 'rate_5_days', '5 days a week: $2050 monthly'),
('tuition', 'rate_3_days', '3 days a week: $1700 monthly'),
('tuition', 'rate_2_days', '2 days a week: $1500 monthly'),

-- Meals Page
('meals', 'main_title', 'Here at Little Angels we know the importance of nutrition, especially for children.'),
('meals', 'intro_paragraph', 'We are happy, and excited to offer homemade, nutritious, and healthy meals. All of our ingredients are certified organic, and as a bonus, during the summer our veggies and greens are grown in our Little Angels garden, and hand picked by the kids.'),
('meals', 'breakfast_title', 'Breakfast consist of:'),
('meals', 'breakfast_description', 'Fruits, cereal, milk, bread or muffins.'),
('meals', 'lunch_title', 'Lunch may vary, but it always consist of:'),
('meals', 'lunch_description', 'A variety of veggies, rice, and a vegetarian option for protein. Some options you would see on our lunch menu would be: zucchini, broccolis, potato, green beans, corn, peas, chick peas, pinto beans, black beans, carrots...'),
('meals', 'snack_title', 'Snack consist of:'),
('meals', 'snack_description', 'A variety of fruits, and/or veggies, and crackers'),

-- Enrollments Page
('enrollments', 'request_title', 'Request an Enrollment'),
('enrollments', 'request_description', 'We understand that each child is unique and deserves an environment that fosters their individual growth. Our programs are designed to inspire creativity, encourage curiosity, and build a strong foundation for lifelong learning. We emphasize the importance of social, emotional, and cognitive development, ensuring that your child is well-prepared for their next steps in education and life.'),
('enrollments', 'button_text', 'Schedule a tour'),
('enrollments', 'offer_title', 'Offer');

-- -- Insert some sample reviews
-- INSERT INTO reviews (author_name, rating, text, visible) VALUES
-- ('Sarah Johnson', 5, 'Amazing childcare center! My daughter loves going there every day. The staff is incredibly caring and professional.', true),
-- ('Mike Chen', 5, 'Little Angels has been wonderful for our son. Great activities, nutritious meals, and excellent communication with parents.', true),
-- ('Emily Rodriguez', 5, 'Very happy with the care our twins receive. Clean facility and engaging educational programs.', true),
-- ('David Smith', 5, 'Outstanding childcare! The teachers are patient and create a loving environment for all the children.', false);

