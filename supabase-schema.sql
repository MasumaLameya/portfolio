-- ==============================================================================
-- SUPABASE DATABASE SCHEMA & INITIAL DATA FOR PORTFOLIO
-- Run this complete script in your Supabase Project: SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. PROFILE TABLE
CREATE TABLE IF NOT EXISTS public.profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'Christina Gray',
  role TEXT NOT NULL DEFAULT 'UI & UX Designer. Photographer',
  avatar_url TEXT DEFAULT 'assets/images/hero-avatar.1925fb85.jpg',
  bio TEXT DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  typewriter_words JSONB DEFAULT '["Christina Gray", "UI/UX Designer", "Photographer"]'::jsonb,
  photoshoot_pct INT DEFAULT 95,
  tailwind_pct INT DEFAULT 90,
  seo_pct INT DEFAULT 80,
  years_experience INT DEFAULT 14,
  hours_working TEXT DEFAULT '50',
  projects_done INT DEFAULT 90,
  email TEXT DEFAULT 'flatheme@gmail.com',
  phone TEXT DEFAULT '+976 12 34 9999',
  address TEXT DEFAULT '121 King St, Melbourne VIC 3000',
  social_facebook TEXT DEFAULT 'https://facebook.com',
  social_twitter TEXT DEFAULT 'https://twitter.com',
  social_instagram TEXT DEFAULT 'https://instagram.com',
  social_github TEXT DEFAULT 'https://github.com',
  social_linkedin TEXT DEFAULT 'https://linkedin.com',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL DEFAULT 'Web Design',
  client TEXT DEFAULT 'FlaTheme Inc.',
  start_date TEXT DEFAULT 'March 2024',
  designer TEXT DEFAULT 'Christina Gray',
  tools TEXT DEFAULT 'Figma, Tailwind CSS, Angular',
  project_url TEXT DEFAULT 'https://example.com',
  main_image TEXT NOT NULL,
  images JSONB DEFAULT '[]'::jsonb,
  short_description TEXT DEFAULT '',
  full_description TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. BLOGS TABLE
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL DEFAULT 'Design',
  date TEXT NOT NULL DEFAULT 'Oct 2024',
  author TEXT NOT NULL DEFAULT 'Christina Gray',
  cover_image TEXT NOT NULL,
  summary TEXT DEFAULT '',
  content TEXT DEFAULT '',
  tags JSONB DEFAULT '["Design", "UI/UX", "Tech"]'::jsonb,
  views INT DEFAULT 120,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'bi bi-code-slash',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  avatar TEXT NOT NULL,
  feedback TEXT NOT NULL,
  rating INT DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. RESUME ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.resume_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('experience', 'education')),
  period TEXT NOT NULL,
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. CLIENTS / BRANDS TABLE
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  website_url TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 8. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT DEFAULT '',
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- To allow instant updates across all devices from the Admin Dashboard,
-- we allow public management or disable RLS on these portfolio tables.
-- ==============================================================================

ALTER TABLE public.profile DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.services DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages DISABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- STORAGE BUCKET CREATION (Public Read)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public can view media" ON storage.objects;
CREATE POLICY "Public can view media" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-media');

DROP POLICY IF EXISTS "Public can upload media" ON storage.objects;
CREATE POLICY "Public can upload media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio-media');

DROP POLICY IF EXISTS "Public can update media" ON storage.objects;
CREATE POLICY "Public can update media" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio-media');

DROP POLICY IF EXISTS "Public can delete media" ON storage.objects;
CREATE POLICY "Public can delete media" ON storage.objects FOR DELETE USING (bucket_id = 'portfolio-media');

-- ==============================================================================
-- INITIAL SEED DATA (MASUMA AKTER LAMEYA)
-- ==============================================================================

