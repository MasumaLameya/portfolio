const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://euertyrqjpxeerirtars.supabase.co';
const SUPABASE_KEY = 'sb_publishable_cgG20CGLDSoWLz2I1pW7FQ_HNZpgwm-';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function syncDatabase() {
  console.log('🔄 Starting complete Supabase database sync...');

  // 1. PROFILE
  console.log('Syncing Profile...');
  await supabase.from('profile').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const profilePayload = {
    name: 'MST. MASUMA AKTER LAMEYA',
    role: 'Full-Stack Developer & AI Engineer',
    avatar_url: '/assets/images/masuma-profile-me.jpg',
    bio: 'Full-Stack Developer with experience in web application development, machine learning, and AI-integrated solutions. Skilled in developing end-to-end applications, managing databases, and implementing intelligent features with ASP.NET Core, Angular, Python, and Deep Learning.',
    typewriter_words: [
      'Masuma Akter Lameya',
      'Full-Stack Developer',
      'AI & ML Researcher',
      'ASP.NET Core & Angular',
      'Medical AI Specialist'
    ],
    photoshoot_pct: 95,
    tailwind_pct: 90,
    seo_pct: 88,
    years_experience: 2,
    hours_working: '15',
    projects_done: 12,
    email: 'masumalamya7@gmail.com',
    phone: '+880 1409-015552',
    address: 'Dhaka, Bangladesh',
    social_facebook: 'https://facebook.com',
    social_twitter: 'https://twitter.com',
    social_instagram: 'https://instagram.com',
    social_github: 'https://github.com/MasumaLameya',
    social_linkedin: 'https://linkedin.com/in/obaidul-haque47/'
  };
  const { error: profileErr } = await supabase.from('profile').insert([profilePayload]);
  if (profileErr) console.error('Profile insert error:', profileErr);
  else console.log('✅ Profile synced successfully.');

  // 2. PROJECTS
  console.log('Syncing Projects...');
  await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const projectsData = [
    {
      title: 'Student Mental Health Monitoring System',
      slug: 'student-mental-health-monitoring-system',
      category: 'AI & Web Platform',
      client: 'Academic & Healthcare Project',
      start_date: '2024',
      designer: 'Masuma Akter Lameya',
      tools: 'ASP.NET Core MVC, MySQL, HTML, CSS, Bootstrap, JavaScript, Gemini AI',
      project_url: 'https://github.com/MasumaLameya',
      main_image: '/assets/images/project-mental-health.jpg',
      images: ['/assets/images/project-mental-health.jpg'],
      short_description: 'AI-assisted web-based mental health platform integrating PHQ-9 & C-SSRS assessments and Gemini live AI support.',
      full_description: 'Developed a web-based mental health monitoring platform integrating PHQ-9 and C-SSRS assessments, semester-wise risk monitoring, and AI-assisted student support. Implemented Gemini-powered chat and live voice interaction, automated risk assessment, counseling management, and psychologist assignment for high-risk students.'
    },
    {
      title: 'Real Estate CRM System',
      slug: 'real-estate-crm-system',
      category: 'Enterprise Web App',
      client: 'Real Capital Group',
      start_date: '2023 - 2024',
      designer: 'Masuma Akter Lameya',
      tools: 'ASP.NET Core, .NET MVC, REST APIs, MySQL, Entity Framework Core',
      project_url: 'https://github.com/MasumaLameya',
      main_image: '/assets/images/project-real-estate-crm.jpg',
      images: ['/assets/images/project-real-estate-crm.jpg'],
      short_description: 'Comprehensive CRM platform to manage client leads, sales activities, follow-ups, and customer relationship data.',
      full_description: 'Developed an enterprise Real Estate CRM System for Real Capital Group. Engineered backend services and RESTful APIs with ASP.NET Core, designed and optimized MySQL databases, and implemented core business logic for lead management, customer tracking, and team collaboration.'
    },
    {
      title: 'ModernShop – E-Commerce & Shop Management',
      slug: 'modernshop-ecommerce-management',
      category: 'E-Commerce',
      client: 'Retail Prototype',
      start_date: '2024',
      designer: 'Masuma Akter Lameya',
      tools: 'ASP.NET Core MVC, MySQL, HTML, CSS, Bootstrap, JavaScript',
      project_url: 'https://github.com/MasumaLameya',
      main_image: '/assets/images/project-modern-shop.jpg',
      images: ['/assets/images/project-modern-shop.jpg'],
      short_description: 'Prototype shop management platform with product browsing, cart, order processing, and administrative dashboard.',
      full_description: 'Developed a prototype e-commerce and shop management platform with product catalog browsing, cart management, order processing, and customer management functionalities. Implemented an administrative dashboard for managing products, categories, inventory, and orders through a responsive web interface.'
    },
    {
      title: 'TodoNova – Task Management Web App',
      slug: 'todonova-task-management',
      category: 'Productivity Web App',
      client: 'Productivity Suite',
      start_date: '2024',
      designer: 'Masuma Akter Lameya',
      tools: 'ASP.NET Core MVC, MySQL, HTML, CSS, Bootstrap, JavaScript',
      project_url: 'https://github.com/MasumaLameya',
      main_image: '/assets/images/project-todonova.jpg',
      images: ['/assets/images/project-todonova.jpg'],
      short_description: 'Task management web application with priority tracking, deadline reminders, and responsive interface.',
      full_description: 'Developed a web-based task management application for creating, organizing, updating, and tracking daily tasks. Implemented task status and priority management, deadline tracking, and an intuitive responsive user interface for personal and team productivity.'
    }
  ];
  const { error: projErr } = await supabase.from('projects').insert(projectsData);
  if (projErr) console.error('Projects insert error:', projErr);
  else console.log('✅ Projects synced successfully.');

  // 3. BLOGS / RESEARCH PUBLICATIONS
  console.log('Syncing Research Publications...');
  await supabase.from('blogs').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const blogsData = [
    {
      title: 'Developer-Oriented Classification of Mobile App Reviews Using a Hybrid BERT-XGBoost Ensemble',
      slug: 'hybrid-bert-xgboost-mobile-app-reviews',
      category: 'Research (IEEE)',
      date: '2026',
      author: 'Masuma Akter Lameya (1st Author)',
      cover_image: '/assets/images/blog-bert-xgboost.jpg',
      summary: 'A novel hybrid NLP architecture combining fine-tuned BERT representations with an XGBoost classifier for automated developer-oriented categorization of user reviews.',
      content: 'Conference Publication at 2026 IEEE 2nd International Conference on Quantum Photonics, Artificial Intelligence & Networking (QPAIN), 2026.\n\nAuthor Position: 1st Author.\n\nDOI: 10.1109/QPAIN69676.2026.11546035\n\nAbstract:\nThis research proposes a hybrid machine learning and deep learning framework combining BERT contextual embeddings with an XGBoost classifier for automated, developer-oriented sentiment and category classification of mobile app reviews. The system effectively extracts actionable bug reports, feature requests, and user experience feedback with high empirical precision.',
      tags: ['IEEE Publication', 'BERT', 'NLP', 'XGBoost', 'Machine Learning'],
      paper_url: 'https://doi.org/10.1109/QPAIN69676.2026.11546035'
    },
    {
      title: 'EffiViT-Hybrid: A CNN–Transformer Framework for Pancreatic Cancer Detection from CT Images',
      slug: 'effivit-hybrid-pancreatic-cancer-detection',
      category: 'Medical AI (IEEE)',
      date: '2026',
      author: 'Masuma Akter Lameya (3rd Author)',
      cover_image: '/assets/images/blog-effivit-cancer.jpg',
      summary: 'Fused CNN and Vision Transformer framework capturing localized textural lesion patterns alongside global contextual dependencies for highly accurate early-stage cancer detection.',
      content: 'Conference Publication at 2026 IEEE 2nd International Conference on Quantum Photonics, Artificial Intelligence & Networking (QPAIN), 2026.\n\nAuthor Position: 3rd Author.\n\nDOI: 10.1109/QPAIN69676.2026.11546439\n\nAbstract:\nPancreatic cancer diagnosis from abdominal CT scans is clinically challenging due to complex surrounding anatomy and subtle early lesion margins. This paper introduces EffiViT-Hybrid, a fused architecture that leverages CNN feature extraction for local tissue textures alongside Vision Transformer attention mechanisms for global anatomical context.',
      tags: ['IEEE Publication', 'Medical AI', 'Vision Transformer', 'Deep Learning', 'Computer Vision'],
      paper_url: 'https://doi.org/10.1109/QPAIN69676.2026.11546439'
    }
  ];
  const { error: blogErr } = await supabase.from('blogs').insert(blogsData);
  if (blogErr) console.error('Blogs insert error:', blogErr);
  else console.log('✅ Blogs synced successfully.');

  // 4. RESUME ITEMS
  console.log('Syncing Resume...');
  await supabase.from('resume_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const resumeData = [
    {
      type: 'experience',
      period: 'June 2026 - Sep 2026',
      title: 'Software Developer',
      organization: 'Real Capital Group (Dhaka, Bangladesh)',
      description: 'Developed Real Estate CRM System, engineered backend services & RESTful APIs using ASP.NET Core / .NET, designed MySQL databases, and implemented core CRM business logic.',
      sort_order: 1
    },
    {
      type: 'experience',
      period: '2022 - Present',
      title: 'Event Coordinator',
      organization: 'IEEE CS IUBAT Student Branch Chapter',
      description: 'Contributed to technical event planning, workshop coordination, and participant management at IEEE Computer Society.',
      sort_order: 2
    },
    {
      type: 'experience',
      period: '2022 - Present',
      title: 'Math Club Manager',
      organization: 'IUBAT IT Society',
      description: 'Organized and managed mathematics-focused analytical problem-solving sessions, workshops, and student learning initiatives.',
      sort_order: 3
    },
    {
      type: 'experience',
      period: '2022 - Present',
      title: 'Academic Mentor & AI Researcher',
      organization: 'IUBAT Computer Science & Engineering',
      description: 'Mentored university students in programming languages, data structures, and learning strategies. Authored 2 IEEE conference research papers in AI & Medical Vision.',
      sort_order: 4
    },
    {
      type: 'education',
      period: 'Sep 2022 - Sep 2026',
      title: 'Bachelor of Science in Computer Science and Engineering',
      organization: 'IUBAT (Dhaka, Bangladesh) — CGPA: 3.86/4.00',
      description: "Dean's list academic excellence. Specialized in Full-Stack Software Engineering, Deep Learning, Biomedical Signal Processing, Algorithms, and Object-Oriented Programming.",
      sort_order: 1
    },
    {
      type: 'education',
      period: '2019 - 2021',
      title: 'Higher Secondary Certificate (HSC) — Science',
      organization: 'Jatir Janak Bangabandhu Sheikh Mujibur Rahman Govt College — GPA: 5.00/5.00',
      description: 'Graduated with a perfect GPA 5.00 in Science division. Strong foundation in Higher Mathematics, Physics, Chemistry, and Information Technology.',
      sort_order: 2
    },
    {
      type: 'education',
      period: '2017 - 2019',
      title: 'Secondary School Certificate (SSC) — Science',
      organization: 'Kamarpara School and College — GPA: 5.00/5.00',
      description: 'Achieved top-tier GPA 5.00 with distinction. Active Science Olympiad participant and competitive problem solver.',
      sort_order: 3
    }
  ];
  const { error: resErr } = await supabase.from('resume_items').insert(resumeData);
  if (resErr) console.error('Resume insert error:', resErr);
  else console.log('✅ Resume synced successfully.');

  // 5. SERVICES
  console.log('Syncing Services...');
  await supabase.from('services').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const servicesData = [
    { title: 'Full-Stack Web Development', description: 'Architecting robust end-to-end web applications with ASP.NET Core, .NET MVC, Angular, Next.js, and REST APIs.', icon: 'bi bi-code-slash', sort_order: 1 },
    { title: 'AI & Machine Learning Solutions', description: 'Implementing intelligent ML models, PyTorch/TensorFlow pipelines, Gemini AI integration, NLP, and RAG systems.', icon: 'bi bi-cpu', sort_order: 2 },
    { title: 'Medical AI & Computer Vision', description: 'Deep learning frameworks (CNNs, Vision Transformers) for biomedical image classification, CT analysis, and XAI.', icon: 'bi bi-eye', sort_order: 3 },
    { title: 'Database & API Architecture', description: 'Designing high-performance schemas in MySQL, PostgreSQL, SQL Server, and securing scalable backend services.', icon: 'bi bi-database', sort_order: 4 }
  ];
  const { error: srvErr } = await supabase.from('services').insert(servicesData);
  if (srvErr) console.error('Services insert error:', srvErr);
  else console.log('✅ Services synced successfully.');

  // 6. TESTIMONIALS
  console.log('Syncing Testimonials...');
  await supabase.from('testimonials').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const testimonialsData = [
    { name: 'Dr. Md. Tariqul Islam', role: 'Professor & Research Lead', company: 'IUBAT CSE Department', avatar: '/assets/images/testimonial-1.7265d4b8.jpg', feedback: 'Masuma is a brilliant researcher and developer. Her work on hybrid BERT models and medical imaging frameworks demonstrated exceptional technical rigor and innovative problem solving.', rating: 5 },
    { name: 'Engr. Rafiqul Hassan', role: 'Project Lead', company: 'Real Capital Group', avatar: '/assets/images/testimonial-2.ff2ba033.jpg', feedback: 'Masuma delivered our Real Estate CRM system with exceptional reliability and clean ASP.NET Core architecture. Her database optimization and REST API skills are top tier.', rating: 5 },
    { name: 'IEEE Student Branch Committee', role: 'Branch Counselor', company: 'IEEE Computer Society', avatar: '/assets/images/testimonial-3.cb371b2d.jpg', feedback: 'Her leadership as Event Coordinator and dedication as an Academic Mentor has inspired countless students in coding, problem solving, and research.', rating: 5 }
  ];
  const { error: tstErr } = await supabase.from('testimonials').insert(testimonialsData);
  if (tstErr) console.error('Testimonials insert error:', tstErr);
  else console.log('✅ Testimonials synced successfully.');

  console.log('🎉 Supabase Cloud Database is now 100% updated and clean!');
}

syncDatabase().catch(console.error);
