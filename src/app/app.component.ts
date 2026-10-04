import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { BgLinesComponent } from './components/bg-lines/bg-lines.component';
import { HeaderComponent } from './components/header/header.component';
import { DrawerMenuComponent } from './components/drawer-menu/drawer-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PreloaderComponent,
    BgLinesComponent,
    HeaderComponent,
    DrawerMenuComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  isMenuOpen = false;
  isAdminRoute = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isAdminRoute = event.urlAfterRedirects.startsWith('/admin') || this.router.url.startsWith('/admin');
    });
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.isAdminRoute = window.location.pathname.startsWith('/admin');
    }
  }

  toggleDrawer(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeDrawer(): void {
    this.isMenuOpen = false;
  }
}
