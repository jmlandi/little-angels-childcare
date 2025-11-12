-- Update script to add all website content to the CMS
-- Run this when convenient to populate Mariana's admin panel with all existing content

-- First, clear existing sample content
DELETE FROM site_content WHERE section IN ('hero', 'contact', 'about');

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

-- Add all website images for Mariana to manage
INSERT INTO images (name, url, alt_text) VALUES
-- Logo and Branding
('Little Angels Logo', '/logo.svg', 'Little Angels Childcare logo'),

-- Angel Graphics
('Angel Graphic 1', '/angel-1.png', 'Angel illustration'),
('Angel Graphic 2', '/angel-2.png', 'Angel illustration for contact'),
('Angel Graphic 3', '/angel-3.png', 'Angel illustration'),

-- Homepage Carousel Banners
('Banner 2', '/banner-2.png', 'Little Angels childcare banner'),
('Banner 3', '/banner-3.png', 'Little Angels childcare banner'),
('Banner 4', '/banner-4.JPEG', 'Little Angels childcare banner'),
('Banner 5', '/banner-5.JPEG', 'Little Angels childcare banner'),
('Banner 6', '/banner-6.JPEG', 'Little Angels childcare banner'),

-- Core Values (Homepage)
('Core Value 1', '/core-value-1.png', 'Core value icon'),
('Core Value 2', '/core-value-2.png', 'Core value icon'),
('Core Value 3', '/core-value-3.png', 'Core value icon'),

-- About/Mission Section
('Our Mission Banner', '/our-mission.png', 'Our mission at Little Angels'),
('Mission Image 1', '/mission-1.png', 'Children playing and learning'),
('Mission Image 2', '/mission-2.png', 'Our philosophy in action'), 
('Mission Image 3', '/mission-3.png', 'Our nurturing environment'),
('Team Photo - Mariana', '/mission-4.png', 'Mariana Ricci, founder and director'),

-- Philosophy Page
('Philosophy Activity 1', '/philosophy-1.JPEG', 'Kids playing and learning outdoors'),
('Philosophy Activity 2', '/philosophy-2.JPEG', 'Children engaged in creative play'),
('Philosophy Activity 3', '/philosophy-3.JPEG', 'Outdoor physical activities'),

-- Meals Page
('Healthy Meals', '/fruits.jpg', 'Fresh organic fruits and vegetables'),

-- Brightweel Page
('Brightwheel App', '/brightweel.png', 'Brightwheel app interface'),

-- Weekend Page
('Weekend Activities', '/weekend.JPEG', 'Weekend program activities'),

-- Background Images
('Cloud Background Blue', '/bg-cloud-blue.jpg', 'Blue cloud background for subpage titles'),

-- Gallery Images
('Gallery Image 1', '/gallery/gallery-1.png', 'Little Angels gallery photo'),
('Gallery Image 2', '/gallery/gallery-2.png', 'Little Angels gallery photo'),
('Gallery Image 3', '/gallery/gallery-3.png', 'Little Angels gallery photo'),
('Gallery Image 4', '/gallery/gallery-4.png', 'Little Angels gallery photo'),
('Gallery Image 5', '/gallery/gallery-5.png', 'Little Angels gallery photo'),
('Gallery Image 6', '/gallery/gallery-6.png', 'Little Angels gallery photo'),
('Gallery Image 7', '/gallery/gallery-7.png', 'Little Angels gallery photo'),
('Gallery Image 8', '/gallery/gallery-8.png', 'Little Angels gallery photo'),
('Gallery Image 9', '/gallery/gallery-9.png', 'Little Angels gallery photo'),
('Gallery Image 10', '/gallery/gallery-10.png', 'Little Angels gallery photo'),
('Gallery Image 11', '/gallery/gallery-11.png', 'Little Angels gallery photo'),
('Gallery Image 12', '/gallery/gallery-12.png', 'Little Angels gallery photo');

-- Add some sample reviews for Mariana to manage
INSERT INTO reviews (author_name, rating, text, visible) VALUES
('Sarah Johnson', 5, 'Little Angels has been amazing for our daughter. The bilingual environment and play-based learning approach have helped her grow so much. Mariana and her team truly care about each child.', true),
('Mike Chen', 5, 'We love the organic meals and the garden program. Our son comes home excited about what he learned every day. The staff is incredibly nurturing and professional.', true),
('Lisa Rodriguez', 4, 'Great childcare center with a wonderful philosophy. The outdoor activities and creative play have been perfect for our toddler. Highly recommend!', true),
('Emma Wilson', 5, 'Mariana has created such a warm and welcoming environment. Our child has thrived here both socially and academically. The bilingual program is a huge bonus!', false);