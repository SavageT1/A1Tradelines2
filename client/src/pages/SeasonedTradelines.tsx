import { Link } from "wouter";
import PageHero from "@/components/PageHero";
import InlineContactForm from "@/components/InlineContactForm";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/SEOHead";
import { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/lib/seo";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/about-hero-SHHrLgGBeyCspmG2izuVnT.webp";

const faqs = [
  { question: "What is a seasoned tradeline?", answer: "A seasoned tradeline is generally an account with established age and positive payment history. Older accounts may be attractive, but age alone does not guarantee a credit score increase or approval." },
  { question: "Are seasoned tradelines better than newer tradelines?", answer: "Not always. Age is one factor, but profile fit also depends on credit limit, reported balance, bank, timing, cycles, and your current credit file." },
  { question: "Can I buy seasoned authorized user tradelines?", answer: "You can compare available authorized user tradelines by account age in A1's inventory. Availability changes and outcomes are not guaranteed." },
  { question: "How do I choose the right seasoned tradeline?", answer: "Start with account age, then compare limit, reported balance, bank, and the timing of your statement cycle. The best fit depends on your current profile and goals." },
  { question: "Should I use the contact form if I need help?", answer: "Yes. The contact form below is the fastest way to ask about a specific profile or get help choosing between inventory options." },
];

export default function SeasonedTradelines() {
  const schema = [generateServiceSchema(), generateFAQSchema(faqs), generateBreadcrumbSchema([
    { name: "Home", url: "https://a1tradelines.com/" },
    { name: "Seasoned Tradelines", url: "https://a1tradelines.com/seasoned-tradelines" },
  ])];

  return (
    <div>
      <SEOHead
        title="Seasoned Tradelines | Account Age and Authorized User Tradelines"
        description="Learn what seasoned tradelines are, how account age may matter, and how to compare authorized user tradelines by age, limit, balance, timing, and profile fit."
        canonical="https://a1tradelines.com/seasoned-tradelines"
        keywords="seasoned tradelines, aged tradelines, authorized user tradelines, account age, buy seasoned tradelines"
        schema={schema}
      />
      <PageHero
        title="Seasoned Tradelines"
        subtitle="Understand why account age can matter and why it should never be the only factor you compare"
        backgroundImage={HERO_IMAGE}
      />
      <section className="site-section">
        <div className="site-container-narrow">
          <SectionReveal>
            <div className="content-card">
              <h2 className="section-title text-left">What Makes a Tradeline Seasoned?</h2>
              <p className="text-white/70 mb-4">
                A seasoned tradeline usually refers to an account with established age and positive payment history. Buyers often look at seasoned authorized user tradelines because account age may affect some credit profile factors if the account reports.
              </p>
              <p className="text-white/70">
                However, seasoned does not mean guaranteed. Credit bureau reporting, scoring model treatment, lender review, and your full profile all matter. That is why the best match balances age with limit, balance, and timing.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="content-card mt-8">
              <h2 className="section-title text-left">Age Is Only One Factor</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Does the age actually report?",
                    body: "A tradeline only helps if the account is set up to report on the cycle you are expecting. Older is not useful if the timing misses your target date.",
                  },
                  {
                    title: "What is the reported balance?",
                    body: "A low or zero balance is often a cleaner fit than a high balance, especially when you are comparing accounts that already have solid age.",
                  },
                  {
                    title: "How much credit is on the line?",
                    body: "Credit limit matters because it changes the profile picture alongside age. A smaller limit can be less useful than a stronger account with the same age.",
                  },
                  {
                    title: "Which bank and cycle are involved?",
                    body: "Different banks and statement cycles can affect when the tradeline shows up and how neatly it fits your reporting window.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <p className="font-bold text-white mb-2">{item.title}</p>
                    <p className="text-white/65 text-sm">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="content-card mt-8">
              <h2 className="section-title text-left">How To Compare Options</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Account age",
                    body: "Older accounts can matter, but age should be weighed against the rest of the file.",
                  },
                  {
                    title: "Reporting timing",
                    body: "The statement cycle and posting schedule affect when a tradeline may appear.",
                  },
                  {
                    title: "Balance and limit",
                    body: "Limit and reported balance can change the profile fit more than age alone.",
                  },
                  {
                    title: "Support path",
                    body: "Use the contact form on this page if you want help choosing a more specific match.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <p className="font-bold text-white mb-2">{item.title}</p>
                    <p className="text-white/65 text-sm">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="content-card text-center mt-8">
              <h2 className="section-title">Compare Available Account Ages</h2>
              <p className="section-subtitle mb-6">Filter live inventory by account age and other profile-fit factors.</p>
              <div className="cta-row">
                <Link href="/buy-tradelines" className="cta-primary">Browse Inventory</Link>
                <Link href="/tradeline-buyers-guide" className="cta-secondary">Read Buyer Guide</Link>
                <Link href="/contact" className="cta-secondary">Contact Us</Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
      <InlineContactForm
        heading="Need Help Choosing a Seasoned Tradeline?"
        subheading="Tell us what you are trying to achieve and we can point you toward the right inventory or a better-fit option."
        defaultSubject="Seasoned Tradelines Inquiry"
      />
    </div>
  );
}