-- 1. Seed Profile
INSERT INTO public.profile (name, role, avatar_url, bio, typewriter_words, photoshoot_pct, tailwind_pct, seo_pct, years_experience, hours_working, projects_done, email, phone, address, social_github, social_linkedin)
VALUES (
  'MST. MASUMA AKTER LAMEYA',
  'Full-Stack Developer & AI Engineer',
  '/assets/images/masuma-profile-me.jpg',
  'Full-Stack Developer with experience in web application development, machine learning, and AI-integrated solutions. Skilled in developing end-to-end applications, managing databases, and implementing intelligent features with ASP.NET Core, Angular, Python, and Deep Learning.',
  '["Masuma Akter Lameya", "Full-Stack Developer", "AI & ML Researcher", "ASP.NET Core & Angular", "Medical AI Specialist"]'::jsonb,
  95, 90, 88, 2, '15', 12,
  'masumalamya7@gmail.com', '+880 1409-015552', 'Dhaka, Bangladesh',
  'https://github.com/MasumaLameya', 'https://linkedin.com/in/obaidul-haque47/'
) ON CONFLICT DO NOTHING;

-- 2. Seed Projects
INSERT INTO public.projects (title, slug, category, client, start_date, designer, tools, project_url, main_image, images, short_description, full_description)
VALUES
('Student Mental Health Monitoring System', 'student-mental-health-monitoring-system', 'AI & Web Platform', 'Academic & Healthcare Project', '2024', 'Masuma Akter Lameya', 'ASP.NET Core MVC, MySQL, HTML, CSS, Bootstrap, JavaScript, Gemini AI', 'https://github.com/MasumaLameya', '/assets/images/project-mental-health.jpg', '["/assets/images/project-mental-health.jpg"]'::jsonb, 'AI-assisted web-based mental health platform integrating PHQ-9 & C-SSRS assessments and Gemini live AI support.', 'Developed a web-based mental health monitoring platform integrating PHQ-9 and C-SSRS assessments, semester-wise risk monitoring, and AI-assisted student support. Implemented Gemini-powered chat and live voice interaction, automated risk assessment, counseling management, and psychologist assignment for high-risk students.'),
('Real Estate CRM System', 'real-estate-crm-system', 'Enterprise Web App', 'Real Capital Group', '2023 - 2024', 'Masuma Akter Lameya', 'ASP.NET Core, .NET MVC, REST APIs, MySQL, Entity Framework Core', 'https://github.com/MasumaLameya', '/assets/images/project-real-estate-crm.jpg', '["/assets/images/project-real-estate-crm.jpg"]'::jsonb, 'Comprehensive CRM platform to manage client leads, sales activities, follow-ups, and customer relationship data.', 'Developed an enterprise Real Estate CRM System for Real Capital Group. Engineered backend services and RESTful APIs with ASP.NET Core, designed and optimized MySQL databases, and implemented core business logic for lead management, customer tracking, and team collaboration.'),
('ModernShop – E-Commerce & Shop Management', 'modernshop-ecommerce-management', 'E-Commerce', 'Retail Prototype', '2024', 'Masuma Akter Lameya', 'ASP.NET Core MVC, MySQL, HTML, CSS, Bootstrap, JavaScript', 'https://github.com/MasumaLameya', '/assets/images/project-modern-shop.jpg', '["/assets/images/project-modern-shop.jpg"]'::jsonb, 'Prototype shop management platform with product browsing, cart, order processing, and administrative dashboard.', 'Developed a prototype e-commerce and shop management platform with product catalog browsing, cart management, order processing, and customer management functionalities. Implemented an administrative dashboard for managing products, categories, inventory, and orders through a responsive web interface.'),
('TodoNova – Task Management Web App', 'todonova-task-management', 'Productivity Web App', 'Productivity Suite', '2024', 'Masuma Akter Lameya', 'ASP.NET Core MVC, MySQL, HTML, CSS, Bootstrap, JavaScript', 'https://github.com/MasumaLameya', '/assets/images/project-todonova.jpg', '["/assets/images/project-todonova.jpg"]'::jsonb, 'Task management web application with priority tracking, deadline reminders, and responsive interface.', 'Developed a web-based task management application for creating, organizing, updating, and tracking daily tasks. Implemented task status and priority management, deadline tracking, and an intuitive responsive user interface for personal and team productivity.')
ON CONFLICT (slug) DO NOTHING;

