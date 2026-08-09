import articleData from "./blogArticles.json";

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogSection {
  heading: string;
  paragraphs: string[];
}

export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  published: string;
  updated: string;
  readTime: string;
  answer: string;
  sections: BlogSection[];
  faqs: BlogFAQ[];
  sources: Array<{ name: string; url: string }>;
  related: string[];
}

export const blogArticles = articleData as BlogArticle[];

export const findBlogArticle = (slug: string) =>
  blogArticles.find(article => article.slug === slug);

export const formatArticleDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${date}T12:00:00Z`));
