export interface SchemaMarkup {
  "@context": string;
  "@type": string;
  [key: string]: any;
}

export const setMetaTags = (tags: Record<string, string>): void => {
  Object.entries(tags).forEach(([name, content]) => {
    if (!content) return;

    let element = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);

    if (!element) {
      element = document.createElement("meta");
      element.setAttribute("name", name);
      document.head.appendChild(element);
    }

    element.setAttribute("content", content);
  });
};

export const setOpenGraphTags = (tags: Record<string, string>): void => {
  Object.entries(tags).forEach(([property, content]) => {
    if (!content) return;

    const ogProperty = property.startsWith("og:") ? property : `og:${property}`;
    let element = document.head.querySelector<HTMLMetaElement>(`meta[property="${ogProperty}"]`);

    if (!element) {
      element = document.createElement("meta");
      element.setAttribute("property", ogProperty);
      document.head.appendChild(element);
    }

    element.setAttribute("content", content);
  });
};

export const generateOrganizationSchema = (): SchemaMarkup => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "A1 Tradelines",
  url: "https://a1tradelines.com",
  logo: "https://a1tradelines.com/logo.png",
  description: "Authorized user tradeline matching, education, and reporting support. No credit outcome is guaranteed.",
  sameAs: ["https://www.facebook.com/A1Tradelines/"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    telephone: "+1-908-767-5309",
    email: "info@a1tradelines.com",
    areaServed: "US",
    availableLanguage: "en",
  },
  knowsAbout: [
    "Authorized User Tradelines",
    "Tradeline Matching",
    "Credit Profile Education",
    "Credit Utilization",
    "Credit Reporting Timelines",
  ],
});

export const generateServiceSchema = (): SchemaMarkup => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Authorized User Tradeline Matching Service",
  description: "Authorized user tradeline matching, education, and reporting support based on profile fit, account age, credit limit, reported balance, and reporting timeline. No credit outcome is guaranteed.",
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
    name: "Authorized User Tradeline Options",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Authorized User Tradeline Matching",
        description: "Profile-based tradeline matching using account age, limit, reported balance, and timeline factors. Pricing varies by selected account and availability.",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://a1tradelines.com/buy-tradelines",
      },
    ],
  },
});

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
  keywords: [article.category, "authorized user tradelines", "tradeline matching", "credit profile education"],
});

export const generateAggregateRatingSchema = (testimonials: Array<{ rating: number }>): SchemaMarkup => ({
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  itemReviewed: {
    "@type": "Organization",
    name: "A1 Tradelines",
    url: "https://a1tradelines.com",
  },
  ratingValue: (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1),
  ratingCount: testimonials.length.toString(),
  bestRating: "5",
  worstRating: "1",
});

export const generateLocalBusinessSchema = (): SchemaMarkup => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "A1 Tradelines",
  image: "https://a1tradelines.com/logo.png",
  description: "Authorized user tradeline matching, education, and reporting support. No credit outcome is guaranteed.",
  telephone: "+1-908-767-5309",
  email: "info@a1tradelines.com",
  url: "https://a1tradelines.com",
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
});

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

export const injectSchemaMarkup = (schema: SchemaMarkup | SchemaMarkup[]): void => {
  const key = Array.isArray(schema)
    ? schema.map((s) => s["@type"]).join(",")
    : schema["@type"];
  const attrKey = `data-schema-types`;

  const existing = document.head.querySelector(`script[type="application/ld+json"][${attrKey}="${key}"]`);
  if (existing) {
    existing.remove();
  }

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute(attrKey, key);
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};
