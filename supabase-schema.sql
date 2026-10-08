-- ==============================================================================
-- SUPABASE DATABASE SCHEMA & INITIAL DATA FOR PORTFOLIO (MASUMA AKTER LAMEYA)
-- Run this complete script in your Supabase Project: SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. PROFILE TABLE
CREATE TABLE IF NOT EXISTS public.profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'MST. MASUMA AKTER LAMEYA',
  role TEXT NOT NULL DEFAULT 'Full-Stack Developer & AI Engineer',
  avatar_url TEXT DEFAULT '/assets/images/masuma-profile-me.jpg',
  bio TEXT DEFAULT 'Full-Stack Developer with experience in web application development, machine learning, and AI-integrated solutions. Skilled in developing end-to-end applications, managing databases, and implementing intelligent features with ASP.NET Core, Angular, Python, and Deep Learning.',
  typewriter_words JSONB DEFAULT '["Masuma Akter Lameya", "Full-Stack Developer", "AI & ML Researcher", "ASP.NET Core & Angular", "Medical AI Specialist"]'::jsonb,
  photoshoot_pct INT DEFAULT 95,
  tailwind_pct INT DEFAULT 90,
  seo_pct INT DEFAULT 88,
  years_experience INT DEFAULT 2,
  hours_working TEXT DEFAULT '15',
  projects_done INT DEFAULT 12,
  email TEXT DEFAULT 'masumalamya7@gmail.com',
  phone TEXT DEFAULT '+880 1409-015552',
  address TEXT DEFAULT 'Dhaka, Bangladesh',
  social_facebook TEXT DEFAULT 'https://facebook.com',
  social_twitter TEXT DEFAULT 'https://twitter.com',
  social_instagram TEXT DEFAULT 'https://instagram.com',
  social_github TEXT DEFAULT 'https://github.com/MasumaLameya',
  social_linkedin TEXT DEFAULT 'https://linkedin.com/in/obaidul-haque47/',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL DEFAULT 'AI & Web Platform',
  client TEXT DEFAULT 'Academic & Healthcare Project',
  start_date TEXT DEFAULT '2024',
  designer TEXT DEFAULT 'Masuma Akter Lameya',
  tools TEXT DEFAULT 'ASP.NET Core MVC, MySQL, HTML, CSS, Bootstrap, JavaScript, Gemini AI',
  project_url TEXT DEFAULT 'https://github.com/MasumaLameya',
  main_image TEXT NOT NULL,
  images JSONB DEFAULT '[]'::jsonb,
  short_description TEXT DEFAULT '',
  full_description TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. BLOGS TABLE (IEEE RESEARCH PUBLICATIONS)
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL DEFAULT 'Research (IEEE)',
  date TEXT NOT NULL DEFAULT '2026',
  author TEXT NOT NULL DEFAULT 'Masuma Akter Lameya (1st Author)',
  cover_image TEXT NOT NULL,
  summary TEXT DEFAULT '',
  content TEXT DEFAULT '',
  tags JSONB DEFAULT '["IEEE Publication", "BERT", "NLP", "Machine Learning"]'::jsonb,
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
  website_url TEXT DEFAULT 'https://github.com/MasumaLameya',
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
-- DISABLE ROW LEVEL SECURITY (RLS) FOR INSTANT ZERO-LATENCY CROSS-DEVICE CRUD
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
-- ENABLE SUPABASE REALTIME REPLICATION FOR LIVE WEBSOCKET BROADCASTS
-- ==============================================================================
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.profile, public.projects, public.blogs, public.services, public.testimonials, public.resume_items, public.clients;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN others THEN NULL;
END $$;

-- ==============================================================================
-- STORAGE BUCKET CREATION (Public Read & Write)
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
