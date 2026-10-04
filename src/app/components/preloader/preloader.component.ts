import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (!isDone()) {
      <div [class.loaded]="isLoaded()" class="preloader z-30 fixed top-0 left-0 visible opacity-100 bg-black w-full h-full text-center transition-all ease-out duration-500 pointer-events-none">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex space-x-3 font-mono font-normal uppercase text-white">
          <span class="opacity-100 inline-block transition ease-linear duration-100 animate-loader">L</span>
          <span class="opacity-100 inline-block transition ease-linear duration-100 animate-loader animation-delay-100">O</span>
          <span class="opacity-100 inline-block transition ease-linear duration-100 animate-loader animation-delay-200">A</span>
          <span class="opacity-100 inline-block transition ease-linear duration-100 animate-loader animation-delay-300">D</span>
          <span class="opacity-100 inline-block transition ease-linear duration-100 animate-loader animation-delay-400">I</span>
          <span class="opacity-100 inline-block transition ease-linear duration-100 animate-loader animation-delay-500">N</span>
          <span class="opacity-100 inline-block transition ease-linear duration-100 animate-loader animation-delay-600">G</span>
        </div>
      </div>
    }
  `
})
export class PreloaderComponent implements OnInit {
  isLoaded = signal(false);
  isDone = signal(false);

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoaded.set(true);
      setTimeout(() => {
        this.isDone.set(true);
      }, 500);
    }, 300);
  }
}
