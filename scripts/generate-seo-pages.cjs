const fs = require("node:fs");
const path = require("node:path");
const blogArticles = require("../client/src/data/blogArticles.json");

const SITE_URL = "https://a1tradelines.com";
const LASTMOD = "2026-08-09";
const distDir = path.resolve(__dirname, "..", "dist", "public");
const indexPath = path.join(distDir, "index.html");

const routes = [
  {
    path: "/",
    title: "Authorized User Tradeline Matching | A1 Tradelines",
    description:
      "A1 Tradelines provides authorized user tradeline matching, education, and reporting support based on profile fit, account age, credit limit, balance, and timeline. No credit outcome is guaranteed.",
    keywords:
      "authorized user tradelines, tradeline matching, tradeline education, credit profile strategy, A1 Tradelines",
  },
  {
    path: "/about",
    title: "About A1 Tradelines | Authorized User Tradeline Matching",
    description:
      "Learn about A1 Tradelines, an authorized user tradeline matching and education company focused on profile fit, reporting support, and clear no-guarantee disclosures.",
    keywords:
      "about A1 Tradelines, authorized user tradelines, tradeline matching, credit profile education",
  },
  {
    path: "/how-it-works",
    title: "How Authorized User Tradelines Work | A1 Tradelines",
    description:
      "Learn how A1 Tradelines helps clients compare authorized user tradelines by account age, credit limit, bank, timing, pricing, and profile fit. No credit outcome is guaranteed.",
    keywords:
      "how do tradelines work, authorized user tradelines, buy tradelines, tradeline reporting, tradeline posting date",
  },
  {
    path: "/tradeline-buyers-guide",
    title: "Tradeline Buyer's Guide | How to Choose Authorized User Tradelines",
    description:
      "Learn how to choose authorized user tradelines by comparing account age, credit limit, bank, utilization, posting date, cycles, price, and profile fit.",
    keywords:
      "tradeline buyer guide, how to choose tradelines, best tradelines to buy, authorized user tradelines, cheap tradelines",
  },
  {
    path: "/tradeline-glossary",
    title: "Tradeline Glossary | Authorized User Tradeline Terms",
    description:
      "Understand common tradeline terms including authorized user, credit utilization, posting date, statement date, seasoned tradeline, primary tradeline, CPN, and non-posting.",
    keywords:
      "tradeline glossary, authorized user meaning, credit utilization, posting date, statement date, seasoned tradeline, primary tradeline, CPN",
  },
  {
    path: "/tradeline-assessment",
    title: "Tradeline Assessment | Get Matched With Authorized User Tradelines",
    description:
      "Request a tradeline assessment from A1 Tradelines. Share your goals, timeline, budget, utilization range, and profile factors for authorized user tradeline matching support.",
    keywords:
      "tradeline assessment, authorized user tradeline match, tradeline consultation, buy tradelines, credit profile assessment",
  },
  {
    path: "/buy-tradelines",
    title: "Authorized User Tradeline Inventory | A1 Tradelines",
    description:
      "Browse authorized user tradeline options by bank, credit limit, account age, reporting term, availability, purchase deadline, target reporting date, and price.",
    keywords:
      "authorized user tradelines, tradeline inventory, tradeline matching, credit profile strategy",
  },
  {
    path: "/buy-authorized-user-tradelines",
    title: "Buy Authorized User Tradelines | A1 Tradelines",
    description:
      "Compare authorized user tradelines by bank, account age, credit limit, posting timeline, cycles, available spots, and price. No credit outcome is guaranteed.",
    keywords:
      "buy authorized user tradelines, authorized user tradelines for sale, buy tradelines, tradeline inventory",
  },
  {
    path: "/tradelines-for-sale",
    title: "Tradelines for Sale | Authorized User Tradeline Inventory",
    description:
      "Compare authorized user tradelines for sale by bank, age, credit limit, price, cycles, statement date, and estimated posting date. No credit outcome is guaranteed.",
    keywords:
      "tradelines for sale, authorized user tradelines for sale, buy tradelines, tradeline inventory",
  },
  {
    path: "/seasoned-tradelines",
    title: "Seasoned Tradelines | Account Age and Authorized User Tradelines",
    description:
      "Learn what seasoned tradelines are, how account age may matter, and how to compare authorized user tradelines by age, limit, balance, timing, and profile fit.",
    keywords:
      "seasoned tradelines, aged tradelines, authorized user tradelines, account age, buy seasoned tradelines",
  },
  {
    path: "/best-tradelines-for-credit-utilization",
    title: "Best Tradelines for Credit Utilization | A1 Tradelines",
    description:
      "Learn how credit limit, reported balance, account age, and timing may affect utilization-related tradeline decisions. No credit outcome is guaranteed.",
    keywords:
      "best tradelines for credit utilization, high limit tradelines, authorized user tradelines, credit utilization",
  },
  {
    path: "/how-long-do-tradelines-take-to-post",
    title: "How Long Do Tradelines Take to Post? | Reporting Timeline",
    description:
      "Learn how tradeline posting timelines work, including statement dates, estimated reporting dates, bureau processing, and non-posting limitations.",
    keywords:
      "how long do tradelines take to post, tradeline posting date, tradeline reporting timeline, authorized user tradelines",
  },
  {
    path: "/are-tradelines-legal",
    title: "Are Tradelines Legal? | Authorized User Tradeline Education",
    description:
      "Learn about authorized user tradelines, legal-risk considerations, CPN warnings, lender treatment, and no-guarantee disclosures from A1 Tradelines.",
    keywords:
      "are tradelines legal, authorized user tradelines legal, CPN tradelines, buy tradelines legal",
  },
  {
    path: "/can-tradelines-help-business-funding",
    title: "Can Tradelines Help Business Funding? | A1 Tradelines",
    description:
      "Learn how authorized user tradelines may relate to personal credit factors used in business funding reviews, plus lender limitations and no-guarantee disclosures.",
    keywords:
      "can tradelines help business funding, tradelines for business credit, authorized user tradelines business funding",
  },
  {
    path: "/best-tradelines-for-sale",
    title:
      "Best Tradelines for Sale | Verified Authorized User Accounts | A1 Tradelines",
    description:
      "Shop the best tradelines for sale, including high-limit and aged authorized user account options. Compare fit, timing, pricing, and no-guarantee disclosures.",
    keywords:
      "best tradelines for sale, buy tradelines, authorized user tradelines, tradelines for credit, boost credit score",
  },
  {
    path: "/authorized-user-tradelines",
    title: "Authorized User Tradelines Explained | A1 Tradelines",
    description:
      "Learn how authorized user tradelines work, why they may affect credit profile factors, and what to compare before buying tradelines from A1 Tradelines.",
    keywords:
      "authorized user tradelines, what is an authorized user tradeline, how tradelines work, tradeline credit boost, buy authorized user account",
  },
  {
    path: "/how-to-boost-credit-score-fast",
    title: "How to Boost Your Credit Score Fast | A1 Tradelines",
    description:
      "Learn credit score improvement methods, including authorized user tradelines, utilization paydown, and dispute strategy. No score increase is guaranteed.",
    keywords:
      "how to boost credit score fast, increase credit score quickly, raise credit score 100 points, credit score improvement, tradelines credit boost",
  },
  {
    path: "/faq",
    title: "FAQ | Authorized User Tradeline Questions | A1 Tradelines",
    description:
      "Answers to common buyer questions about authorized user tradelines, pricing, reporting timelines, credit utilization, profile matching, risks, legality, CPNs, and no-guarantee disclosures.",
    keywords:
      "authorized user tradelines FAQ, how do tradelines work, buy tradelines, tradeline pricing, tradelines for sale, credit utilization, A1 Tradelines",
  },
  {
    path: "/blog",
    title: "Tradeline Learning Center | A1 Tradelines",
    description:
      "Clear, practical answers about authorized user tradelines, credit utilization, reporting timelines, buyer considerations, and common myths.",
    keywords:
      "authorized user tradelines, tradeline education, credit utilization, tradeline reporting timeline, compare tradelines",
  },
  {
    path: "/broker-program",
    title: "Tradeline Broker Program & Application | A1 Tradelines",
    description:
      "Apply for the A1 Tradelines broker program. Qualified agencies can request inventory access, partner resources, and eligible pricing.",
    keywords:
      "tradeline broker program, tradeline broker application, wholesale tradelines, authorized user tradeline partner",
  },
  {
    path: "/contact",
    title: "Contact A1 Tradelines | Authorized User Tradeline Consultation",
    description:
      "Contact A1 Tradelines to ask questions about authorized user tradeline options, reporting timelines, and profile-based matching. No credit outcome is guaranteed.",
    keywords:
      "contact A1 Tradelines, authorized user tradelines, tradeline consultation, credit profile strategy",
  },
  {
    path: "/non-posting-policy",
    title: "Non-Posting & Refund Policy | A1 Tradelines",
    description:
      "Review A1 Tradelines' non-posting policy, reporting limitations, documentation expectations, and no-guarantee disclosures for authorized user tradelines.",
    keywords:
      "tradeline non-posting policy, tradeline refund policy, authorized user tradeline posting, tradeline did not post",
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy | A1 Tradelines",
    description:
      "Read the A1 Tradelines Privacy Policy, including how we collect, use, and protect information submitted through our website.",
    keywords: "A1 Tradelines privacy policy, privacy, data protection",
  },
  {
    path: "/terms-of-service",
    title: "Terms of Service | A1 Tradelines",
    description:
      "Read the A1 Tradelines Terms of Service for website use, authorized user tradeline inquiries, limitations, and no-guarantee disclosures.",
    keywords: "A1 Tradelines terms, terms of service, tradeline terms",
  },
  {
    path: "/disclaimer",
    title: "Disclaimer | A1 Tradelines",
    description:
      "Important A1 Tradelines disclaimers about authorized user tradelines, credit reporting, no credit outcome guarantees, and third-party factors.",
    keywords: "A1 Tradelines disclaimer, tradeline disclaimer, no guarantee",
  },
];

