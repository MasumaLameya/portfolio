import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  SupabaseService,
  ProfileData,
  ProjectItem,
  BlogItem,
  ServiceItem,
  TestimonialItem,
  ResumeItem,
  ClientItem,
  ContactMessage
} from '../../../services/supabase.service';

type AdminTab =
  | 'overview'
  | 'profile'
  | 'projects'
  | 'blogs'
  | 'services'
  | 'testimonials'
  | 'resume'
  | 'clients'
  | 'messages'
  | 'security';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  activeTab = signal<AdminTab>('overview');
  isLoading = signal<boolean>(false);
  isSaving = signal<boolean>(false);
  isUploading = signal<boolean>(false);
  uploadProgressText = signal<string>('');
  toastMessage = signal<{ text: string; type: 'success' | 'error' } | null>(null);

  // Search & Filter State
  searchQuery = signal<string>('');
  selectedCategory = signal<string>('all');
  isSidebarOpen = signal<boolean>(false);

  // Profile Model
  profile: ProfileData = {
    name: 'MST. MASUMA AKTER LAMEYA',
    role: 'Full-Stack Developer & AI Engineer',
    avatar_url: '/assets/images/hero-avatar.1925fb85.jpg',
    bio: 'Full-Stack Developer with experience in web application development, machine learning, and AI-integrated solutions. Skilled in developing end-to-end applications, managing databases, and implementing intelligent features with ASP.NET Core, Angular, Python, and Deep Learning.',
    typewriter_words: ['Masuma Akter Lameya', 'Full-Stack Developer', 'AI & ML Researcher', 'ASP.NET Core & Angular', 'Medical AI Specialist'],
    photoshoot_pct: 95,
    tailwind_pct: 90,
    seo_pct: 88,
    skill_1_name: 'ASP.NET Core & Backend',
    skill_2_name: 'Angular & Next.js',
    skill_3_name: 'AI & Machine Learning',
    years_experience: 2,
    hours_working: '15',
    projects_done: 12,
    email: 'masumalamya7@gmail.com',
    phone: '+880 1409-015552',
    address: 'Dhaka, Bangladesh',
    resume_url: '/assets/resume.pdf',
    social_facebook: 'https://facebook.com',
    social_twitter: 'https://twitter.com',
    social_instagram: 'https://instagram.com',
    social_github: 'https://github.com/MasumaLameya',
    social_linkedin: 'https://linkedin.com/in/obaidul-haque47/'
  };
  typewriterWordsInput = 'Masuma Akter Lameya, Full-Stack Developer, AI & ML Researcher, ASP.NET Core & Angular, Medical AI Specialist';

  // Data Collections
  projects = signal<ProjectItem[]>([]);
  blogs = signal<BlogItem[]>([]);
  services = signal<ServiceItem[]>([]);
  testimonials = signal<TestimonialItem[]>([]);
  resumeItems = signal<ResumeItem[]>([]);
  clients = signal<ClientItem[]>([]);
  messages = signal<ContactMessage[]>([]);

  // Modals & Form State
  showModal = signal<boolean>(false);
  modalMode: 'add' | 'edit' = 'add';
  modalType: AdminTab = 'projects';

  // Active edit item models
  currentProject: ProjectItem = this.getEmptyProject();
  currentBlog: BlogItem = this.getEmptyBlog();
  currentService: ServiceItem = this.getEmptyService();
  currentTestimonial: TestimonialItem = this.getEmptyTestimonial();
  currentResume: ResumeItem = this.getEmptyResume();
  currentClient: ClientItem = this.getEmptyClient();
  selectedMessage: ContactMessage | null = null;

  // Blog Tags Helper
  blogTagsInput = '';

  // Security Form
  newPassword = '';
  confirmPassword = '';
  newEmail = '';

  // Available Bootstrap Icons for Services
  availableIcons = [
    'bi bi-code-slash',
    'bi bi-laptop',
    'bi bi-camera',
    'bi bi-search',
    'bi bi-palette',
    'bi bi-phone',
    'bi bi-graph-up-arrow',
    'bi bi-shield-check',
    'bi bi-lightning-charge',
    'bi bi-brush',
    'bi bi-globe',
    'bi bi-cpu',
    'bi bi-bezier2',
    'bi bi-braces-asterisk',
    'bi bi-display',
    'bi bi-cloud-arrow-up',
    'bi bi-layers',
    'bi bi-gem'
  ];

  constructor(
    public supabase: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadAllData();
  }

  toggleSidebar(): void {
    this.isSidebarOpen.update(v => !v);
  }

  showToast(text: string, type: 'success' | 'error' = 'success'): void {
    this.toastMessage.set({ text, type });
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 4000);
  }

  setTab(tab: AdminTab): void {
    this.activeTab.set(tab);
    this.searchQuery.set('');
    this.selectedCategory.set('all');
    this.isSidebarOpen.set(false);
  }

  get filteredProjects(): ProjectItem[] {
    const q = this.searchQuery().toLowerCase().trim();
    const cat = this.selectedCategory();
    return this.projects().filter(p => {
      const matchQ = !q || p.title.toLowerCase().includes(q) || (p.category && p.category.toLowerCase().includes(q));
      const matchCat = cat === 'all' || p.category === cat;
      return matchQ && matchCat;
    });
  }

  get projectCategories(): string[] {
    const set = new Set(this.projects().map(p => p.category).filter(Boolean));
    return ['all', ...Array.from(set)];
  }

  get filteredBlogs(): BlogItem[] {
    const q = this.searchQuery().toLowerCase().trim();
    return this.blogs().filter(b => {
      return !q || b.title.toLowerCase().includes(q) || b.category.toLowerCase().includes(q) || (b.tags && b.tags.some(t => t.toLowerCase().includes(q)));
    });
  }

  get filteredMessages(): ContactMessage[] {
    const q = this.searchQuery().toLowerCase().trim();
    return this.messages().filter(m => {
      return !q || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || (m.subject && m.subject.toLowerCase().includes(q)) || m.message.toLowerCase().includes(q);
    });
  }

  async loadAllData(): Promise<void> {
    this.isLoading.set(true);
    try {
      // 1. Profile
      const p = await this.supabase.getProfile();
      if (p) {
        this.profile = { ...p };
        this.typewriterWordsInput = (p.typewriter_words || []).join(', ');
      }

      // 2. Collections
      const [proj, blg, srv, tst, res, cli, msg] = await Promise.all([
        this.supabase.getProjects(),
        this.supabase.getBlogs(),
        this.supabase.getServices(),
        this.supabase.getTestimonials(),
        this.supabase.getResumeItems(),
        this.supabase.getClients(),
        this.supabase.getMessages()
      ]);

      this.projects.set(proj);
      this.blogs.set(blg);
      this.services.set(srv);
      this.testimonials.set(tst);
      this.resumeItems.set(res);
      this.clients.set(cli);
      this.messages.set(msg);
    } catch (e) {
      console.error('Data load error:', e);
      this.showToast('Could not load all data from Supabase. Ensure tables exist.', 'error');
    } finally {
      this.isLoading.set(false);
    }
  }

  // ================= PROFILE SAVE =================
  async saveProfile(): Promise<void> {
    this.isSaving.set(true);
    try {
      this.profile.typewriter_words = this.typewriterWordsInput
        .split(',')
        .map(w => w.trim())
        .filter(w => w.length > 0);

      const { error } = await this.supabase.updateProfile(this.profile);
      if (error) {
        this.showToast(error.message, 'error');
      } else {
        this.showToast('Profile updated successfully!');
      }
    } catch (e: any) {
      this.showToast(e.message || 'Error updating profile', 'error');
    } finally {
      this.isSaving.set(false);
    }
  }

  // ================= IMAGE UPLOAD & DROP HANDLERS =================
  async processFile(file: File, targetField: 'avatar' | 'project' | 'blog' | 'testimonial' | 'client'): Promise<void> {
    if (!file.type.startsWith('image/')) {
      this.showToast('Please select a valid image file (PNG, JPG, WEBP, GIF, SVG)', 'error');
      return;
    }

    this.isUploading.set(true);
    this.uploadProgressText.set(`Uploading ${file.name}...`);

    try {
      const publicUrl = await this.supabase.uploadImage(file, targetField);
      if (publicUrl) {
        if (targetField === 'avatar') {
          this.profile.avatar_url = publicUrl;
          await this.supabase.updateProfile({ avatar_url: publicUrl });
        } else if (targetField === 'project') {
          this.currentProject.main_image = publicUrl;
        } else if (targetField === 'blog') {
          this.currentBlog.cover_image = publicUrl;
        } else if (targetField === 'testimonial') {
          this.currentTestimonial.avatar = publicUrl;
        } else if (targetField === 'client') {
          this.currentClient.logo_url = publicUrl;
        }
        this.showToast('Image uploaded & applied successfully!');
      } else {
        this.showToast('Upload failed. Please check network connection.', 'error');
      }
    } catch (e: any) {
      this.showToast(e.message || 'Upload error', 'error');
    } finally {
      this.isUploading.set(false);
      this.uploadProgressText.set('');
    }
  }

  async onFileUpload(event: Event, targetField: 'avatar' | 'project' | 'blog' | 'testimonial' | 'client'): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    await this.processFile(input.files[0], targetField);
  }

  async onFileDrop(event: DragEvent, targetField: 'avatar' | 'project' | 'blog' | 'testimonial' | 'client'): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      await this.processFile(event.dataTransfer.files[0], targetField);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  removeImage(targetField: 'avatar' | 'project' | 'blog' | 'testimonial' | 'client'): void {
    if (targetField === 'avatar') this.profile.avatar_url = '/assets/images/hero-avatar.1925fb85.jpg';
    if (targetField === 'project') this.currentProject.main_image = '/assets/images/portfolio-1.9aa83f65.jpg';
    if (targetField === 'blog') this.currentBlog.cover_image = '/assets/images/blog-post-1.a6d3ea41.jpg';
    if (targetField === 'testimonial') this.currentTestimonial.avatar = '/assets/images/testimonial-1.7265d4b8.jpg';
    if (targetField === 'client') this.currentClient.logo_url = '/assets/images/client-1.e45f9e2b.png';
    this.showToast('Image reset to default placeholder.');
  }

  // ================= MODAL OPENERS =================
  openAddModal(type: AdminTab): void {
    this.modalType = type;
    this.modalMode = 'add';

    if (type === 'projects') this.currentProject = this.getEmptyProject();
    if (type === 'blogs') {
      this.currentBlog = this.getEmptyBlog();
      this.blogTagsInput = '';
    }
    if (type === 'services') this.currentService = this.getEmptyService();
    if (type === 'testimonials') this.currentTestimonial = this.getEmptyTestimonial();
    if (type === 'resume') this.currentResume = this.getEmptyResume();
    if (type === 'clients') this.currentClient = this.getEmptyClient();

    this.showModal.set(true);
  }

  openEditModal(type: AdminTab, item: any): void {
    this.modalType = type;
    this.modalMode = 'edit';

    if (type === 'projects') this.currentProject = { ...item };
    if (type === 'blogs') {
      this.currentBlog = { ...item };
      this.blogTagsInput = (item.tags || []).join(', ');
    }
    if (type === 'services') this.currentService = { ...item };
    if (type === 'testimonials') this.currentTestimonial = { ...item };
    if (type === 'resume') this.currentResume = { ...item };
    if (type === 'clients') this.currentClient = { ...item };

    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
  }

  // Auto slug generator
  generateSlug(title: string, target: 'project' | 'blog'): void {
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    if (target === 'project') this.currentProject.slug = slug;
    if (target === 'blog') this.currentBlog.slug = slug;
  }

  // ================= SAVE CRUD ITEM =================
  async saveModalItem(): Promise<void> {
    this.isSaving.set(true);
    try {
      if (this.modalType === 'projects') {
        if (!this.currentProject.title || !this.currentProject.slug) {
          this.showToast('Please provide a title and slug', 'error');
          this.isSaving.set(false);
          return;
        }
        if (this.modalMode === 'add') {
          await this.supabase.createProject(this.currentProject);
          this.showToast('Project created successfully!');
        } else {
          await this.supabase.updateProject(this.currentProject.id!, this.currentProject);
          this.showToast('Project updated successfully!');
        }
        this.projects.set(await this.supabase.getProjects());
      }

      if (this.modalType === 'blogs') {
        if (!this.currentBlog.title || !this.currentBlog.slug) {
          this.showToast('Please provide a title and slug', 'error');
          this.isSaving.set(false);
          return;
        }
        this.currentBlog.tags = this.blogTagsInput.split(',').map(t => t.trim()).filter(t => t);
        if (this.modalMode === 'add') {
          await this.supabase.createBlog(this.currentBlog);
          this.showToast('Blog post published!');
        } else {
          await this.supabase.updateBlog(this.currentBlog.id!, this.currentBlog);
          this.showToast('Blog post updated!');
        }
        this.blogs.set(await this.supabase.getBlogs());
      }

      if (this.modalType === 'services') {
        if (this.modalMode === 'add') {
          await this.supabase.createService(this.currentService);
          this.showToast('Service added!');
        } else {
          await this.supabase.updateService(this.currentService.id!, this.currentService);
          this.showToast('Service updated!');
        }
        this.services.set(await this.supabase.getServices());
      }

      if (this.modalType === 'testimonials') {
        if (this.modalMode === 'add') {
          await this.supabase.createTestimonial(this.currentTestimonial);
          this.showToast('Testimonial added!');
        } else {
          await this.supabase.updateTestimonial(this.currentTestimonial.id!, this.currentTestimonial);
          this.showToast('Testimonial updated!');
        }
        this.testimonials.set(await this.supabase.getTestimonials());
      }

      if (this.modalType === 'resume') {
        if (this.modalMode === 'add') {
          await this.supabase.createResumeItem(this.currentResume);
          this.showToast('Resume entry added!');
        } else {
          await this.supabase.updateResumeItem(this.currentResume.id!, this.currentResume);
          this.showToast('Resume entry updated!');
        }
        this.resumeItems.set(await this.supabase.getResumeItems());
      }

      if (this.modalType === 'clients') {
        if (this.modalMode === 'add') {
          await this.supabase.createClient(this.currentClient);
          this.showToast('Client added!');
        } else {
          await this.supabase.updateClient(this.currentClient.id!, this.currentClient);
          this.showToast('Client updated!');
        }
        this.clients.set(await this.supabase.getClients());
      }

      this.closeModal();
    } catch (e: any) {
      this.showToast(e.message || 'Error saving item', 'error');
    } finally {
      this.isSaving.set(false);
    }
  }

  // ================= DELETE CRUD ITEM =================
  async deleteItem(type: AdminTab, id: string): Promise<void> {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      if (type === 'projects') {
        await this.supabase.deleteProject(id);
        this.projects.set(this.projects().filter(p => p.id !== id));
      }
      if (type === 'blogs') {
        await this.supabase.deleteBlog(id);
        this.blogs.set(this.blogs().filter(b => b.id !== id));
      }
      if (type === 'services') {
        await this.supabase.deleteService(id);
        this.services.set(this.services().filter(s => s.id !== id));
      }
      if (type === 'testimonials') {
        await this.supabase.deleteTestimonial(id);
        this.testimonials.set(this.testimonials().filter(t => t.id !== id));
      }
      if (type === 'resume') {
        await this.supabase.deleteResumeItem(id);
        this.resumeItems.set(this.resumeItems().filter(r => r.id !== id));
      }
      if (type === 'clients') {
        await this.supabase.deleteClient(id);
        this.clients.set(this.clients().filter(c => c.id !== id));
      }
      if (type === 'messages') {
        await this.supabase.deleteMessage(id);
        this.messages.set(this.messages().filter(m => m.id !== id));
        if (this.selectedMessage?.id === id) this.selectedMessage = null;
      }
      this.showToast('Item deleted successfully.');
    } catch (e: any) {
      this.showToast(e.message || 'Delete failed', 'error');
    }
  }

  // ================= MESSAGES ACTIONS =================
  async viewMessage(msg: ContactMessage): Promise<void> {
    this.selectedMessage = msg;
    if (!msg.is_read && msg.id) {
      await this.supabase.markMessageRead(msg.id, true);
      msg.is_read = true;
    }
  }

  // ================= SECURITY (PASSWORD / EMAIL) =================
  async changePassword(): Promise<void> {
    if (!this.newPassword || this.newPassword !== this.confirmPassword) {
      this.showToast('Passwords do not match or are empty', 'error');
      return;
    }
    this.isSaving.set(true);
    try {
      const { error } = await this.supabase.updatePassword(this.newPassword);
      if (error) {
        this.showToast(error.message, 'error');
      } else {
        this.showToast('Admin password changed successfully!');
        this.newPassword = '';
        this.confirmPassword = '';
      }
    } catch (e: any) {
      this.showToast(e.message || 'Password update failed', 'error');
    } finally {
      this.isSaving.set(false);
    }
  }

  async changeEmail(): Promise<void> {
    if (!this.newEmail) {
      this.showToast('Please enter a valid email', 'error');
      return;
    }
    this.isSaving.set(true);
    try {
      const { error } = await this.supabase.updateEmail(this.newEmail);
      if (error) {
        this.showToast(error.message, 'error');
      } else {
        this.showToast('Confirmation email sent to update email address!');
        this.newEmail = '';
      }
    } catch (e: any) {
      this.showToast(e.message || 'Email update failed', 'error');
    } finally {
      this.isSaving.set(false);
    }
  }

  async logout(): Promise<void> {
    await this.supabase.signOut();
    this.router.navigate(['/admin/login']);
  }

  // Helpers
  private getEmptyProject(): ProjectItem {
    return {
      title: '',
      slug: '',
      category: 'Web Application',
      client: '',
      start_date: '',
      designer: 'Masuma Akter Lameya',
      tools: 'ASP.NET Core, Angular, MySQL',
      project_url: '',
      main_image: '',
      short_description: '',
      full_description: ''
    };
  }

  private getEmptyBlog(): BlogItem {
    return {
      title: '',
      slug: '',
      category: 'Research',
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      author: 'Masuma Akter Lameya',
      cover_image: '',
      summary: '',
      content: '',
      tags: []
    };
  }

  private getEmptyService(): ServiceItem {
    return {
      title: '',
      description: '',
      icon: 'bi bi-code-slash',
      sort_order: 1
    };
  }

  private getEmptyTestimonial(): TestimonialItem {
    return {
      name: '',
      role: '',
      company: '',
      avatar: '',
      feedback: '',
      rating: 5
    };
  }

  private getEmptyResume(): ResumeItem {
    return {
      type: 'experience',
      period: '2024 - Present',
      title: '',
      organization: '',
      description: '',
      sort_order: 1
    };
  }

  private getEmptyClient(): ClientItem {
    return {
      name: '',
      logo_url: '',
      website_url: ''
    };
  }
}
