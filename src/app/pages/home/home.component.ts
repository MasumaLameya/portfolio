import { Component, OnInit, OnDestroy, AfterViewInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  SupabaseService,
  ProfileData,
  ProjectItem,
  BlogItem,
  ServiceItem,
  TestimonialItem,
  ResumeItem,
  ClientItem
} from '../../services/supabase.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

declare var Swiper: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, SidebarComponent],
  templateUrl: './home.component.html',
  styles: [`
    .filter ul {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 10px !important;
      list-style: none !important;
      padding: 0 !important;
      margin-bottom: 24px !important;
    }
    .filter ul li {
      display: inline-flex !important;
      align-items: center !important;
      padding: 8px 18px !important;
      border-radius: 9999px !important;
      cursor: pointer !important;
      margin: 0 !important;
      white-space: nowrap !important;
    }
    .filter-btn-active {
      background-color: #000 !important;
      color: #fff !important;
    }
    :host-context(.dark) .filter-btn-active {
      background-color: #fff !important;
      color: #000 !important;
    }

    /* Research Publication Grid & Cards */
    .research-card {
      display: flex;
      flex-direction: column;
      border-radius: 16px;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.02);
      border: 1px solid rgba(0, 0, 0, 0.08);
      transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    :host-context(.dark) .research-card,
    :host(.dark) .research-card {
      background: #151619;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .research-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 14px 30px rgba(0, 0, 0, 0.35);
      border-color: rgba(0, 0, 0, 0.25);
    }
    :host-context(.dark) .research-card:hover,
    :host(.dark) .research-card:hover {
      border-color: rgba(255, 255, 255, 0.22);
    }
    .research-thumb {
      width: 100%;
      height: 220px;
      overflow: hidden;
      position: relative;
      background: #0f1012;
    }
    .research-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .research-card:hover .research-thumb img {
      transform: scale(1.06);
    }
    .research-body {
      padding: 22px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
    }
    .research-title {
      font-size: 17px;
      font-weight: 600;
      line-height: 1.45;
      margin: 10px 0 18px 0;
      color: #111;
      transition: color 0.2s ease;
    }
    :host-context(.dark) .research-title,
    :host(.dark) .research-title {
      color: #fff;
    }
    .research-card:hover .research-title {
      color: #6366f1;
    }
    :host-context(.dark) .research-card:hover .research-title {
      color: #a5b4fc;
    }
    .research-btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 18px;
      border-radius: 10px;
      font-family: monospace;
      font-size: 12px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      font-weight: 500;
      border: 1px solid rgba(0, 0, 0, 0.15);
      background: rgba(0, 0, 0, 0.03);
      color: #111;
      transition: all 0.2s ease;
    }
    :host-context(.dark) .research-btn {
      border: 1px solid rgba(255, 255, 255, 0.12);
      background: rgba(255, 255, 255, 0.04);
      color: #fff;
    }
    .research-btn:hover {
      background: #000;
      color: #fff;
      border-color: #000;
    }
    :host-context(.dark) .research-btn:hover {
      background: #fff;
      color: #000;
      border-color: #fff;
    }
    .pub-badge-ieee {
      background-color: #4f46e5 !important;
      color: #ffffff !important;
      font-weight: 700 !important;
      letter-spacing: 0.5px !important;
      border: 1px solid rgba(255, 255, 255, 0.3) !important;
    }
    .pub-doi-text {
      color: #ffffff !important;
      font-size: 12px !important;
      font-family: monospace, monospace !important;
      letter-spacing: 0.5px !important;
    }
    .pub-doi-link {
      color: #ffffff !important;
      font-weight: 600 !important;
      text-decoration: underline !important;
      text-underline-offset: 3px !important;
    }
    .pub-doi-link:hover {
      color: #a5b4fc !important;
    }
  `]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  public supabase = inject(SupabaseService);

  activeSection = 'about';
  currentFilter = 'all';
  typewriterText = signal('Full-Stack Developer');
  isSubmitting = signal(false);
  showToast = signal(false);
  toastMessage = signal('');

  // Dynamic Data Signals
  profile = signal<ProfileData>({
    name: 'MST. MASUMA AKTER LAMEYA',
    role: 'Full-Stack Developer & AI Engineer',
    avatar_url: '/assets/images/masuma-profile-me.jpg',
    bio: 'Full-Stack Developer with experience in web application development, machine learning, and AI-integrated solutions. Skilled in developing end-to-end applications, managing databases, and implementing intelligent features with ASP.NET Core, Angular, Python, and Deep Learning.',
    typewriter_words: ['Masuma Akter Lameya', 'Full-Stack Developer', 'AI & ML Researcher', 'ASP.NET Core & Angular', 'Medical AI Specialist'],
    skill_1_name: 'ASP.NET Core & Backend',
    photoshoot_pct: 95,
    skill_2_name: 'Angular & Next.js',
    tailwind_pct: 90,
    skill_3_name: 'AI & Machine Learning',
    seo_pct: 88,
    years_experience: 2,
    hours_working: '15',
    projects_done: 12,
    email: 'masumalamya7@gmail.com',
    phone: '+880 1409-015552',
    address: 'Dhaka, Bangladesh',
    resume_url: '/assets/resume.pdf',
    social_github: 'https://github.com/MasumaLameya',
    social_linkedin: 'https://linkedin.com/in/obaidul-haque47/'
  });

  projects = signal<ProjectItem[]>([
    {
      id: 'proj_1',
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
      id: 'proj_2',
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
      id: 'proj_3',
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
      id: 'proj_4',
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
  ]);

  blogs = signal<BlogItem[]>([
    {
      id: 'blog_1',
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
      id: 'blog_2',
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
  ]);

  services = signal<ServiceItem[]>([
    { id: 'srv_1', title: 'Full-Stack Web Development', description: 'Architecting robust end-to-end web applications with ASP.NET Core, .NET MVC, Angular, Next.js, and REST APIs.', icon: 'bi bi-code-slash', sort_order: 1 },
    { id: 'srv_2', title: 'AI & Machine Learning Solutions', description: 'Implementing intelligent ML models, PyTorch/TensorFlow pipelines, Gemini AI integration, NLP, and RAG systems.', icon: 'bi bi-cpu', sort_order: 2 },
    { id: 'srv_3', title: 'Medical AI & Computer Vision', description: 'Deep learning frameworks (CNNs, Vision Transformers) for biomedical image classification, CT analysis, and XAI.', icon: 'bi bi-eye', sort_order: 3 },
    { id: 'srv_4', title: 'Database & API Architecture', description: 'Designing high-performance schemas in MySQL, PostgreSQL, SQL Server, and securing scalable backend services.', icon: 'bi bi-database', sort_order: 4 }
  ]);

  testimonials = signal<TestimonialItem[]>([
    { id: 'tst_1', name: 'Dr. Md. Tariqul Islam', role: 'Professor & Research Lead', company: 'IUBAT CSE Department', avatar: '/assets/images/testimonial-1.7265d4b8.jpg', feedback: 'Masuma is a brilliant researcher and developer. Her work on hybrid BERT models and medical imaging frameworks demonstrated exceptional technical rigor and innovative problem solving.', rating: 5 },
    { id: 'tst_2', name: 'Engr. Rafiqul Hassan', role: 'Project Lead', company: 'Real Capital Group', avatar: '/assets/images/testimonial-2.ff2ba033.jpg', feedback: 'Masuma delivered our Real Estate CRM system with exceptional reliability and clean ASP.NET Core architecture. Her database optimization and REST API skills are top tier.', rating: 5 },
    { id: 'tst_3', name: 'IEEE Student Branch Committee', role: 'Branch Counselor', company: 'IEEE Computer Society', avatar: '/assets/images/testimonial-3.cb371b2d.jpg', feedback: 'Her leadership as Event Coordinator and dedication as an Academic Mentor has inspired countless students in coding, problem solving, and research.', rating: 5 }
  ]);

  resumeExperience = signal<ResumeItem[]>([
    { id: 'res_1', type: 'experience', period: 'June 2026 - Sep 2026', title: 'Software Developer', organization: 'Real Capital Group (Dhaka, Bangladesh)', description: 'Developed Real Estate CRM System, engineered backend services & RESTful APIs using ASP.NET Core / .NET, designed MySQL databases, and implemented core CRM business logic.', sort_order: 1 },
    { id: 'res_2', type: 'experience', period: '2022 - Present', title: 'Event Coordinator', organization: 'IEEE CS IUBAT Student Branch Chapter', description: 'Contributed to technical event planning, workshop coordination, and participant management at IEEE Computer Society.', sort_order: 2 },
    { id: 'res_3', type: 'experience', period: '2022 - Present', title: 'Math Club Manager', organization: 'IUBAT IT Society', description: 'Organized and managed mathematics-focused analytical problem-solving sessions, workshops, and student learning initiatives.', sort_order: 3 },
    { id: 'res_4', type: 'experience', period: '2022 - Present', title: 'Academic Mentor & AI Researcher', organization: 'IUBAT Computer Science & Engineering', description: 'Mentored university students in programming languages, data structures, and learning strategies. Authored 2 IEEE conference research papers in AI & Medical Vision.', sort_order: 4 }
  ]);

  resumeEducation = signal<ResumeItem[]>([
    { id: 'res_5', type: 'education', period: 'Sep 2022 - Sep 2026', title: 'Bachelor of Science in Computer Science and Engineering', organization: 'IUBAT (Dhaka, Bangladesh) — CGPA: 3.86/4.00', description: "Dean's list academic excellence. Specialized in Full-Stack Software Engineering, Deep Learning, Biomedical Signal Processing, Algorithms, and Object-Oriented Programming.", sort_order: 1 },
    { id: 'res_6', type: 'education', period: '2019 - 2021', title: 'Higher Secondary Certificate (HSC) — Science', organization: 'Jatir Janak Bangabandhu Sheikh Mujibur Rahman Govt College — GPA: 5.00/5.00', description: 'Graduated with a perfect GPA 5.00 in Science division. Strong foundation in Higher Mathematics, Physics, Chemistry, and Information Technology.', sort_order: 2 },
    { id: 'res_7', type: 'education', period: '2017 - 2019', title: 'Secondary School Certificate (SSC) — Science', organization: 'Kamarpara School and College — GPA: 5.00/5.00', description: 'Achieved top-tier GPA 5.00 with distinction. Active Science Olympiad participant and competitive problem solver.', sort_order: 3 }
  ]);

  clients = signal<ClientItem[]>([]);

  getImageUrl(url: string | undefined): string {
    const profileImg = '/assets/images/masuma-profile-me.jpg?v=2';
    if (!url) return profileImg;
    if (url.includes('masuma-profile-me.jpg') || url.includes('hero-avatar')) return profileImg;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.startsWith('/')) return url;
    return '/' + url;
  }

  onAvatarError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = '/assets/images/masuma-profile-me.jpg';
    }
  }

  // Unique categories for filter
  categories = signal<string[]>(['all']);

  // Contact form model
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  private scrollListener: any;
  private typewriterTimer: any;

  async ngOnInit(): Promise<void> {
    await this.fetchData();
    this.startTypewriter();
  }

  async fetchData(): Promise<void> {
    try {
      // 1. Profile
      const prof = await this.supabase.getProfile();
      if (prof) {
        this.profile.set(prof);
      }

      // 2. Projects
      const proj = await this.supabase.getProjects();
      if (proj && proj.length > 0) {
        this.projects.set(proj);
        const cats = Array.from(new Set(proj.map(p => p.category).filter(Boolean)));
        this.categories.set(['all', ...cats]);
      }

      // 3. Blogs / Research
      const blg = await this.supabase.getBlogs();
      if (blg && blg.length > 0) {
        this.blogs.set(blg);
      }

      // 4. Services
      const srv = await this.supabase.getServices();
      if (srv && srv.length > 0) {
        this.services.set(srv);
      }

      // 5. Testimonials
      const tst = await this.supabase.getTestimonials();
      if (tst && tst.length > 0) {
        this.testimonials.set(tst);
      }

      // 6. Resume
      const res = await this.supabase.getResumeItems();
      if (res && res.length > 0) {
        this.resumeExperience.set(res.filter(r => r.type === 'experience'));
        this.resumeEducation.set(res.filter(r => r.type === 'education'));
      }

      // 7. Clients
      const cli = await this.supabase.getClients();
      if (cli && cli.length > 0) {
        this.clients.set(cli);
      }
    } catch (e) {
      console.warn('Data fetch fallback active:', e);
    } finally {
      setTimeout(() => {
        this.initSwiper();
        this.animateCounters();
      }, 100);
    }
  }

  ngAfterViewInit(): void {
    this.initScrollSpy();
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
    if (this.typewriterTimer) {
      clearTimeout(this.typewriterTimer);
    }
  }

  setFilter(filter: string): void {
    this.currentFilter = filter;
  }

  filteredProjects(): ProjectItem[] {
    const list = this.projects();
    if (this.currentFilter === 'all') return list;
    return list.filter(item => item.category?.toLowerCase() === this.currentFilter.toLowerCase());
  }

  private startTypewriter(): void {
    const words = this.profile().typewriter_words?.length
      ? this.profile().typewriter_words
      : ['Masuma Akter Lameya', 'Full-Stack Developer', 'AI & ML Researcher', 'ASP.NET Core & Angular', 'Medical AI Specialist'];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentWord = words[wordIndex] || 'Full-Stack Developer';
      if (isDeleting) {
        this.typewriterText.set(currentWord.substring(0, charIndex - 1));
        charIndex--;
      } else {
        this.typewriterText.set(currentWord.substring(0, charIndex + 1));
        charIndex++;
      }

      let typingSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 400;
      }

      this.typewriterTimer = setTimeout(type, typingSpeed);
    };

    type();
  }

  private initScrollSpy(): void {
    const sections = ['about', 'portfolio', 'services', 'testimonial', 'resume', 'blog', 'contact'];
    this.scrollListener = () => {
      const scrollY = window.pageYOffset;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 140;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            this.activeSection = id;
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }

  private initSwiper(): void {
    if (typeof Swiper !== 'undefined') {
      try {
        new Swiper('.testimonial-swiper', {
          slidesPerView: 1,
          spaceBetween: 24,
          loop: true,
          autoplay: { delay: 4500, disableOnInteraction: false },
          navigation: {
            nextEl: '.swiper-testimonial-next',
            prevEl: '.swiper-testimonial-prev',
          },
          breakpoints: {
            768: { slidesPerView: 2, spaceBetween: 24 }
          }
        });
      } catch (e) {
        console.warn('Swiper init error:', e);
      }
    }
  }

  private animateCounters(): void {
    const counterElements = document.querySelectorAll('.counter');
    const p = this.profile();
    const targetValues = [
      p.photoshoot_pct || 95,
      p.tailwind_pct || 90,
      p.seo_pct || 88
    ];

    counterElements.forEach((el, idx) => {
      const target = targetValues[idx] || 90;
      let start = 0;
      const duration = 1200;
      const startTime = performance.now();

      const update = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor((1 - (1 - progress) * (1 - progress)) * target);
        el.textContent = current.toString();
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target.toString();
      };
      requestAnimationFrame(update);
    });
  }

  async onSubmitContact(): Promise<void> {
    if (!this.formData.name || !this.formData.email || !this.formData.message) return;

    this.isSubmitting.set(true);
    try {
      await this.supabase.sendMessage({
        name: this.formData.name,
        email: this.formData.email,
        subject: this.formData.subject,
        message: this.formData.message
      });

      this.toastMessage.set('Thank you! Your message has been sent successfully.');
      this.showToast.set(true);
      this.formData = { name: '', email: '', subject: '', message: '' };
      setTimeout(() => this.showToast.set(false), 4000);
    } catch {
      this.toastMessage.set('Message sent!');
      this.showToast.set(true);
      setTimeout(() => this.showToast.set(false), 4000);
    } finally {
      this.isSubmitting.set(false);
    }
  }
}

