import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SupabaseService, ProjectItem } from '../../services/supabase.service';
import { PortfolioService } from '../../services/portfolio.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-portfolio-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, SidebarComponent],
  template: `
    <div class="space-y-6 lg:flex lg:space-x-8 lg:space-y-0 xl:space-x-12 items-start">
      <!-- Sidebar -->
      <app-sidebar [activeSection]="'portfolio'" class="w-full lg:w-1/4 lg:shrink-0"></app-sidebar>

      <!-- Portfolio Single Article Content -->
      <div class="w-full lg:w-3/4 space-y-6 pb-12">
        @if (project) {
          <div class="section bg-white dark:bg-boxDark rounded-lg px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10 lg:p-12 shadow-sectionBoxShadow hover:shadow-sectionBoxShadowHover transition ease-out duration-[160ms]">
            <!-- Meta Info -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <h6 class="font-mono font-medium uppercase text-xs sm:text-sm tracking-[0.5px] dark:text-white">Client:</h6>
                <p class="text-xs sm:text-sm text-pColor dark:text-white/70">{{ project.client || 'Creative Studio' }}</p>
              </div>
              <div>
                <h6 class="font-mono font-medium uppercase text-xs sm:text-sm tracking-[0.5px] dark:text-white">Category:</h6>
                <p class="text-xs sm:text-sm text-pColor dark:text-white/70">{{ project.category }}</p>
              </div>
              <div>
                <h6 class="font-mono font-medium uppercase text-xs sm:text-sm tracking-[0.5px] dark:text-white">Project link:</h6>
                <p class="text-xs sm:text-sm text-pColor dark:text-white/70">
                  <a [href]="project.project_url || '#'" target="_blank" class="hover:underline break-all">
                    {{ project.project_url || 'www.example.com' }}
                  </a>
                </p>
              </div>
            </div>

            <!-- Title & Intro -->
            <div class="mt-6 lg:mt-8">
              <h2 class="text-2xl sm:text-3xl lg:text-4xl font-poppins font-semibold dark:text-white mb-2 sm:mb-3 break-words">{{ project.title }}</h2>
              <p class="text-sm sm:text-base leading-relaxed text-pColor dark:text-white/70">{{ project.short_description }}</p>
            </div>

            <!-- Hero Main Image -->
            <div class="overflow-hidden rounded-lg mt-6 lg:mt-10">
              <img [src]="project.main_image" [alt]="project.title" class="w-full h-auto object-cover rounded-lg" />
            </div>

            <!-- Full Description Case Study -->
            @if (project.full_description) {
              <div class="mt-6 sm:mt-8 text-sm sm:text-base text-pColor dark:text-white/80 leading-relaxed whitespace-pre-wrap">
                {{ project.full_description }}
              </div>
            }

            <!-- Back Button -->
            <div class="mt-8 sm:mt-10 pt-6 border-t border-dashed border-black/10 dark:border-white/10 flex flex-wrap gap-4 justify-between items-center">
              <a routerLink="/" fragment="portfolio" class="inline-flex items-center space-x-2 font-mono text-xs sm:text-sm px-5 py-2.5 sm:px-6 sm:py-3 border border-black border-dashed rounded-full hover:bg-black hover:text-white dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black transition">
                <i class="bi bi-arrow-left"></i> <span>Back to Portfolio</span>
              </a>
            </div>
          </div>
        } @else {
          <div class="section bg-white dark:bg-boxDark rounded-lg p-12 text-center">
            <h2 class="text-2xl font-poppins font-semibold mb-4 dark:text-white">Project Not Found</h2>
            <a routerLink="/" class="font-mono underline text-sm dark:text-white">Return to Home</a>
          </div>
        }
      </div>
    </div>
  `
})
export class PortfolioDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private supabase = inject(SupabaseService);
  private fallbackPortfolioService = inject(PortfolioService);
  project: ProjectItem | undefined;
  private currentSlug = '';
  private syncChannel?: BroadcastChannel;

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async params => {
      this.currentSlug = params.get('slug') || '';
      await this.loadProject();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    if (typeof window !== 'undefined') {
      window.addEventListener('portfolio_data_updated', () => this.loadProject());
      window.addEventListener('focus', () => this.loadProject());
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') this.loadProject();
      });
      try {
        this.syncChannel = new BroadcastChannel('portfolio_sync');
        this.syncChannel.onmessage = () => this.loadProject();
      } catch {}
    }
  }

  private async loadProject(): Promise<void> {
    if (!this.currentSlug) return;
    const supabaseProj = await this.supabase.getProjectBySlug(this.currentSlug);
    if (supabaseProj) {
      this.project = supabaseProj;
    } else {
      const fb = this.fallbackPortfolioService.getProjectBySlug(this.currentSlug);
      if (fb) {
        this.project = {
          title: fb.title,
          slug: fb.slug,
          category: fb.categoryLabel,
          client: fb.client,
          main_image: fb.image,
          images: fb.secondaryImages,
          short_description: fb.description,
          full_description: fb.description,
          project_url: 'https://example.com'
        };
      }
    }
  }
}

