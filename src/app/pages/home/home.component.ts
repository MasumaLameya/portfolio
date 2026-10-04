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
  typewriterText = signal('UI & UX Designer');
  isSubmitting = signal(false);
  showToast = signal(false);
  toastMessage = signal('');

  // Dynamic Data Signals
  profile = signal<ProfileData>({
    name: 'Christina Gray',
    role: 'UI & UX Designer. Photographer',
    avatar_url: '/assets/images/hero-avatar.1925fb85.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    typewriter_words: ['Christina Gray', 'UI/UX Designer', 'Photographer'],
    photoshoot_pct: 95,
    tailwind_pct: 90,
    seo_pct: 80,
    years_experience: 14,
    hours_working: '50',
    projects_done: 90,
    email: 'flatheme@gmail.com',
    phone: '+976 12 34 9999',
    address: '121 King St, Melbourne VIC 3000'
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
          { title: 'Glasses of Cocktail', slug: 'glasses-of-cocktail', category: 'Branding', main_image: '/assets/images/portfolio-1.9aa83f65.jpg' },
          { title: 'A Cute Dog', slug: 'a-cute-dog', category: 'Mockup', main_image: '/assets/images/portfolio-2.dc4d8dd8.jpg' },
          { title: 'Single Product Mockup', slug: 'single-product-mockup', category: 'Branding', main_image: '/assets/images/portfolio-3.772523de.jpg' },
          { title: 'Attractive Poster', slug: 'attractive-poster', category: 'Mockup', main_image: '/assets/images/portfolio-4.884e57ca.jpg' }
        ]);
        this.categories.set(['all', 'Branding', 'Mockup']);
      }

      // 3. Blogs
      const blg = await this.supabase.getBlogs();
      if (blg && blg.length > 0) {
        this.blogs.set(blg);
      } else {
        this.blogs.set([
          { title: '4 Years of Working From Home', slug: '4-years-of-working-from-home', category: 'Design', date: '24 Oct 2024', author: 'Christina Gray', cover_image: '/assets/images/blog-post-1.a6d3ea41.jpg', summary: 'A comprehensive retrospective on productivity, ergonomics, and creative output.', content: 'Working remotely for four years transforms how you view productivity. In this article, we dive into routine design, deep work habits, boundary setting with clients, and building an ergonomic home studio that fosters daily inspiration.' },
          { title: 'Mastering Color Schemes in Modern UI', slug: 'mastering-color-schemes-in-modern-ui', category: 'Trends', date: '18 Oct 2024', author: 'Christina Gray', cover_image: '/assets/images/blog-post-2.99e40feb.jpg', summary: 'How subtle tinting and accessible contrast ratios create premium dark and light interfaces.', content: 'Colors evoke emotional reactions and define software identity. Discover modern HSL color harmony, dark mode lightness balance, and Tailwind color tokenization.' },
          { title: 'The Future of Component Design Systems', slug: 'future-of-component-design-systems', category: 'Tech', date: '05 Oct 2024', author: 'Christina Gray', cover_image: '/assets/images/blog-post-3.1e8acfca.jpg', summary: 'How micro-frontends and atomic tokenization are reshaping enterprise digital products.', content: 'Component libraries are no longer static button catalogs. Modern design systems are living ecosystems built on unified tokens across web and mobile platforms.' }
        ]);
      }

      // 4. Services
      const srv = await this.supabase.getServices();
      if (srv && srv.length > 0) {
        this.services.set(srv);
      } else {
        this.services.set([
          { title: 'Web Development', description: 'Building lightning-fast, pixel-perfect, responsive web applications using modern technologies.', icon: 'bi bi-code-slash' },
          { title: 'UI/UX Design', description: 'Crafting intuitive user experiences, wireframes, and design systems with high aesthetic value.', icon: 'bi bi-laptop' },
          { title: 'Photography', description: 'Professional portrait, product, and architectural photoshoot with high-end color grading.', icon: 'bi bi-camera' },
          { title: 'SEO & Performance', description: 'Optimizing website speeds, Core Web Vitals, and search engine visibility for higher reach.', icon: 'bi bi-search' }
        ]);
      }

      // 5. Testimonials
      const tst = await this.supabase.getTestimonials();
      if (tst && tst.length > 0) {
        this.testimonials.set(tst);
      } else {
        this.testimonials.set([
          { name: 'Sandra Radford', role: 'CTO', company: 'FlaTheme', avatar: '/assets/images/testimonial-1.7265d4b8.jpg', feedback: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean massa. Cum sociis natoque penatibus et magnis.' },
          { name: 'Sandra Radford', role: 'Project Manager', company: 'FlaTheme', avatar: '/assets/images/testimonial-2.ff2ba033.jpg', feedback: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean massa. Cum sociis natoque penatibus et magnis.' },
          { name: 'Sandra Radford', role: 'Developer', company: 'FlaTheme', avatar: '/assets/images/testimonial-3.cb371b2d.jpg', feedback: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean massa. Cum sociis natoque penatibus et magnis.' }
        ]);
      }

      // 6. Resume
      const res = await this.supabase.getResumeItems();
      if (res && res.length > 0) {
        this.resumeExperience.set(res.filter(r => r.type === 'experience'));
        this.resumeEducation.set(res.filter(r => r.type === 'education'));
      } else {
        this.resumeEducation.set([
          { type: 'education', period: '2020 - 2023', title: 'Bachelor Degree of Business', organization: 'University of Business', description: 'Specializing in marketing, product operations and strategy.' },
          { type: 'education', period: '2018 - 2020', title: 'Master Degree of Design', organization: 'University of IT', description: 'Advanced studies in UX architecture and interactive interface systems.' },
          { type: 'education', period: '2014 - 2018', title: 'Bachelor Degree of Design', organization: 'University of Design', description: 'Foundations of typography, color theory, and digital graphics.' }
        ]);
        this.resumeExperience.set([
          { type: 'experience', period: '2020 - PRESENT', title: 'Director of Operations', organization: 'FlaTheme', description: 'Overseeing creative and technical execution across global client teams.' },
          { type: 'experience', period: '2018 - 2020', title: 'Senior Designer', organization: 'FlaTheme', description: 'Leading UI/UX systems and responsive front-end components.' },
          { type: 'experience', period: '2014 - 2018', title: 'UI & UX Designer', organization: 'FlaTheme', description: 'Designing prototypes, design systems, and client interfaces.' }
        ]);
      }

      // 7. Clients
      const cli = await this.supabase.getClients();
      if (cli && cli.length > 0) {
        this.clients.set(cli);
      } else {
        this.clients.set([
          { name: 'Client 1', logo_url: '/assets/images/client-1.ea45e491.png' },
          { name: 'Client 2', logo_url: '/assets/images/client-2.ce0104f2.png' },
          { name: 'Client 3', logo_url: '/assets/images/client-3.c22c0e73.png' },
          { name: 'Client 4', logo_url: '/assets/images/client-4.39ef1981.png' },
          { name: 'Client 5', logo_url: '/assets/images/client-5.d0fa8b8c.png' },
          { name: 'Client 6', logo_url: '/assets/images/client-6.9213d4c2.png' }
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
      : ['UI & UX Designer', 'Photographer', 'Web Developer', 'Freelancer'];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentWord = words[wordIndex] || 'UI & UX Designer';
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
      p.seo_pct || 80,
      p.years_experience || 14,
      parseInt(p.hours_working || '50') || 50,
      p.projects_done || 90
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