-- 3. Seed Blogs / IEEE Publications
INSERT INTO public.blogs (title, slug, category, date, author, cover_image, summary, content, tags)
VALUES
('Developer-Oriented Classification of Mobile App Reviews Using a Hybrid BERT-XGBoost Ensemble', 'hybrid-bert-xgboost-mobile-app-reviews', 'Research (IEEE)', '2026', 'Masuma Akter Lameya (1st Author)', '/assets/images/blog-bert-xgboost.jpg', 'A novel hybrid NLP architecture combining fine-tuned BERT representations with an XGBoost classifier for automated developer-oriented categorization of user reviews.', 'Conference Publication at 2026 IEEE 2nd International Conference on Quantum Photonics, Artificial Intelligence & Networking (QPAIN), 2026.\n\nAuthor Position: 1st Author.\n\nDOI: 10.1109/QPAIN69676.2026.11546035\n\nAbstract:\nThis research proposes a hybrid machine learning and deep learning framework combining BERT contextual embeddings with an XGBoost classifier for automated, developer-oriented sentiment and category classification of mobile app reviews. The system effectively extracts actionable bug reports, feature requests, and user experience feedback with high empirical precision.', '["IEEE Publication", "BERT", "NLP", "XGBoost", "Machine Learning"]'::jsonb),
('EffiViT-Hybrid: A CNN–Transformer Framework for Pancreatic Cancer Detection from CT Images', 'effivit-hybrid-pancreatic-cancer-detection', 'Medical AI (IEEE)', '2026', 'Masuma Akter Lameya (3rd Author)', '/assets/images/blog-effivit-cancer.jpg', 'Fused CNN and Vision Transformer framework capturing localized textural lesion patterns alongside global contextual dependencies for highly accurate early-stage cancer detection.', 'Conference Publication at 2026 IEEE 2nd International Conference on Quantum Photonics, Artificial Intelligence & Networking (QPAIN), 2026.\n\nAuthor Position: 3rd Author.\n\nDOI: 10.1109/QPAIN69676.2026.11546439\n\nAbstract:\nPancreatic cancer diagnosis from abdominal CT scans is clinically challenging due to complex surrounding anatomy and subtle early lesion margins. This paper introduces EffiViT-Hybrid, a fused architecture that leverages CNN feature extraction for local tissue textures alongside Vision Transformer attention mechanisms for global anatomical context.', '["IEEE Publication", "Medical AI", "Vision Transformer", "Deep Learning", "Computer Vision"]'::jsonb)
ON CONFLICT (slug) DO NOTHING;

-- 4. Seed Resume Items
INSERT INTO public.resume_items (type, period, title, organization, description, sort_order)
VALUES
('experience', 'June 2026 - Sep 2026', 'Software Developer', 'Real Capital Group (Dhaka, Bangladesh)', 'Developed Real Estate CRM System, engineered backend services & RESTful APIs using ASP.NET Core / .NET, designed MySQL databases, and implemented core CRM business logic.', 1),
('experience', '2022 - Present', 'Event Coordinator', 'IEEE CS IUBAT Student Branch Chapter', 'Contributed to technical event planning, workshop coordination, and participant management at IEEE Computer Society.', 2),
('experience', '2022 - Present', 'Math Club Manager', 'IUBAT IT Society', 'Organized and managed mathematics-focused analytical problem-solving sessions, workshops, and student learning initiatives.', 3),
('experience', '2022 - Present', 'Academic Mentor & AI Researcher', 'IUBAT Computer Science & Engineering', 'Mentored university students in programming languages, data structures, and learning strategies. Authored 2 IEEE conference research papers in AI & Medical Vision.', 4),
('education', 'Sep 2022 - Sep 2026', 'Bachelor of Science in Computer Science and Engineering', 'IUBAT (Dhaka, Bangladesh) — CGPA: 3.86/4.00', 'Dean''s list academic excellence. Specialized in Full-Stack Software Engineering, Deep Learning, Biomedical Signal Processing, Algorithms, and Object-Oriented Programming.', 1),
('education', '2019 - 2021', 'Higher Secondary Certificate (HSC) — Science', 'Jatir Janak Bangabandhu Sheikh Mujibur Rahman Govt College — GPA: 5.00/5.00', 'Graduated with a perfect GPA 5.00 in Science division. Strong foundation in Higher Mathematics, Physics, Chemistry, and Information Technology.', 2),
  ('education', '2017 - 2019', 'Secondary School Certificate (SSC) — Science', 'Kamarpara School and College — GPA: 5.00/5.00', 'Achieved top-tier GPA 5.00 with distinction. Active Science Olympiad participant and competitive problem solver.', 3);


