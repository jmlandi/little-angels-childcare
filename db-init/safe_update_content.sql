-- Safe update script to add all website content to the CMS
-- This script will update existing content or insert new content safely

-- Use INSERT ... ON CONFLICT for safe updates
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

-- Philosophy Page (using different keys to avoid conflicts)
('philosophy_page', 'main_title', 'Play Based Philosophy — Playing to Learn/Learning to Play'),
('philosophy_page', 'main_quote', 'There''s a lot happening during playtime. Little ones are lifting, dropping, looking, pouring, bouncing, hiding, building, knocking down, and more. Children are more than busy when they''re playing. When your children play with you, they are also learning that they are loved and important and that they are fun to be around'),
('philosophy_page', 'paragraph1', 'Our play-based childhood program teaches children to think creatively so they may succeed in our complex and ever-changing world. Purposeful play is developmentally appropriate and a significant element of any early childhood program.'),
('philosophy_page', 'paragraph2', 'Our program emphasizes the importance of play in a child''s intellectual, social, emotional, and physical development. Play is a way of learning for children. During a typical day, structured and unstructured periods will enable children to learn at their own rate.'),
('philosophy_page', 'paragraph3', 'We believe in the importance of Outdoors and Physical Activities for babies, and toddlers, and will encourage and motivate your child to Play and be active at Little Angels.'),
('philosophy_page', 'benefits_list', 'Physical activities promotes healthy growth and development.|It helps build a healthier body composition, stronger bones and muscles.|It improves the child''s cardiovascular fitness.|It helps in the development of better motor skills and in concentration and thinking skills.|reduces children''s risk of getting heart disease, cancer and type-2 diabetes later in life.'),
('philosophy_page', 'paragraph4', 'Physical activity also boosts children''s wellbeing. For example, active children are more likely to:'),
('philosophy_page', 'wellbeing_list', 'be confident and feel like they belong|be relaxed and sleep well|concentrate better at school|get along with others and make friends easily|share, take turns and cooperate'),

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
('enrollments', 'offer_title', 'Offer')

ON CONFLICT (section, key) 
DO UPDATE SET 
    value = EXCLUDED.value,
    updated_at = CURRENT_TIMESTAMP;

-- Add sample images (only if they don't exist)
INSERT INTO images (name, url, alt_text) VALUES
('Mission Image 1', '/mission-1.png', 'Children playing and learning'),
('Mission Image 2', '/mission-2.png', 'Our philosophy in action'), 
('Mission Image 3', '/mission-3.png', 'Our nurturing environment'),
('Team Photo - Mariana', '/mission-4.png', 'Mariana Ricci, founder and director'),
('Philosophy Activity 1', '/philosophy-1.JPEG', 'Kids playing and learning outdoors'),
('Philosophy Activity 2', '/philosophy-2.JPEG', 'Children engaged in creative play'),
('Philosophy Activity 3', '/philosophy-3.JPEG', 'Outdoor physical activities'),
('Healthy Meals', '/fruits.jpg', 'Fresh organic fruits and vegetables')
ON CONFLICT DO NOTHING;

-- Add sample reviews (only if they don't exist)
INSERT INTO reviews (author_name, rating, text, visible) VALUES
('Sarah Johnson', 5, 'Little Angels has been amazing for our daughter. The bilingual environment and play-based learning approach have helped her grow so much. Mariana and her team truly care about each child.', true),
('Mike Chen', 5, 'We love the organic meals and the garden program. Our son comes home excited about what he learned every day. The staff is incredibly nurturing and professional.', true),
('Lisa Rodriguez', 4, 'Great childcare center with a wonderful philosophy. The outdoor activities and creative play have been perfect for our toddler. Highly recommend!', true),
('Emma Wilson', 5, 'Mariana has created such a warm and welcoming environment. Our child has thrived here both socially and academically. The bilingual program is a huge bonus!', false)
ON CONFLICT DO NOTHING;