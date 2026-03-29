/**
 * SEO Utilities - Schema Markup and Meta Tags
 * Generates structured data for Google Search and AI-driven answers
 */

export interface SchemaMarkup {
  "@context": string;
  "@type": string;
  [key: string]: any;
}

/**
 * Organization Schema
 * Helps Google understand your business entity
 */
export const generateOrganizationSchema = (): SchemaMarkup => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "A1 Tradelines",
  url: "https://a1tradelines.com",
  logo: "https://a1tradelines.com/logo.png",
  description: "Strategy-first tradeline matching for credit profile improvement and funding goals",
  sameAs: [
    "https://facebook.com/a1tradelines",
    "https://instagram.com/a1tradelines",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    telephone: "+1-908-767-5309",
    email: "info@a1tradelines.com",
    areaServed: "US",
    availableLanguage: "en",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "522 N Central Ave #831",
    addressLocality: "Phoenix",
    addressRegion: "AZ",
    postalCode: "85004",
    addressCountry: "US",
  },
  foundingDate: "2010",
  numberOfEmployees: "50-100",
  knowsAbout: [
    "Tradelines",
    "Credit Profile Improvement",
    "Authorized User Accounts",
    "Credit Scoring",
    "Financial Strategy",
  ],
});

/**
 * Service Schema
 * Describes your tradeline matching service
 */
export const generateServiceSchema = (): SchemaMarkup => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Tradeline Matching Service",
  description: "Premium authorized user tradelines matched to your specific credit profile improvement goals",
  provider: {
    "@type": "Organization",
    name: "A1 Tradelines",
    url: "https://a1tradelines.com",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tradeline Inventory",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Premium Tradelines",
        description: "High-limit, aged tradelines with perfect payment history",
        price: "299-999",
        priceCurrency: "USD",
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "2500",
    bestRating: "5",
    worstRating: "1",
  },
});

/**
 * FAQ Schema
 * Marks up FAQ items for rich snippets in search results
 */
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>): SchemaMarkup => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

/**
 * Article/BlogPosting Schema
 * Marks up blog posts for better indexing and rich results
 */
export const generateArticleSchema = (article: {
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  category: string;
  readTime: string;
}): SchemaMarkup => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: article.title,
  description: article.excerpt,
  articleBody: article.content || article.excerpt,
  author: {
    "@type": "Organization",
    name: "A1 Tradelines",
    url: "https://a1tradelines.com",
  },
  datePublished: article.date,
  dateModified: article.date,
  publisher: {
    "@type": "Organization",
    name: "A1 Tradelines",
    logo: {
      "@type": "ImageObject",
      url: "https://a1tradelines.com/logo.png",
    },
  },
  keywords: [article.category, "tradelines", "credit profile improvement", "credit score"],
});

/**
 * Review/AggregateRating Schema
 * Displays star ratings in search results
 */
export const generateAggregateRatingSchema = (testimonials: Array<{ rating: number }>): SchemaMarkup => ({
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  ratingValue: (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1),
  ratingCount: testimonials.length.toString(),
  bestRating: "5",
  worstRating: "1",
});

/**
 * LocalBusiness Schema
 * Helps with local SEO
 */
export const generateLocalBusinessSchema = (): SchemaMarkup => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "A1 Tradelines",
  image: "https://a1tradelines.com/logo.png",
  description: "Strategy-first tradeline matching for credit profile improvement",
  address: {
    "@type": "PostalAddress",
    streetAddress: "522 N Central Ave #831",
    addressLocality: "Phoenix",
    addressRegion: "AZ",
    postalCode: "85004",
    addressCountry: "US",
  },
  telephone: "+1-908-767-5309",
  email: "info@a1tradelines.com",
  url: "https://a1tradelines.com",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
    validFrom: "2024-01-01",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "2500",
  },
});

/**
 * Breadcrumb Schema
 * Helps with navigation in search results
 */
export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>): SchemaMarkup => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

/**
 * WebSite Schema
 * Defines the site name Google displays in search results and enables Sitelinks Search Box
 */
export const generateWebSiteSchema = (): SchemaMarkup => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "A1 Tradelines",
  alternateName: "A1 TradeLines",
  url: "https://a1tradelines.com",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://a1tradelines.com/?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
});

/**
 * Helper function to inject schema markup into page head
 * Uses a data attribute to prevent duplicate injection on re-renders
 */
export const injectSchemaMarkup = (schema: SchemaMarkup | SchemaMarkup[]): void => {
  const key = Array.isArray(schema)
    ? schema.map((s) => s["@type"]).join(",")
    : schema["@type"];
  const attrKey = `data-schema-types`;

  // Remove existing script with same types to prevent duplicates
  const existing = document.head.querySelector(`script[type="application/ld+json"][${attrKey}="${key}"]`);
  if (existing) existing.remove();

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute(attrKey, key);
  script.textContent = JSON.stringify(Array.isArray(schema) ? schema : schema);
  document.head.appendChild(script);
};

/**
 * Helper function to set meta tags
 */
export const setMetaTags = (tags: Record<string, string>): void => {
  Object.entries(tags).forEach(([name, content]) => {
    let element = document.querySelector(`meta[name="${name}"]`);
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute("name", name);
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
  });
};

/**
 * Helper function to set Open Graph tags
 */
export const setOpenGraphTags = (tags: Record<string, string>): void => {
  Object.entries(tags).forEach(([property, content]) => {
    let element = document.querySelector(`meta[property="og:${property}"]`);
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute("property", `og:${property}`);
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
  });
};
