export interface Blog {
  id: string;

  title: string;

  slug: string;

  excerpt: string;

  content: `
Artificial Intelligence is transforming modern software development.

It helps developers write code faster, automate testing, improve user experiences and build intelligent products.

Companies like Google, Microsoft and OpenAI are investing billions in AI research.

In the coming years AI will become a standard part of every software stack.
`,

  coverImage: string;

  category: string;

  author: string;

  readTime: number;

  featured: boolean;

  published: boolean;

  createdAt: string;

  updatedAt: string;

  tags: string[];
}