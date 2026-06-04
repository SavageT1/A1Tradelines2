import { Link } from "wouter";
import { AlertTriangle, CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/SEOHead";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/about-hero-SHHrLgGBeyCspmG2izuVnT.webp";

const faqs = [
  {
    question: "What is non-posting?",
    answer: "Non-posting means an authorized user tradeline does not appear on the expected credit report after the stated reporting window. Posting depends on card issuer reporting, bureau processing, account status, and other third-party factors outside A1 Tradelines' control.",
  },
  {
    question: "Does A1 Tradelines guarantee posting?",
    answer: "No. A1 Tradelines does not guarantee posting, credit score increases, lender approvals, funding, or any specific credit outcome. Any available review option depends on the applicable product terms and supporting documentation.",
  },
  {
    question: "What proof may be needed for a non-posting review?",
    answer: "A1 may request current credit report screenshots or documentation showing the relevant bureau, report date, and that the tradeline did not appear after the applicable reporting window. Do not send Social Security numbers, full account numbers, or passwords.",
  },
];

const reviewSteps = [
  "Wait until the applicable posting window has passed.",
  "Check all relevant credit reports or monitoring services for the expected account.",
  "Contact A1 Tradelines with your order details and reporting concern.",
  "Provide requested proof with sensitive identity details redacted.",
  "A1 will review available options under the applicable purchase terms.",
];

export default function NonPostingPolicy() {
  const schema = [
    generateFAQSchema(faqs),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://a1tradelines.com/" },
      { name: "Non-Posting Policy", url: "https://a1tradelines.com/non-posting-policy" },
    ]),
  ];

  return (
    <div>
      <SEOHead
        title="Non-Posting & Refund Policy | A1 Tradelines"
        description="Review A1 Tradelines' non-posting policy, reporting limitations, documentation expectations, and no-guarantee disclosures for authorized user tradelines."
        canonical="https://a1tradelines.com/non-posting-policy"
        keywords="tradeline non-posting policy, tradeline refund policy, authorized user tradeline posting, tradeline did not post"
        schema={schema}
      />
      <PageHero
        title="Non-Posting & Refund Policy"
        subtitle="Clear expectations for authorized user tradeline reporting, documentation, review timelines, and limitations"
        backgroundImage={HERO_IMAGE}
      />

      <section className="site-section">
        <div className="site-container-narrow space-y-8">
          <SectionReveal>
            <div className="content-card border-neon/20 bg-neon/10">
              <div className="flex gap-4 items-start">
                <ShieldCheck className="w-7 h-7 text-neon shrink-0 mt-1" />
                <div>
                  <h2 className="text-left text-white mb-3">Important No-Guarantee Notice</h2>
                  <p className="text-white/75 leading-relaxed">
                    Authorized user tradeline posting is not guaranteed. A1 Tradelines does not guarantee credit score increases, lender approvals, funding, loan terms, mortgage approval, business credit approval, or any specific credit outcome. Reporting depends on issuer behavior, credit bureau processing, account status, and scoring/lender treatment.
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="content-card">
              <h2 className="section-title text-left">What Counts as a Non-Posting Review?</h2>
              <p className="text-white/70 mb-4">
                A non-posting review may apply when an authorized user tradeline does not appear on the relevant credit report after the stated reporting window and after any documentation requirements have been met.
              </p>
              <p className="text-white/70">
                Non-posting review options are controlled by the applicable product terms, vendor rules, reporting timeline, and documentation provided. A review does not automatically mean a refund, replacement, or credit is owed.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="content-card">
              <h2 className="section-title text-left">Review Process</h2>
              <div className="space-y-4">
                {reviewSteps.map((step, index) => (
                  <div key={step} className="flex gap-4 items-start rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="w-8 h-8 rounded-full bg-neon/10 border border-neon/25 flex items-center justify-center text-neon font-bold shrink-0">{index + 1}</div>
                    <p className="text-white/75 text-sm sm:text-base">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="content-card">
              <div className="flex gap-4 items-start">
                <FileText className="w-7 h-7 text-neon shrink-0 mt-1" />
                <div>
                  <h2 className="text-left text-white mb-3">Documentation May Be Required</h2>
                  <p className="text-white/70 mb-4">
                    A1 may request documentation showing the bureau reviewed, report date, and missing tradeline after the applicable reporting window. Any screenshots or documents should redact sensitive identity details.
                  </p>
                  <p className="text-white/70">
                    Do not send Social Security numbers, government ID numbers, full account numbers, credit monitoring passwords, banking logins, card numbers, or sensitive identity information through email or general website forms.
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="content-card">
              <div className="flex gap-4 items-start">
                <AlertTriangle className="w-7 h-7 text-neon shrink-0 mt-1" />
                <div>
                  <h2 className="text-left text-white mb-3">What Is Not Covered</h2>
                  <div className="space-y-3">
                    {[
                      "Credit score changes, score decreases, or no score movement.",
                      "Lender decisions, approvals, denials, funding amounts, or loan terms.",
                      "Credit bureau timing delays outside the stated reporting expectations.",
                      "Failure to provide requested documentation or redacted proof.",
                      "Use of CPNs, synthetic identities, inaccurate personal information, or fraudulent applications.",
                    ].map((item) => (
                      <div key={item} className="flex gap-3 items-start">
                        <CheckCircle2 className="w-4 h-4 text-neon shrink-0 mt-1" />
                        <p className="text-white/70 text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="content-card text-center">
              <h2 className="section-title">Need Help With a Reporting Concern?</h2>
              <p className="section-subtitle mb-6">
                Contact A1 with your order details and the reporting concern. Do not include sensitive identity information in the message.
              </p>
              <div className="cta-row">
                <Link href="/contact" className="cta-primary">Contact A1</Link>
                <Link href="/tradeline-assessment" className="cta-secondary">Request Assessment</Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
