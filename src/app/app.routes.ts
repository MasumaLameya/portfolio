import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { PortfolioDetailComponent } from './pages/portfolio-detail/portfolio-detail.component';
import { AdminLoginComponent } from './pages/admin/login/admin-login.component';
import { AdminDashboardComponent } from './pages/admin/dashboard/admin-dashboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blog/:slug', component: BlogDetailComponent },
  { path: 'portfolio/:slug', component: PortfolioDetailComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