routes.push(
  ...blogArticles.map(article => ({
    path: `/blog/${article.slug}`,
    title: `${article.title} | A1 Tradelines`,
    description: article.description,
    keywords: `${article.category}, authorized user tradelines, tradeline education`,
    lastmod: article.updated,
    ogType: "article",
    article,
  }))
);

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function replaceTag(html, pattern, replacement) {
  return pattern.test(html)
    ? html.replace(pattern, replacement)
    : html.replace("</head>", `${replacement}\n  </head>`);
}

function renderStaticArticle(article) {
  const sectionHtml = article.sections
    .map(
      section => `
    <section>
      <h2>${escapeHtml(section.heading)}</h2>
      ${section.paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join("\n")}
    </section>`
    )
    .join("\n");
  const faqHtml = article.faqs
    .map(
      faq => `
    <section>
      <h3>${escapeHtml(faq.question)}</h3>
      <p>${escapeHtml(faq.answer)}</p>
    </section>`
    )
    .join("\n");
  const sourcesHtml = article.sources
    .map(
      source =>
        `<li><a href="${escapeHtml(source.url)}">${escapeHtml(source.name)}</a></li>`
    )
    .join("\n");

  return `<article data-static-content="blog-article">
    <nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/blog">Learning Center</a> / ${escapeHtml(article.title)}</nav>
    <header>
      <p>${escapeHtml(article.category)}</p>
      <h1>${escapeHtml(article.title)}</h1>
      <p>${escapeHtml(article.description)}</p>
      <p>By A1 Tradelines Editorial Team · Reviewed ${escapeHtml(article.updated)} · ${escapeHtml(article.readTime)}</p>
    </header>
    <section><h2>Short answer</h2><p>${escapeHtml(article.answer)}</p></section>
    ${sectionHtml}
    <section><h2>Frequently asked questions</h2>${faqHtml}</section>
    <section><h2>Authoritative resources</h2><ul>${sourcesHtml}</ul></section>
    <p><a href="/buy-tradelines">Browse current tradeline options</a></p>
    <p>Educational information only. Reporting, score changes, approvals, funding, and other outcomes are not guaranteed.</p>
  </article>`;
}

