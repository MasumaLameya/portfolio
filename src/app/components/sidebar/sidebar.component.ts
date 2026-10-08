import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="z-10 sticky top-2 lg:top-6 lg:h-fit w-full bg-black/90 dark:bg-boxDark backdrop-blur-[5px] rounded-lg px-4 py-3 lg:px-8 lg:py-6 xl:px-9 xl:py-7 lg:backdrop-blur-none shadow-sectionBoxShadow">
      <ul class="font-mono font-normal uppercase text-sm tracking-wider text-center lg:text-left space-x-4 lg:space-x-0">
        <li class="list-none inline-block lg:block">
          <a (click)="scrollTo('about')" [class.active]="activeSection === 'about'" class="section-link group inline-flex justify-center items-center lg:block lg:justify-normal relative w-9 h-9 border border-transparent border-dashed rounded-full lg:w-auto lg:h-auto lg:border-none lg:rounded-none text-white/70 py-3 transition ease-linear duration-100 hover:text-white cursor-pointer select-none">
            <span class="hidden lg:inline-block">About Me</span><span class="lg:hidden">A</span>
            <span class="nav-circle hidden lg:inline-block absolute top-1/2 right-0 -translate-y-1/2 w-[5px] h-[5px] before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-white before:w-[5px] before:h-[5px] before:rounded-full before:opacity-70 before:transition-all before:ease-out before:duration-200 group-hover:before:opacity-100"></span>
          </a>
        </li>
        <li class="list-none inline-block lg:block">
          <a (click)="scrollTo('portfolio')" [class.active]="activeSection === 'portfolio'" class="section-link group inline-flex justify-center items-center lg:block lg:justify-normal relative w-9 h-9 border border-transparent border-dashed rounded-full lg:w-auto lg:h-auto lg:border-none lg:rounded-none text-white/70 py-3 transition ease-linear duration-100 hover:text-white cursor-pointer select-none">
            <span class="hidden lg:inline-block">Portfolio</span><span class="lg:hidden">P</span>
            <span class="nav-circle hidden lg:inline-block absolute top-1/2 right-0 -translate-y-1/2 w-[5px] h-[5px] before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-white before:w-[5px] before:h-[5px] before:rounded-full before:opacity-70 before:transition-all before:ease-out before:duration-200 group-hover:before:opacity-100"></span>
          </a>
        </li>
        <li class="list-none inline-block lg:block">
          <a (click)="scrollTo('services')" [class.active]="activeSection === 'services'" class="section-link group inline-flex justify-center items-center lg:block lg:justify-normal relative w-9 h-9 border border-transparent border-dashed rounded-full lg:w-auto lg:h-auto lg:border-none lg:rounded-none text-white/70 py-3 transition ease-linear duration-100 hover:text-white cursor-pointer select-none">
            <span class="hidden lg:inline-block">Technical Skills</span><span class="lg:hidden">TS</span>
            <span class="nav-circle hidden lg:inline-block absolute top-1/2 right-0 -translate-y-1/2 w-[5px] h-[5px] before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-white before:w-[5px] before:h-[5px] before:rounded-full before:opacity-70 before:transition-all before:ease-out before:duration-200 group-hover:before:opacity-100"></span>
          </a>
        </li>

        <li class="list-none inline-block lg:block">
          <a (click)="scrollTo('resume')" [class.active]="activeSection === 'resume'" class="section-link group inline-flex justify-center items-center lg:block lg:justify-normal relative w-9 h-9 border border-transparent border-dashed rounded-full lg:w-auto lg:h-auto lg:border-none lg:rounded-none text-white/70 py-3 transition ease-linear duration-100 hover:text-white cursor-pointer select-none">
            <span class="hidden lg:inline-block">Resume</span><span class="lg:hidden">R</span>
            <span class="nav-circle hidden lg:inline-block absolute top-1/2 right-0 -translate-y-1/2 w-[5px] h-[5px] before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-white before:w-[5px] before:h-[5px] before:rounded-full before:opacity-70 before:transition-all before:ease-out before:duration-200 group-hover:before:opacity-100"></span>
          </a>
        </li>
        <li class="list-none inline-block lg:block">
          <a (click)="scrollTo('blog')" [class.active]="activeSection === 'blog'" class="section-link group inline-flex justify-center items-center lg:block lg:justify-normal relative w-9 h-9 border border-transparent border-dashed rounded-full lg:w-auto lg:h-auto lg:border-none lg:rounded-none text-white/70 py-3 transition ease-linear duration-100 hover:text-white cursor-pointer select-none">
            <span class="hidden lg:inline-block">Research Publications</span><span class="lg:hidden">RP</span>
            <span class="nav-circle hidden lg:inline-block absolute top-1/2 right-0 -translate-y-1/2 w-[5px] h-[5px] before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-white before:w-[5px] before:h-[5px] before:rounded-full before:opacity-70 before:transition-all before:ease-out before:duration-200 group-hover:before:opacity-100"></span>
          </a>
        </li>
        <li class="list-none inline-block lg:block">
          <a (click)="scrollTo('contact')" [class.active]="activeSection === 'contact'" class="section-link group inline-flex justify-center items-center lg:block lg:justify-normal relative w-9 h-9 border border-transparent border-dashed rounded-full lg:w-auto lg:h-auto lg:border-none lg:rounded-none text-white/70 py-3 transition ease-linear duration-100 hover:text-white cursor-pointer select-none">
            <span class="hidden lg:inline-block">Contact</span><span class="lg:hidden">C</span>
            <span class="nav-circle hidden lg:inline-block absolute top-1/2 right-0 -translate-y-1/2 w-[5px] h-[5px] before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-white before:w-[5px] before:h-[5px] before:rounded-full before:opacity-70 before:transition-all before:ease-out before:duration-200 group-hover:before:opacity-100"></span>
          </a>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class SidebarComponent {
  @Input() activeSection: string = 'about';

  constructor(private router: Router) {}

  scrollTo(sectionId: string): void {
    if (this.router.url !== '/' && !this.router.url.startsWith('/#')) {
      this.router.navigate(['/'], { fragment: sectionId }).then(() => {
        setTimeout(() => this.smoothScrollToElement(sectionId), 100);
      });
    } else {
      this.smoothScrollToElement(sectionId);
    }
  }

  private smoothScrollToElement(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - 24;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
