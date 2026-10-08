import { Injectable, signal } from '@angular/core';

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  category: 'Branding' | 'Mockup' | string;
  categoryLabel: string;
  image: string;
  client: string;
  date: string;
  description: string;
  secondaryImages: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private projects = signal<PortfolioItem[]>([
    {
      id: '1',
      slug: 'student-mental-health-monitoring-system',
      title: 'Student Mental Health Monitoring System',
      category: 'AI & Web Platform',
      categoryLabel: 'AI & Web Platform',
      image: 'assets/images/portfolio-1.9aa83f65.jpg',
      client: 'Academic & Healthcare Platform',
      date: '2024',
      description: 'Web-based mental health monitoring platform integrating PHQ-9 and C-SSRS assessments, semester-wise risk monitoring, and AI-assisted student support with Gemini AI live chat and risk management.',
      secondaryImages: [
        'assets/images/p-single-1.2c6b95e9.jpg',
        'assets/images/p-single-2.3b8d2066.jpg'
      ]
    },
    {
      id: '2',
      slug: 'real-estate-crm-system',
      title: 'Real Estate CRM System',
      category: 'Enterprise Web App',
      categoryLabel: 'Enterprise Web App',
      image: 'assets/images/portfolio-2.dc4d8dd8.jpg',
      client: 'Real Capital Group',
      date: '2023 - 2024',
      description: 'Comprehensive enterprise CRM system designed to manage client leads, sales activities, follow-ups, and property data with ASP.NET Core and MySQL.',
      secondaryImages: [
        'assets/images/p-single-2.3b8d2066.jpg',
        'assets/images/p-single-3.d64779e4.jpg'
      ]
    },
    {
      id: '3',
      slug: 'modernshop-ecommerce-management',
      title: 'ModernShop – E-Commerce & Shop Management',
      category: 'E-Commerce',
      categoryLabel: 'E-Commerce',
      image: 'assets/images/portfolio-3.772523de.jpg',
      client: 'Retail Prototype',
      date: '2024',
      description: 'Prototype e-commerce and shop management platform with product browsing, shopping cart, order processing, and administrative dashboard for inventory and orders.',
      secondaryImages: [
        'assets/images/p-single-3.d64779e4.jpg',
        'assets/images/p-single-1.2c6b95e9.jpg'
      ]
    },
    {
      id: '4',
      slug: 'todonova-task-management',
      title: 'TodoNova – Task Management Web App',
      category: 'Productivity Web App',
      categoryLabel: 'Productivity Web App',
      image: 'assets/images/portfolio-4.884e57ca.jpg',
      client: 'Productivity Suite',
      date: '2024',
      description: 'Web-based task management application for creating, organizing, updating, and tracking daily tasks with priority tracking and deadline management.',
      secondaryImages: [
        'assets/images/p-single-1.2c6b95e9.jpg',
        'assets/images/p-single-2.3b8d2066.jpg'
      ]
    }
  ]);

  getProjects() {
    return this.projects.asReadonly();
  }

  getProjectBySlug(slug: string): PortfolioItem | undefined {
    return this.projects().find(p => p.slug.toLowerCase() === slug.toLowerCase());
  }
}
