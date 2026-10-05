import { Component, EventEmitter, Output, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SupabaseService, ProfileData } from '../../services/supabase.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header id="header" class="lg:flex lg:justify-between">
      <div class="flex h-[50px] items-center space-x-6 lg:order-2 justify-end">
        <ul class="space-x-3.5 font-mono font-medium uppercase text-sm tracking-[0.5px]">
          <li *ngIf="profile()?.social_facebook" class="list-none inline-block"><a class="hover:underline dark:text-white" [href]="profile()?.social_facebook" target="_blank">FB</a></li>
          <li *ngIf="profile()?.social_twitter" class="list-none inline-block"><a class="hover:underline dark:text-white" [href]="profile()?.social_twitter" target="_blank">TW</a></li>
          <li *ngIf="profile()?.social_instagram" class="list-none inline-block"><a class="hover:underline dark:text-white" [href]="profile()?.social_instagram" target="_blank">IG</a></li>
          <li *ngIf="profile()?.social_linkedin" class="list-none inline-block"><a class="hover:underline dark:text-white" [href]="profile()?.social_linkedin" target="_blank">IN</a></li>
          <li *ngIf="profile()?.social_github" class="list-none inline-block"><a class="hover:underline dark:text-white" [href]="profile()?.social_github" target="_blank">GH</a></li>
        </ul>
        <button (click)="toggleMenu.emit()" class="menu-btn group relative w-[50px] h-[50px] bg-black dark:bg-boxDark rounded-b-lg" aria-label="Toggle navigation menu">
          <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-1 h-1 rounded-full transition-all ease-linear duration-100 delay-100 group-hover:scale-[3]"></span>
          <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 before:content-[''] before:absolute before:top-0 before:-left-[10px] before:bg-white before:w-1 before:h-1 before:rounded-full before:transition-all before:ease-linear before:duration-100 after:content-[''] after:absolute after:top-0 after:-right-[10px] after:bg-white after:w-1 after:h-1 after:rounded-full after:transition-all after:ease-linear after:duration-100 group-hover:before:left-0 group-hover:before:opacity-0 group-hover:after:right-0 group-hover:after:opacity-0"></span>
        </button>
      </div>
      <div class="py-7 lg:order-1">
        <a routerLink="/">
          <h1 class="text-5xl xl:text-7xl font-poppins font-semibold dark:text-white">
            {{ firstName }} <span class="stroke-text">{{ lastName }}</span>
          </h1>
        </a>
      </div>
    </header>
  `
})
export class HeaderComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter<void>();
  private supabase = inject(SupabaseService);
  profile = signal<ProfileData | null>(null);

  get firstName(): string {
    const name = this.profile()?.name || 'Christina Gray';
    const parts = name.split(' ');
    return parts.length > 1 ? parts.slice(0, -1).join(' ') : name;
  }

  get lastName(): string {
    const name = this.profile()?.name || 'Christina Gray';
    const parts = name.split(' ');
    return parts.length > 1 ? parts[parts.length - 1] : '';
  }

  async ngOnInit(): Promise<void> {
    const p = await this.supabase.getProfile();
    if (p) this.profile.set(p);
  }
}
