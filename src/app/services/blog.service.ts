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
      slug: 'hybrid-bert-xgboost-mobile-app-reviews',
      title: 'Developer-Oriented Classification of Mobile App Reviews Using a Hybrid BERT-XGBoost Ensemble',
      category: 'Research (IEEE)',
      postedOn: '2026',
      postedBy: 'Masuma Akter Lameya (1st Author)',
      description: 'Conference Publication at 2026 IEEE 2nd International Conference on Quantum Photonics, Artificial Intelligence & Networking (QPAIN).\n\nAuthor Position: 1st Author\n\nAbstract: This paper introduces a novel hybrid NLP framework combining BERT embeddings and XGBoost ensemble classification to automate developer-oriented issue categorization, feature requests, and bug reports from large-scale mobile application user reviews with state-of-the-art accuracy.',
      tags: ['#IEEE', '#BERT', '#NLP', '#XGBoost', '#MachineLearning'],
      image: 'assets/images/blog-post-1.a6d3ea41.jpg',
      singleImage: 'assets/images/blog-single-1.d8cfe6dd.jpg',
      secondaryImage: 'assets/images/blog-single-2.3cef2b7b.jpg',
      videoThumb: 'assets/images/blog-single-3.66a4df56.jpg',
      videoUrl: 'https://github.com/MasumaLameya'
    },
    {
      id: '2',
      slug: 'effivit-hybrid-pancreatic-cancer-detection',
      title: 'EffiViT-Hybrid: A CNN–Transformer Framework for Pancreatic Cancer Detection from CT Images',
      category: 'Medical AI (IEEE)',
      postedOn: '2026',
      postedBy: 'Masuma Akter Lameya (3rd Author)',
      description: 'Conference Publication at 2026 IEEE 2nd International Conference on Quantum Photonics, Artificial Intelligence & Networking (QPAIN).\n\nAuthor Position: 3rd Author\n\nAbstract: Pancreatic cancer diagnosis from abdominal CT scans presents major clinical challenges due to subtle textural boundaries. This research presents EffiViT-Hybrid, a fused CNN-Vision Transformer architecture designed to capture localized lesion features alongside global context for highly sensitive early-stage cancer detection.',
      tags: ['#MedicalImaging', '#VisionTransformer', '#DeepLearning', '#ComputerVision'],
      image: 'assets/images/blog-post-2.99e40feb.jpg',
      singleImage: 'assets/images/blog-post-2.99e40feb.jpg',
      secondaryImage: 'assets/images/blog-single-2.3cef2b7b.jpg',
      videoThumb: 'assets/images/blog-single-3.66a4df56.jpg',
      videoUrl: 'https://github.com/MasumaLameya'
    },
    {
      id: '3',
      slug: 'building-scalable-enterprise-architectures-aspnet-core-angular',
      title: 'Building Scalable Enterprise Architectures with ASP.NET Core & Angular',
      category: 'Full-Stack Web',
      postedOn: '2025',
      postedBy: 'Masuma Akter Lameya',
      description: 'In modern full-stack development, decoupling backend business logic via clean architecture, RESTful API contracts, and robust ORMs like Entity Framework Core is paramount. Pairing this with Angular for structured, type-safe client interfaces ensures long-term scalability and ease of testing.',
      tags: ['#ASPNETCore', '#Angular', '#CleanArchitecture', '#RESTAPIs'],
      image: 'assets/images/blog-post-3.1e8acfca.jpg',
      singleImage: 'assets/images/blog-post-3.1e8acfca.jpg',
      secondaryImage: 'assets/images/blog-single-2.3cef2b7b.jpg',
      videoThumb: 'assets/images/blog-single-3.66a4df56.jpg',
      videoUrl: 'https://github.com/MasumaLameya'
    }
  ]);

  getPosts() {
    return this.posts.asReadonly();
  }

  getPostBySlug(slug: string): BlogPost | undefined {
    return this.posts().find(p => p.slug.toLowerCase() === slug.toLowerCase());
  }
}