function renderStaticBlogIndex() {
  const articleLinks = blogArticles
    .map(
      article => `<article>
      <p>${escapeHtml(article.category)} · ${escapeHtml(article.readTime)}</p>
      <h2><a href="/blog/${escapeHtml(article.slug)}">${escapeHtml(article.title)}</a></h2>
      <p>${escapeHtml(article.description)}</p>
    </article>`
    )
    .join("\n");

  return `<main data-static-content="blog-index">
    <header><h1>Tradeline Learning Center</h1><p>Direct, plain-language answers about authorized user tradelines, credit utilization, reporting timelines, buyer considerations, and common myths.</p></header>
    <section aria-label="Tradeline education articles">${articleLinks}</section>
    <p><a href="/buy-tradelines">Browse current tradeline options</a></p>
  </main>`;
}

function renderStaticBrokerPage() {
  return `<main data-static-content="broker-program">
    <header>
      <p>A1 Partner Program</p>
      <h1>Serve more clients with a clearer tradeline workflow.</h1>
      <p>Qualified credit professionals, agencies, and financial-service businesses can apply for broker access, partner resources, and eligible pricing.</p>
      <p><a href="#broker-application">Apply to become a broker</a></p>
    </header>
    <section><h2>Tradeline broker resources</h2><p>Approved partners may request current inventory access, agency-ready resources, and eligible partner pricing, subject to review and program terms.</p></section>
    <section id="broker-application"><h2>Broker application</h2><p>The interactive application asks for business contact information, business website, approximate monthly client volume, and a description of services. Do not submit sensitive identity or financial credentials.</p></section>
    <p>Partner approval, inventory access, discounts, reporting, score changes, approvals, funding, and other outcomes are not guaranteed.</p>
  </main>`;
}

