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
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Anyone can READ data, but only logged-in ADMIN can INSERT, UPDATE, DELETE
-- ==============================================================================

ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Profile Policies
DROP POLICY IF EXISTS "Public can view profile" ON public.profile;
CREATE POLICY "Public can view profile" ON public.profile FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin can manage profile" ON public.profile;
CREATE POLICY "Admin can manage profile" ON public.profile FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Projects Policies
DROP POLICY IF EXISTS "Public can view projects" ON public.projects;
CREATE POLICY "Public can view projects" ON public.projects FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin can manage projects" ON public.projects;
CREATE POLICY "Admin can manage projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Blogs Policies
DROP POLICY IF EXISTS "Public can view blogs" ON public.blogs;
CREATE POLICY "Public can view blogs" ON public.blogs FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin can manage blogs" ON public.blogs;
CREATE POLICY "Admin can manage blogs" ON public.blogs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Services Policies
DROP POLICY IF EXISTS "Public can view services" ON public.services;
CREATE POLICY "Public can view services" ON public.services FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin can manage services" ON public.services;
CREATE POLICY "Admin can manage services" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Testimonials Policies
DROP POLICY IF EXISTS "Public can view testimonials" ON public.testimonials;
CREATE POLICY "Public can view testimonials" ON public.testimonials FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin can manage testimonials" ON public.testimonials;
CREATE POLICY "Admin can manage testimonials" ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Resume Items Policies
DROP POLICY IF EXISTS "Public can view resume_items" ON public.resume_items;
CREATE POLICY "Public can view resume_items" ON public.resume_items FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin can manage resume_items" ON public.resume_items;
CREATE POLICY "Admin can manage resume_items" ON public.resume_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Clients Policies
DROP POLICY IF EXISTS "Public can view clients" ON public.clients;
CREATE POLICY "Public can view clients" ON public.clients FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin can manage clients" ON public.clients;
CREATE POLICY "Admin can manage clients" ON public.clients FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Contact Messages Policies
DROP POLICY IF EXISTS "Public can insert contact_messages" ON public.contact_messages;
CREATE POLICY "Public can insert contact_messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admin can manage contact_messages" ON public.contact_messages;
CREATE POLICY "Admin can manage contact_messages" ON public.contact_messages FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ==============================================================================
-- STORAGE BUCKET CREATION (Public Read)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public can view media" ON storage.objects;
CREATE POLICY "Public can view media" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-media');

DROP POLICY IF EXISTS "Authenticated users can upload media" ON storage.objects;
CREATE POLICY "Authenticated users can upload media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-media');

DROP POLICY IF EXISTS "Authenticated users can update media" ON storage.objects;
CREATE POLICY "Authenticated users can update media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'portfolio-media');

DROP POLICY IF EXISTS "Authenticated users can delete media" ON storage.objects;
CREATE POLICY "Authenticated users can delete media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio-media');

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================

-- Seed Profile
INSERT INTO public.profile (name, role, avatar_url, bio, photoshoot_pct, tailwind_pct, seo_pct, years_experience, hours_working, projects_done, email, phone, address)
VALUES (
  'Christina Gray',
  'UI & UX Designer. Photographer',
  '/assets/images/hero-avatar.1925fb85.jpg',
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  95, 90, 80, 14, '50', 90,
  'flatheme@gmail.com', '+976 12 34 9999', '121 King St, Melbourne VIC 3000'
) ON CONFLICT DO NOTHING;

-- Seed Projects
INSERT INTO public.projects (title, slug, category, client, start_date, designer, tools, project_url, main_image, images, short_description, full_description)
VALUES
('Glasses of Cocktail', 'glasses-of-cocktail', 'Branding', 'Cocktail Studio', 'Jan 2024', 'Christina Gray', 'Figma, Illustrator', 'https://example.com', '/assets/images/portfolio-1.9aa83f65.jpg', '["/assets/images/portfolio-1.9aa83f65.jpg", "/assets/images/p-single-1.2c6b95e9.jpg"]'::jsonb, 'Comprehensive brand identity and lifestyle photography shoot created for high-end cocktail bar branding.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
('A Cute Dog', 'a-cute-dog', 'Mockup', 'PetCare Co.', 'Feb 2024', 'Christina Gray', 'Figma, Photoshop', 'https://example.com', '/assets/images/portfolio-2.dc4d8dd8.jpg', '["/assets/images/portfolio-2.dc4d8dd8.jpg", "/assets/images/p-single-2.3b8d2066.jpg"]'::jsonb, 'A playful and friendly mockup identity concept designed for pet accessory products.', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
('Single Product Mockup', 'single-product-mockup', 'Branding', 'Luxe Cosmetics', 'Mar 2024', 'Christina Gray', 'Sony A7R IV, Lightroom', 'https://example.com', '/assets/images/portfolio-3.772523de.jpg', '["/assets/images/portfolio-3.772523de.jpg", "/assets/images/p-single-3.d64779e4.jpg"]'::jsonb, 'Minimalist cosmetics bottle packaging mockup focused on luxury glass reflections and metallic accents.', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'),
('Attractive Poster', 'attractive-poster', 'Mockup', 'Urban Gallery', 'Apr 2024', 'Christina Gray', 'Tailwind CSS, Illustrator', 'https://example.com', '/assets/images/portfolio-4.884e57ca.jpg', '["/assets/images/portfolio-4.884e57ca.jpg", "/assets/images/portfolio-1.9aa83f65.jpg"]'::jsonb, 'Contemporary typographic exhibition poster created for modern arts showcase.', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
ON CONFLICT (slug) DO NOTHING;

-- Seed Blogs
INSERT INTO public.blogs (title, slug, category, date, author, cover_image, summary, content, tags)
VALUES
('4 Years of Working From Home', '4-years-of-working-from-home', 'Design', '24 Oct 2024', 'Christina Gray', '/assets/images/blog-post-1.a6d3ea41.jpg', 'A comprehensive retrospective on productivity, mental clarity, workspace ergonomics, and creative output after 4 solid years of remote design work.', 'Working remotely for four years transforms how you view productivity. In this article, we dive into routine design, deep work habits, boundary setting with clients, and building an ergonomic home studio that fosters daily inspiration.', '["Remote Work", "Design", "Productivity"]'::jsonb),
('Mastering Color Schemes in Modern UI', 'mastering-color-schemes-in-modern-ui', 'Trends', '18 Oct 2024', 'Christina Gray', '/assets/images/blog-post-2.99e40feb.jpg', 'How subtle tinting and accessible contrast ratios create premium dark and light interfaces.', 'Colors evoke emotional reactions and define software identity. Discover modern HSL color harmony, dark mode lightness balance, and Tailwind color tokenization.', '["UI Design", "Color Theory", "Tailwind"]'::jsonb),
('The Future of Component Design Systems', 'future-of-component-design-systems', 'Tech', '05 Oct 2024', 'Christina Gray', '/assets/images/blog-post-3.1e8acfca.jpg', 'How micro-frontends and atomic tokenization are reshaping enterprise digital products.', 'Component libraries are no longer static button catalogs. Modern design systems are living ecosystems built on unified tokens across web and mobile platforms.', '["Design System", "Angular", "Frontend"]'::jsonb)
ON CONFLICT (slug) DO NOTHING;

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
