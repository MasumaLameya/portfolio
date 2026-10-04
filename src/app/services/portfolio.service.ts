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
      slug: 'glasses-of-cocktail',
      title: 'Glasses of Cocktail',
      category: 'Branding',
      categoryLabel: 'Branding',
      image: 'assets/images/portfolio-1.9aa83f65.jpg',
      client: 'Cocktail Studio',
      date: 'January 2025',
      description: 'Comprehensive brand identity and lifestyle photography shoot created for high-end cocktail bar branding. Focused on modern minimalism with rich tonal balance.',
      secondaryImages: [
        'assets/images/p-single-1.2c6b95e9.jpg',
        'assets/images/p-single-2.3b8d2066.jpg'
      ]
    },
    {
      id: '2',
      slug: 'a-branch-with-flowers',
      title: 'A Branch with Flowers',
      category: 'Mockup',
      categoryLabel: 'Mockup',
      image: 'assets/images/portfolio-2.dc4d8dd8.jpg',
      client: 'Botany & Co',
      date: 'December 2024',
      description: 'Organic 3D floral mockup designed for editorial publishing and print branding. Clean lighting with soft shadows for high dynamic range presentation.',
      secondaryImages: [
        'assets/images/p-single-2.3b8d2066.jpg',
        'assets/images/p-single-3.d64779e4.jpg'
      ]
    },
    {
      id: '3',
      slug: 'orange-Rose-Flower',
      title: 'Orange Rose Flower',
      category: 'Mockup',
      categoryLabel: 'Mockup',
      image: 'assets/images/portfolio-3.772523de.jpg',
      client: 'Florist Boutique',
      date: 'November 2024',
      description: 'Artistic product showcase blending warm natural tones with sleek typography for luxury cosmetics and floral packaging.',
      secondaryImages: [
        'assets/images/p-single-3.d64779e4.jpg',
        'assets/images/p-single-1.2c6b95e9.jpg'
      ]
    },
    {
      id: '4',
      slug: 'Green-plant-on-a-desk',
      title: 'Green Plant on a Desk',
      category: 'Branding',
      categoryLabel: 'Branding',
      image: 'assets/images/portfolio-4.884e57ca.jpg',
      client: 'Studio Workspace',
      date: 'October 2024',
      description: 'Minimalist workplace aesthetic branding showcasing sustainable lifestyle products in modern office interiors.',
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
