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
    <div [class.show]="isOpen" class="toggle-menu z-20 fixed top-0 right-0 translate-x-3 w-96 h-full bg-black dark:bg-boxDark dark:shadow-darkBox px-10 py-12 transition-all ease-out duration-150 opacity-0 invisible">
      <h6 class="block font-mono font-normal uppercase text-sm tracking-[0.5px] text-white mb-2">Phone:</h6>
      <h4 class="font-poppins font-medium text-xl text-white">{{ profile().phone || '+(976) 12 34 9999' }}</h4>
      <div class="mt-6">
        <h6 class="block font-mono font-normal uppercase text-sm tracking-[0.5px] text-white mb-2">Email:</h6>
        <h4 class="font-poppins font-medium text-xl text-white">{{ profile().email || 'flatheme@gmail.com' }}</h4>
      </div>
      <ul class="space-x-2 mt-4">
        <li *ngIf="profile().social_facebook" class="list-none inline-block"><a [href]="profile().social_facebook" target="_blank" class="inline-flex justify-center items-center bg-white/15 w-10 h-10 rounded-full text-white transition ease-out duration-150 hover:bg-white/20" aria-label="Social link"><i class="bi bi-facebook"></i></a></li>
        <li *ngIf="profile().social_twitter" class="list-none inline-block"><a [href]="profile().social_twitter" target="_blank" class="inline-flex justify-center items-center bg-white/15 w-10 h-10 rounded-full text-white transition ease-out duration-150 hover:bg-white/20" aria-label="Social link"><i class="bi bi-twitter-x"></i></a></li>
        <li *ngIf="profile().social_instagram" class="list-none inline-block"><a [href]="profile().social_instagram" target="_blank" class="inline-flex justify-center items-center bg-white/15 w-10 h-10 rounded-full text-white transition ease-out duration-150 hover:bg-white/20" aria-label="Social link"><i class="bi bi-instagram"></i></a></li>
        <li *ngIf="profile().social_github" class="list-none inline-block"><a [href]="profile().social_github" target="_blank" class="inline-flex justify-center items-center bg-white/15 w-10 h-10 rounded-full text-white transition ease-out duration-150 hover:bg-white/20" aria-label="Social link"><i class="bi bi-github"></i></a></li>
      </ul>
      <ul class="mt-10 space-y-3">
        <li class="relative pl-3 before:content-[''] before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:bg-white before:opacity-70 before:w-1 before:h-1 before:rounded-full transition-all duration-100 hover:before:opacity-100">
          <button (click)="themeService.toggleTheme()" class="font-mono font-medium uppercase text-sm tracking-[0.5px] text-white hover:underline" aria-label="Toggle theme">
            {{ themeService.isDarkMode() ? 'Light Version' : 'Dark Version' }}
          </button>
        </li>
        <li class="relative pl-3 before:content-[''] before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:bg-white before:opacity-70 before:w-1 before:h-1 before:rounded-full transition-all duration-100 hover:before:opacity-100">
          <a routerLink="/admin" (click)="closeMenu.emit()" class="font-mono font-medium uppercase text-sm tracking-[0.5px] text-amber-400 hover:underline inline-flex items-center space-x-1.5">
            <i class="bi bi-shield-lock text-xs"></i>
            <span>Admin Panel</span>
          </a>
        </li>
      </ul>
      <div class="absolute bottom-12 left-10 right-10">
        <p class="text-white/70">© 2026 {{ profile().name || 'Christina Gray' }}.</p>
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

  async ngOnInit(): Promise<void> {
    const p = await this.supabase.getProfile();
    if (p) this.profile.set(p);
  }
}

