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
          <div class="section bg-white dark:bg-boxDark rounded-lg px-6 py-8 md:px-8 md:py-10 lg:p-12 shadow-sectionBoxShadow hover:shadow-sectionBoxShadowHover transition ease-out duration-[160ms]">
            <!-- Meta Info -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h6 class="font-mono font-medium uppercase text-sm tracking-[0.5px] dark:text-white">Posted by:</h6>
                <p class="text-pColor dark:text-white/70">{{ post.author }}</p>
              </div>
              <div>
                <h6 class="font-mono font-medium uppercase text-sm tracking-[0.5px] dark:text-white">Category:</h6>
                <p class="text-pColor dark:text-white/70">{{ post.category }}</p>
              </div>
              <div>
                <h6 class="font-mono font-medium uppercase text-sm tracking-[0.5px] dark:text-white">Posted on:</h6>
                <p class="text-pColor dark:text-white/70">{{ post.date }}</p>
              </div>
            </div>

            <!-- Title & Intro -->
            <div class="mt-6 lg:mt-8">
              <h2 class="text-3xl lg:text-4xl font-poppins font-semibold dark:text-white mb-3">{{ post.title }}</h2>
              <p class="leading-7 text-pColor dark:text-white/70">{{ post.summary }}</p>
              <ul class="space-y-3 mt-2">
                @for (tag of post.tags; track tag) {
                  <li class="list-none inline-block px-4 py-2 border border-black/20 border-dashed rounded-full me-2 text-pColor hover:text-black transition ease-linear duration-100 dark:text-white/70 dark:border-white/20 dark:hover:text-white">{{ tag }}</li>
                }
              </ul>
            </div>

            <!-- Hero Main Image -->
            <div class="overflow-hidden rounded-lg mt-6 lg:mt-12">
              <img [src]="post.cover_image" [alt]="post.title" class="w-full h-auto object-cover rounded-lg" />
            </div>

            <!-- Content -->
            <div class="mt-8 text-pColor dark:text-white/80 leading-relaxed space-y-4 whitespace-pre-wrap">
              {{ post.content }}
            </div>

            <!-- Back Button -->
            <div class="mt-10 pt-6 border-t border-dashed border-black/10 dark:border-white/10 flex justify-between items-center">
              <a routerLink="/" fragment="blog" class="inline-flex items-center space-x-2 font-mono text-sm px-6 py-3 border border-black border-dashed rounded-full hover:bg-black hover:text-white dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black transition">
                <i class="bi bi-arrow-left"></i> <span>Back to All Posts</span>
              </a>
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

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async params => {
      const slug = params.get('slug') || '';
      const supabasePost = await this.supabase.getBlogBySlug(slug);
      if (supabasePost) {
        this.post = supabasePost;
      } else {
        const fb = this.fallbackBlogService.getPostBySlug(slug);
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
            tags: fb.tags
          };
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

