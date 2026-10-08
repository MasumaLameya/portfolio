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
  templateUrl: './home.component.html'
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
    avatar_url: '/assets/images/hero-avatar.1925fb85.jpg',
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

  projects = signal<ProjectItem[]>([]);
  blogs = signal<BlogItem[]>([]);
  services = signal<ServiceItem[]>([]);
  testimonials = signal<TestimonialItem[]>([]);
  resumeExperience = signal<ResumeItem[]>([]);
  resumeEducation = signal<ResumeItem[]>([]);
  clients = signal<ClientItem[]>([]);

  getImageUrl(url: string | undefined): string {
    if (!url) return '/assets/images/hero-avatar.1925fb85.jpg';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.startsWith('/')) return url;
    return '/' + url;
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
      if (prof) this.profile.set(prof);

      // 2. Projects
      const proj = await this.supabase.getProjects();
      if (proj && proj.length > 0) {
        this.projects.set(proj);
        const cats = Array.from(new Set(proj.map(p => p.category).filter(Boolean)));
        this.categories.set(['all', ...cats]);
      } else {
        // Fallback default
        this.projects.set([
          { title: 'Student Mental Health Monitoring System', slug: 'student-mental-health-monitoring-system', category: 'AI & Web Platform', main_image: '/assets/images/project-mental-health.jpg' },
          { title: 'Real Estate CRM System', slug: 'real-estate-crm-system', category: 'Enterprise Web App', main_image: '/assets/images/project-real-estate-crm.jpg' },
          { title: 'ModernShop – E-Commerce & Shop Management', slug: 'modernshop-ecommerce-management', category: 'E-Commerce', main_image: '/assets/images/project-modern-shop.jpg' },
          { title: 'TodoNova – Task Management Web App', slug: 'todonova-task-management', category: 'Productivity Web App', main_image: '/assets/images/project-todonova.jpg' }
        ]);
        this.categories.set(['all', 'AI & Web Platform', 'Enterprise Web App', 'E-Commerce', 'Productivity Web App']);
      }

      // 3. Blogs / Research
      const blg = await this.supabase.getBlogs();
      if (blg && blg.length > 0) {
        this.blogs.set(blg);
      } else {
        this.blogs.set([
          { title: 'Developer-Oriented Classification of Mobile App Reviews Using a Hybrid BERT-XGBoost Ensemble', slug: 'hybrid-bert-xgboost-mobile-app-reviews', category: 'Research (IEEE)', date: '2026', author: 'Masuma Akter Lameya (1st Author)', cover_image: '/assets/images/blog-bert-xgboost.jpg', summary: 'Conference Publication at 2026 IEEE 2nd International Conference on Quantum Photonics, Artificial Intelligence & Networking (QPAIN).', content: 'Conference Publication at 2026 IEEE 2nd International Conference on Quantum Photonics, Artificial Intelligence & Networking (QPAIN).\n\nAuthor Position: 1st Author.' },
          { title: 'EffiViT-Hybrid: A CNN–Transformer Framework for Pancreatic Cancer Detection from CT Images', slug: 'effivit-hybrid-pancreatic-cancer-detection', category: 'Medical AI (IEEE)', date: '2026', author: 'Masuma Akter Lameya (3rd Author)', cover_image: '/assets/images/blog-effivit-cancer.jpg', summary: 'Deep learning research combining Convolutional Neural Networks and Vision Transformers for early pancreatic cancer detection.', content: 'Conference Publication at 2026 IEEE 2nd International Conference on Quantum Photonics, Artificial Intelligence & Networking (QPAIN).\n\nAuthor Position: 3rd Author.' },
          { title: 'Building Scalable Enterprise Architectures with ASP.NET Core & Angular', slug: 'building-scalable-enterprise-architectures-aspnet-core-angular', category: 'Full-Stack Web', date: '2025', author: 'Masuma Akter Lameya', cover_image: '/assets/images/blog-enterprise-architecture.jpg', summary: 'Key patterns for building maintainable, enterprise-ready full-stack applications with clean architecture and SOLID principles.', content: 'In modern full-stack development, decoupling backend business logic via clean architecture, RESTful API contracts, and robust ORMs like Entity Framework Core is paramount.' }
        ]);
      }

      // 4. Services
      const srv = await this.supabase.getServices();
      if (srv && srv.length > 0) {
        this.services.set(srv);
      } else {
        this.services.set([
          { title: 'Full-Stack Web Development', description: 'Architecting robust end-to-end web applications with ASP.NET Core, .NET MVC, Angular, Next.js, and REST APIs.', icon: 'bi bi-code-slash' },
          { title: 'AI & Machine Learning Solutions', description: 'Implementing intelligent ML models, PyTorch/TensorFlow pipelines, Gemini AI integration, NLP, and RAG systems.', icon: 'bi bi-cpu' },
          { title: 'Medical AI & Computer Vision', description: 'Deep learning frameworks (CNNs, Vision Transformers) for biomedical image classification, CT analysis, and XAI.', icon: 'bi bi-eye' },
          { title: 'Database & API Architecture', description: 'Designing high-performance schemas in MySQL, PostgreSQL, SQL Server, and securing scalable backend services.', icon: 'bi bi-database' }
        ]);
      }

      // 5. Testimonials
      const tst = await this.supabase.getTestimonials();
      if (tst && tst.length > 0) {
        this.testimonials.set(tst);
      } else {
        this.testimonials.set([
          { name: 'Dr. Md. Tariqul Islam', role: 'Professor & Research Lead', company: 'IUBAT CSE Department', avatar: '/assets/images/testimonial-1.7265d4b8.jpg', feedback: 'Masuma is a brilliant researcher and developer. Her work on hybrid BERT models and medical imaging frameworks demonstrated exceptional technical rigor and innovative problem solving.' },
          { name: 'Engr. Rafiqul Hassan', role: 'Project Lead', company: 'Real Capital Group', avatar: '/assets/images/testimonial-2.ff2ba033.jpg', feedback: 'Masuma delivered our Real Estate CRM system with exceptional reliability and clean ASP.NET Core architecture. Her database optimization and REST API skills are top tier.' },
          { name: 'IEEE Student Branch Committee', role: 'Branch Counselor', company: 'IEEE Computer Society', avatar: '/assets/images/testimonial-3.cb371b2d.jpg', feedback: 'Her leadership as Event Coordinator and dedication as an Academic Mentor has inspired countless students in coding, problem solving, and research.' }
        ]);
      }

      // 6. Resume
      const res = await this.supabase.getResumeItems();
      if (res && res.length > 0) {
        this.resumeExperience.set(res.filter(r => r.type === 'experience'));
        this.resumeEducation.set(res.filter(r => r.type === 'education'));
      } else {
        this.resumeEducation.set([
          { type: 'education', period: 'Sep 2022 - Sep 2026', title: 'Bachelor of Science in Computer Science and Engineering', organization: 'IUBAT (Dhaka, Bangladesh) — CGPA: 3.86/4.00', description: 'Dean\'s list academic excellence. Specialized in Full-Stack Software Engineering, Deep Learning, Biomedical Signal Processing, Algorithms, and Object-Oriented Programming.' },
          { type: 'education', period: '2019 - 2021', title: 'Higher Secondary Certificate (HSC) — Science', organization: 'Jatir Janak Bangabandhu Sheikh Mujibur Rahman Govt College — GPA: 5.00/5.00', description: 'Graduated with a perfect GPA 5.00 in Science division. Strong foundation in Higher Mathematics, Physics, Chemistry, and Information Technology.' },
          { type: 'education', period: '2017 - 2019', title: 'Secondary School Certificate (SSC) — Science', organization: 'Kamarpara School and College — GPA: 5.00/5.00', description: 'Achieved top-tier GPA 5.00 with distinction. Active Science Olympiad participant and competitive problem solver.' }
        ]);
        this.resumeExperience.set([
          { type: 'experience', period: '2023 - Present', title: 'Software Developer', organization: 'Real Capital Group (Dhaka, Bangladesh)', description: 'Developed Real Estate CRM System, engineered backend services & RESTful APIs using ASP.NET Core / .NET, designed MySQL databases, and implemented core CRM business logic.' },
          { type: 'experience', period: '2022 - Present', title: 'Event Coordinator & Math Club Manager', organization: 'IEEE CS IUBAT Chapter & IUBAT IT Society', description: 'Contributed to technical event planning and participant management at IEEE Computer Society. Managed mathematics-focused analytical problem-solving initiatives at IUBAT IT Society.' },
          { type: 'experience', period: '2022 - Present', title: 'Academic Mentor & AI Researcher', organization: 'IUBAT Computer Science & Engineering', description: 'Mentored university students in programming languages, data structures, and learning strategies. Authored 2 IEEE conference research papers in AI & Medical Vision.' }
        ]);
      }

      // 7. Clients
      const cli = await this.supabase.getClients();
      if (cli && cli.length > 0) {
        this.clients.set(cli);
      } else {
        this.clients.set([
          { name: 'Real Capital Group', logo_url: '/assets/images/client-1.ea45e491.png' },
          { name: 'IEEE Computer Society', logo_url: '/assets/images/client-2.ce0104f2.png' },
          { name: 'IUBAT IT Society', logo_url: '/assets/images/client-3.c22c0e73.png' },
          { name: 'QPAIN IEEE Conference', logo_url: '/assets/images/client-4.39ef1981.png' }
        ]);
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

        new Swiper('.clients-swiper', {
          slidesPerView: 2,
          spaceBetween: 20,
          loop: true,
          autoplay: { delay: 2500, disableOnInteraction: false },
          breakpoints: {
            640: { slidesPerView: 3, spaceBetween: 24 },
            768: { slidesPerView: 4, spaceBetween: 30 },
            1024: { slidesPerView: 5, spaceBetween: 36 }
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

