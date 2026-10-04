import { Injectable, signal } from '@angular/core';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  postedOn: string;
  postedBy: string;
  description: string;
  tags: string[];
  image: string;
  singleImage: string;
  secondaryImage: string;
  videoThumb: string;
  videoUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private posts = signal<BlogPost[]>([
    {
      id: '1',
      slug: '4-years-of-working-from-home',
      title: '4 years of working from home',
      category: 'Experience',
      postedOn: 'Nov 25',
      postedBy: 'admin',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
      tags: ['#Photography', '#Effects', '#Tutorial'],
      image: 'assets/images/blog-post-1.a6d3ea41.jpg',
      singleImage: 'assets/images/blog-single-1.d8cfe6dd.jpg',
      secondaryImage: 'assets/images/blog-single-2.3cef2b7b.jpg',
      videoThumb: 'assets/images/blog-single-3.66a4df56.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=V8yu12uRpBA'
    },
    {
      id: '2',
      slug: 'importance-of-outdoor-times',
      title: 'Importance of outdoor times',
      category: 'Health',
      postedOn: 'Nov 25',
      postedBy: 'admin',
      description: 'Spending quality time outdoors directly rejuvenates mental clarity, balances circadian rhythm, and ignites creative intuition. Regular interaction with natural daylight and open spaces lowers stress markers and fuels sustainable productivity during deep work hours.',
      tags: ['#Health', '#Lifestyle', '#Nature'],
      image: 'assets/images/blog-post-2.99e40feb.jpg',
      singleImage: 'assets/images/blog-post-2.99e40feb.jpg',
      secondaryImage: 'assets/images/blog-single-2.3cef2b7b.jpg',
      videoThumb: 'assets/images/blog-single-3.66a4df56.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=V8yu12uRpBA'
    },
    {
      id: '3',
      slug: 'fun-drinks-to-make-at-home',
      title: 'Fun drinks to make at home',
      category: 'Foods & Drinks',
      postedOn: 'Nov 25',
      postedBy: 'admin',
      description: 'Crafting artisan beverages at home is both an art and a sensory ritual. Discover simple yet elevated infusion recipes ranging from cold brew concoctions to citrus botanical sparklers that elevate your daily remote work routine.',
      tags: ['#Beverage', '#HomeMade', '#Lifestyle'],
      image: 'assets/images/blog-post-3.1e8acfca.jpg',
      singleImage: 'assets/images/blog-post-3.1e8acfca.jpg',
      secondaryImage: 'assets/images/blog-single-2.3cef2b7b.jpg',
      videoThumb: 'assets/images/blog-single-3.66a4df56.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=V8yu12uRpBA'
    },
    {
      id: '4',
      slug: 'benefits-of-eating-healthy',
      title: 'Benefits of eating healthy',
      category: 'Health',
      postedOn: 'Nov 25',
      postedBy: 'admin',
      description: 'A nutrient-dense diet functions as high-octane fuel for cognitive function and sustained focus. Exploring how anti-inflammatory whole foods improve focus, stabilize mood swings, and ensure long-term physical resilience.',
      tags: ['#Wellness', '#Nutrition', '#Energy'],
      image: 'assets/images/blog-post-4.a64680d4.jpg',
      singleImage: 'assets/images/blog-post-4.a64680d4.jpg',
      secondaryImage: 'assets/images/blog-single-2.3cef2b7b.jpg',
      videoThumb: 'assets/images/blog-single-3.66a4df56.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=V8yu12uRpBA'
    }
  ]);

  getPosts() {
    return this.posts.asReadonly();
  }

  getPostBySlug(slug: string): BlogPost | undefined {
    return this.posts().find(p => p.slug.toLowerCase() === slug.toLowerCase());
  }
}
