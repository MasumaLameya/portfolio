import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SupabaseService, BlogItem } from '../../services/supabase.service';
import { BlogService } from '../../services/blog.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, SidebarComponent],
  template: `
    <div class="space-y-6 lg:flex lg:space-x-8 lg:space-y-0 xl:space-x-12 items-start">
      <!-- Sidebar -->
      <app-sidebar [activeSection]="'blog'" class="w-full lg:w-1/4 lg:shrink-0"></app-sidebar>

      <!-- Blog Single Article Content -->
      <div class="w-full lg:w-3/4 space-y-6 pb-12">
        @if (post) {
          <div class="section bg-white dark:bg-boxDark rounded-lg px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10 lg:p-12 shadow-sectionBoxShadow hover:shadow-sectionBoxShadowHover transition ease-out duration-[160ms]">
            <!-- Meta Info -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <h6 class="font-mono font-medium uppercase text-xs sm:text-sm tracking-[0.5px] dark:text-white">Posted by:</h6>
                <p class="text-xs sm:text-sm text-pColor dark:text-white/70">{{ post.author }}</p>
              </div>
              <div>
                <h6 class="font-mono font-medium uppercase text-xs sm:text-sm tracking-[0.5px] dark:text-white">Category:</h6>
                <p class="text-xs sm:text-sm text-pColor dark:text-white/70">{{ post.category }}</p>
              </div>
              <div>
                <h6 class="font-mono font-medium uppercase text-xs sm:text-sm tracking-[0.5px] dark:text-white">Posted on:</h6>
                <p class="text-xs sm:text-sm text-pColor dark:text-white/70">{{ post.date }}</p>
              </div>
            </div>

            <!-- Title & Intro -->
            <div class="mt-6 lg:mt-8">
              <h2 class="text-2xl sm:text-3xl lg:text-4xl font-poppins font-semibold dark:text-white mb-2 sm:mb-3 break-words">{{ post.title }}</h2>
              <p class="text-sm sm:text-base leading-relaxed text-pColor dark:text-white/70">{{ post.summary }}</p>

              @if (post.paper_url) {
                <div class="mt-4">
                  <a [href]="post.paper_url" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-black text-white dark:bg-white dark:text-black rounded-full font-mono text-xs sm:text-sm font-semibold hover:opacity-90 transition shadow-md">
                    <i class="bi bi-box-arrow-up-right"></i> Read Full Paper (IEEE DOI)
                  </a>
                </div>
              }

              <ul class="flex flex-wrap gap-2 mt-4">
                @for (tag of post.tags; track tag) {
                  <li class="list-none px-3.5 py-1.5 sm:px-4 sm:py-2 border border-black/20 border-dashed rounded-full text-xs sm:text-sm text-pColor hover:text-black transition ease-linear duration-100 dark:text-white/70 dark:border-white/20 dark:hover:text-white">{{ tag }}</li>
                }
              </ul>
            </div>

            <!-- Hero Main Image -->
            <div class="overflow-hidden rounded-lg mt-6 lg:mt-10">
              <img [src]="post.cover_image" [alt]="post.title" class="w-full h-auto object-cover rounded-lg" />
            </div>

            <!-- Content -->
            <div class="mt-6 sm:mt-8 text-sm sm:text-base text-pColor dark:text-white/80 leading-relaxed space-y-4 whitespace-pre-wrap">
              {{ post.content }}
            </div>

            <!-- Back Button & Direct Link -->
            <div class="mt-8 sm:mt-10 pt-6 border-t border-dashed border-black/10 dark:border-white/10 flex flex-wrap gap-4 justify-between items-center">
              <a routerLink="/" fragment="blog" class="inline-flex items-center space-x-2 font-mono text-xs sm:text-sm px-5 py-2.5 sm:px-6 sm:py-3 border border-black border-dashed rounded-full hover:bg-black hover:text-white dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black transition">
                <i class="bi bi-arrow-left"></i> <span>Back to Research Publications</span>
              </a>
              @if (post.paper_url) {
                <a [href]="post.paper_url" target="_blank" rel="noopener noreferrer" class="inline-flex items-center space-x-2 font-mono text-xs sm:text-sm px-5 py-2.5 sm:px-6 sm:py-3 bg-black text-white dark:bg-white dark:text-black rounded-full hover:opacity-90 transition">
                  <span>Open IEEE Paper</span> <i class="bi bi-box-arrow-up-right"></i>
                </a>
              }
            </div>
          </div>
        } @else {
          <div class="section bg-white dark:bg-boxDark rounded-lg p-12 text-center">
            <h2 class="text-2xl font-poppins font-semibold mb-4 dark:text-white">Blog Post Not Found</h2>
            <a routerLink="/" class="font-mono underline text-sm dark:text-white">Return to Home</a>
          </div>
        }
      </div>
    </div>
  `
})
export class BlogDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private supabase = inject(SupabaseService);
  private fallbackBlogService = inject(BlogService);
  post: BlogItem | undefined;
  private currentSlug = '';
  private syncChannel?: BroadcastChannel;

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async params => {
      this.currentSlug = params.get('slug') || '';
      await this.loadPost();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    if (typeof window !== 'undefined') {
      window.addEventListener('portfolio_data_updated', () => this.loadPost());
      window.addEventListener('focus', () => this.loadPost());
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') this.loadPost();
      });
      try {
        this.syncChannel = new BroadcastChannel('portfolio_sync');
        this.syncChannel.onmessage = () => this.loadPost();
      } catch {}
    }
  }

  private async loadPost(): Promise<void> {
    if (!this.currentSlug) return;
    const supabasePost = await this.supabase.getBlogBySlug(this.currentSlug);
    if (supabasePost) {
      let paperUrl = supabasePost.paper_url;
      const lower = ((supabasePost.title || '') + ' ' + this.currentSlug).toLowerCase();
      if (!paperUrl || paperUrl.includes('searchresult')) {
        if (lower.includes('bert') || lower.includes('review') || lower.includes('xgboost')) {
          paperUrl = 'https://doi.org/10.1109/QPAIN69676.2026.11546035';
        } else if (lower.includes('effivit') || lower.includes('cancer') || lower.includes('pancreatic')) {
          paperUrl = 'https://doi.org/10.1109/QPAIN69676.2026.11546439';
        }
      }
      this.post = { ...supabasePost, paper_url: paperUrl };
    } else {
      const fb = this.fallbackBlogService.getPostBySlug(this.currentSlug);
      if (fb) {
        this.post = {
          title: fb.title,
          slug: fb.slug,
          category: fb.category,
          date: fb.postedOn,
          author: fb.postedBy,
          cover_image: fb.singleImage,
          summary: fb.description,
          content: fb.description,
          tags: fb.tags,
          paper_url: fb.paper_url
        };
      }
    }
  }
}