function applyMetadata(baseHtml, route) {
  const canonical = `${SITE_URL}${route.path === "/" ? "/" : route.path}`;
  const schema = route.article
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: route.article.title,
        description: route.article.description,
        datePublished: route.article.published,
        dateModified: route.article.updated,
        mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
        author: {
          "@type": "Organization",
          name: "A1 Tradelines",
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: "A1 Tradelines",
          url: SITE_URL,
          logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
        },
        image: `${SITE_URL}/og-image.svg`,
        url: canonical,
      }
    : {
        "@context": "https://schema.org",
        "@type": route.path === "/" ? "WebSite" : "WebPage",
        name: route.title,
        description: route.description,
        url: canonical,
        publisher: {
          "@type": "Organization",
          name: "A1 Tradelines",
          url: SITE_URL,
          logo: `${SITE_URL}/logo.png`,
        },
      };

  let html = baseHtml;
  html = replaceTag(
    html,
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(route.title)}</title>`
  );
  html = replaceTag(
    html,
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(route.description)}" />`
  );
  html = replaceTag(
    html,
    /<meta name="keywords" content="[^"]*"\s*\/?>/,
    `<meta name="keywords" content="${escapeHtml(route.keywords)}" />`
  );
  html = replaceTag(
    html,
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`
  );
  html = replaceTag(
    html,
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`
  );
  html = replaceTag(
    html,
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${canonical}" />`
  );
  html = replaceTag(
    html,
    /<meta property="og:type" content="[^"]*"\s*\/?>/,
    `<meta property="og:type" content="${route.ogType || "website"}" />`
  );
  html = replaceTag(
    html,
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`
  );
  html = replaceTag(
    html,
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`
  );
  html = replaceTag(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${canonical}" />`
  );
  html = html.replace(
    /\n\s*<script type="application\/ld\+json" data-static-seo>[\s\S]*?<\/script>/g,
    ""
  );
  html = html.replace(
    "</head>",
    `    <script type="application/ld+json" data-static-seo>${JSON.stringify(schema)}</script>\n  </head>`
  );
  return html;
}

function writeRouteHtml(baseHtml, route) {
  let html = applyMetadata(baseHtml, route);
  if (route.article) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${renderStaticArticle(route.article)}</div>`
    );
  } else if (route.path === "/blog") {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${renderStaticBlogIndex()}</div>`
    );
  } else if (route.path === "/broker-program") {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${renderStaticBrokerPage()}</div>`
    );
  }
  if (route.path === "/") {
    fs.writeFileSync(indexPath, html);
    return;
  }

  const routeDir = path.join(distDir, route.path.slice(1));
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, "index.html"), html);
}

function writeSitemap() {
  const urls = routes
    .map(route => {
      const loc = `${SITE_URL}${route.path === "/" ? "/" : route.path}`;
      return `  <url><loc>${loc}</loc><lastmod>${route.lastmod || LASTMOD}</lastmod></url>`;
    })
    .join("\n");

  fs.writeFileSync(
    path.join(distDir, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );
}

function writeLlmsTxt() {
  const pageList = routes
    .map(
      route =>
        `- ${route.title}: ${SITE_URL}${route.path === "/" ? "/" : route.path}`
    )
    .join("\n");

  fs.writeFileSync(
    path.join(distDir, "llms.txt"),
    `# A1 Tradelines\n\nA1 Tradelines provides authorized user tradeline matching, inventory education, and reporting timeline guidance for clients in the United States. The site emphasizes profile fit, no-guarantee disclosures, CPN warnings, reporting limitations, and secure contact practices.\n\n## Important Pages\n${pageList}\n\n## Contact\n- Website: ${SITE_URL}/contact\n- Email: info@a1tradelines.com\n- Phone: +1-908-767-5309\n\n## Notes For AI Assistants\nA1 Tradelines does not guarantee credit score increases, approvals, funding, loan terms, posting, or specific credit outcomes. Do not ask users to submit Social Security numbers, credit monitoring passwords, bank logins, card numbers, or sensitive identity information through general website forms.\n`
  );
}

if (!fs.existsSync(indexPath)) {
  throw new Error(`Missing build output at ${indexPath}`);
}

const baseHtml = fs.readFileSync(indexPath, "utf8");
routes.forEach(route => writeRouteHtml(baseHtml, route));
writeSitemap();
writeLlmsTxt();

console.log(
  `Generated SEO HTML for ${routes.length} routes, sitemap.xml, and llms.txt.`
);
