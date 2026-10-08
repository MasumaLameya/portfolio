import { Component, EventEmitter, Input, Output, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { SupabaseService, ProfileData } from '../../services/supabase.service';

@Component({
  selector: 'app-drawer-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Mobile Backdrop Overlay -->
    <div *ngIf="isOpen" (click)="closeMenu.emit()" class="fixed inset-0 bg-black/60 z-20 backdrop-blur-sm transition-opacity duration-200"></div>

    <div [class.show]="isOpen" class="toggle-menu z-30 fixed top-0 right-0 w-full sm:w-80 md:w-96 max-w-[100vw] h-full bg-black dark:bg-boxDark dark:shadow-darkBox px-6 sm:px-10 py-10 sm:py-12 transition-all ease-out duration-200 opacity-0 invisible overflow-y-auto">
      <div class="mb-4">
        <h6 class="block font-mono font-normal uppercase text-xs sm:text-sm tracking-[0.5px] text-white/60 mb-1">Location:</h6>
        <h4 class="font-poppins font-medium text-lg sm:text-xl text-white">{{ profile().address || 'Dhaka, Bangladesh' }}</h4>
      </div>
      <div class="mt-6">
        <h6 class="block font-mono font-normal uppercase text-xs sm:text-sm tracking-[0.5px] text-white/60 mb-1">Email:</h6>
        <h4 class="font-poppins font-medium text-base sm:text-lg text-white break-all">{{ profile().email || 'masumalamya7@gmail.com' }}</h4>
      </div>
      <ul class="flex flex-wrap gap-2 mt-6">
        <li *ngIf="profile().social_facebook" class="list-none"><a [href]="profile().social_facebook" target="_blank" class="inline-flex justify-center items-center bg-white/15 w-10 h-10 rounded-full text-white transition ease-out duration-150 hover:bg-white/20" aria-label="Facebook"><i class="bi bi-facebook"></i></a></li>
        <li *ngIf="profile().social_twitter" class="list-none"><a [href]="profile().social_twitter" target="_blank" class="inline-flex justify-center items-center bg-white/15 w-10 h-10 rounded-full text-white transition ease-out duration-150 hover:bg-white/20" aria-label="Twitter"><i class="bi bi-twitter-x"></i></a></li>
        <li *ngIf="profile().social_instagram" class="list-none"><a [href]="profile().social_instagram" target="_blank" class="inline-flex justify-center items-center bg-white/15 w-10 h-10 rounded-full text-white transition ease-out duration-150 hover:bg-white/20" aria-label="Instagram"><i class="bi bi-instagram"></i></a></li>
        <li *ngIf="profile().social_github" class="list-none"><a [href]="profile().social_github" target="_blank" class="inline-flex justify-center items-center bg-white/15 w-10 h-10 rounded-full text-white transition ease-out duration-150 hover:bg-white/20" aria-label="GitHub"><i class="bi bi-github"></i></a></li>
        <li *ngIf="profile().social_linkedin" class="list-none"><a [href]="profile().social_linkedin" target="_blank" class="inline-flex justify-center items-center bg-white/15 w-10 h-10 rounded-full text-white transition ease-out duration-150 hover:bg-white/20" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a></li>
      </ul>
      <ul class="mt-8 sm:mt-10 space-y-4 border-t border-white/10 pt-6">
        <li class="relative pl-3 before:content-[''] before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:bg-white before:opacity-70 before:w-1 before:h-1 before:rounded-full transition-all duration-100 hover:before:opacity-100">
          <button (click)="themeService.toggleTheme()" class="font-mono font-medium uppercase text-sm tracking-[0.5px] text-white hover:underline flex items-center gap-2" aria-label="Toggle theme">
            <i [class]="themeService.isDarkMode() ? 'bi bi-sun' : 'bi bi-moon-stars'"></i>
            <span>{{ themeService.isDarkMode() ? 'Light Version' : 'Dark Version' }}</span>
          </button>
        </li>
        <li class="relative pl-3 before:content-[''] before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:bg-white before:opacity-70 before:w-1 before:h-1 before:rounded-full transition-all duration-100 hover:before:opacity-100">
          <a routerLink="/admin" (click)="closeMenu.emit()" class="font-mono font-medium uppercase text-sm tracking-[0.5px] text-amber-400 hover:underline inline-flex items-center space-x-1.5">
            <i class="bi bi-shield-lock text-xs"></i>
            <span>Admin Panel</span>
          </a>
        </li>
      </ul>
      <div class="mt-12 sm:mt-16 pt-6 border-t border-white/10">
        <p class="text-white/60 text-xs sm:text-sm font-mono">© 2026 {{ profile().name || 'MST. MASUMA AKTER LAMEYA' }}.</p>
      </div>
      <button (click)="closeMenu.emit()" class="menu-close absolute top-4 right-4 inline-flex justify-center items-center bg-white/15 w-10 h-10 rounded-full text-white text-xl transition ease-out duration-150 hover:bg-white/20" aria-label="Close menu">
        <i class="bi bi-x"></i>
      </button>
    </div>
  `
})
export class DrawerMenuComponent implements OnInit {
  @Input() isOpen = false;
  @Output() closeMenu = new EventEmitter<void>();
  themeService = inject(ThemeService);
  supabase = inject(SupabaseService);

  profile = signal<Partial<ProfileData>>({});

  private syncChannel?: BroadcastChannel;

  async ngOnInit(): Promise<void> {
    await this.loadDrawerProfile();

    if (typeof window !== 'undefined') {
      window.addEventListener('portfolio_data_updated', () => this.loadDrawerProfile());
      window.addEventListener('focus', () => this.loadDrawerProfile());
      window.addEventListener('pageshow', () => this.loadDrawerProfile());
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') this.loadDrawerProfile();
      });
      try {
        this.syncChannel = new BroadcastChannel('portfolio_sync');
        this.syncChannel.onmessage = () => this.loadDrawerProfile();
      } catch {}
    }
  }

  private async loadDrawerProfile(): Promise<void> {
    const p = await this.supabase.getProfile();
    if (p) this.profile.set(p);
  }
}

