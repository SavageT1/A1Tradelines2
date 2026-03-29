/**
 * SEOHead Component
 * Manages meta tags, Open Graph tags, and schema markup for each page
 */
import { useEffect } from "react";
import { injectSchemaMarkup, setMetaTags, setOpenGraphTags, SchemaMarkup } from "@/lib/seo";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  ogTitle?: string;
  ogDescription?: string;
  schema?: SchemaMarkup | SchemaMarkup[];
  keywords?: string;
  author?: string;
}

export default function SEOHead({
  title,
  description,
  canonical,
  ogImage = "https://a1tradelines.com/og-image.png",
  ogType = "website",
  ogTitle,
  ogDescription,
  schema,
  keywords,
  author = "A1 TradeLines",
}: SEOHeadProps) {
  useEffect(() => {
    // Set page title
    document.title = title;

    // Set meta tags
    const metaTags: Record<string, string> = {
      description,
      author,
      "viewport": "width=device-width, initial-scale=1.0",
    };

    if (keywords) {
      metaTags["keywords"] = keywords;
    }

    setMetaTags(metaTags);

    // Set Open Graph tags — ogTitle/ogDescription override title/description when provided
    const ogTags: Record<string, string> = {
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      type: ogType,
      url: window.location.href,
      image: ogImage,
      "image:width": "1200",
      "image:height": "630",
      "site_name": "A1 Tradelines",
    };

    setOpenGraphTags(ogTags);

    // Set Twitter Card tags
    const twitterTags: Record<string, string> = {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      image: ogImage,
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let element = document.querySelector(`meta[name="twitter:${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("name", `twitter:${name}`);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    });

    // Set canonical tag
    if (canonical) {
      let canonicalTag = document.querySelector("link[rel='canonical']");
      if (!canonicalTag) {
        canonicalTag = document.createElement("link");
        canonicalTag.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute("href", canonical);
    }

    // Inject schema markup
    if (schema) {
      injectSchemaMarkup(schema);
    }
  }, [title, description, canonical, ogImage, ogType, ogTitle, ogDescription, schema, keywords, author]);

  return null;
}