-- Seed Services
INSERT INTO public.services (title, description, icon, sort_order)
VALUES
('Web & Mobile Development', 'Building lightning-fast, pixel-perfect, responsive web applications using modern technologies.', 'bi bi-code-slash', 1),
('Digital Marketing', 'Crafting intuitive user experiences, wireframes, and design systems with high aesthetic value.', 'bi bi-laptop', 2),
('Branding & Strategy', 'Professional portrait, product, and architectural photoshoot with high-end color grading.', 'bi bi-gear', 3),
('User Testing & Personas', 'Optimizing website speeds, Core Web Vitals, and search engine visibility for higher reach.', 'bi bi-person', 4)
ON CONFLICT DO NOTHING;

-- Seed Testimonials
INSERT INTO public.testimonials (name, role, company, avatar, feedback, rating)
VALUES
('Sandra Radford', 'CTO', 'FlaTheme', '/assets/images/testimonial-1.7265d4b8.jpg', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean massa. Cum sociis natoque penatibus et magnis.', 5),
('Sandra Radford', 'Project Manager', 'FlaTheme', '/assets/images/testimonial-2.ff2ba033.jpg', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean massa. Cum sociis natoque penatibus et magnis.', 5),
('Sandra Radford', 'Developer', 'FlaTheme', '/assets/images/testimonial-3.cb371b2d.jpg', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean massa. Cum sociis natoque penatibus et magnis.', 5)
ON CONFLICT DO NOTHING;

-- Seed Resume Items
INSERT INTO public.resume_items (type, period, title, organization, description, sort_order)
VALUES
('education', '2020 - 2023', 'Bachelor Degree of Business', 'University of Business', 'Specializing in marketing, product operations and strategy.', 1),
('education', '2018 - 2020', 'Master Degree of Design', 'University of IT', 'Advanced studies in UX architecture and interactive interface systems.', 2),
('education', '2014 - 2018', 'Bachelor Degree of Design', 'University of Design', 'Foundations of typography, color theory, and digital graphics.', 3),
('experience', '2020 - PRESENT', 'Director of Operations', 'FlaTheme', 'Overseeing creative and technical execution across global client teams.', 4),
('experience', '2018 - 2020', 'Senior Designer', 'FlaTheme', 'Leading UI/UX systems and responsive front-end components.', 5),
('experience', '2014 - 2018', 'UI & UX Designer', 'FlaTheme', 'Designing prototypes, design systems, and client interfaces.', 6)
ON CONFLICT DO NOTHING;

-- Seed Clients
INSERT INTO public.clients (name, logo_url, website_url)
VALUES
('Client 1', '/assets/images/client-1.ea45e491.png', 'https://example.com'),
('Client 2', '/assets/images/client-2.ce0104f2.png', 'https://example.com'),
('Client 3', '/assets/images/client-3.c22c0e73.png', 'https://example.com'),
('Client 4', '/assets/images/client-4.39ef1981.png', 'https://example.com'),
('Client 5', '/assets/images/client-5.d0fa8b8c.png', 'https://example.com'),
('Client 6', '/assets/images/client-6.9213d4c2.png', 'https://example.com')
ON CONFLICT DO NOTHING;
