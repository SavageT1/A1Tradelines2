import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/SEOHead";

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/about-hero-SHHrLgGBeyCspmG2izuVnT.webp";

export default function PrivacyPolicy() {
  return (
    <div>
      <SEOHead
        title="Privacy Policy | A1 Tradelines"
        description="Read the A1 Tradelines Privacy Policy, including how we collect, use, and protect information submitted through our website."
        canonical="https://a1tradelines.com/privacy-policy"
        keywords="A1 Tradelines privacy policy, privacy, data protection"
      />
      <PageHero
        title="Privacy Policy"
        subtitle="How A1 Tradelines handles information submitted through this website"
        backgroundImage={HERO}
      />

      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="glass-panel rounded-2xl p-8 sm:p-12 space-y-8 text-white/60 leading-relaxed">
              <p className="text-sm text-white/40">Last updated: May 26, 2026</p>

              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-white">Information We Collect</h2>
                <p>
                  A1 Tradelines may collect information you submit through our website, including your name, email address, phone number, inquiry details, and information related to your requested authorized user tradeline consultation. We may also collect basic website analytics and technical information such as device type, browser type, pages visited, and referral source.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-white">How We Use Information</h2>
                <p>
                  We use submitted information to respond to inquiries, provide consultation support, evaluate requested tradeline matching options, improve our website, communicate with prospective clients, and maintain business records. We do not sell personal information to advertisers.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-white">Sensitive Information</h2>
                <p>
                  Do not submit Social Security numbers, government identification numbers, banking credentials, credit monitoring logins, or other sensitive identity information through general website forms. Sensitive information should only be provided through secure channels when specifically required for an authorized service process.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-white">Contact by Phone, Text, or Email</h2>
                <p>
                  When you submit a form or request information, you authorize A1 Tradelines to contact you about your inquiry by phone, text, or email. Message and data rates may apply. Consent is not a condition of purchase.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-white">Third-Party Services</h2>
                <p>
                  Our website may use third-party tools for analytics, form submission, customer relationship management, hosting, and related business operations. These providers may process information only as needed to support our business functions.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-white">Contact Us</h2>
                <p>
                  Questions about this Privacy Policy may be sent to info@a1tradelines.com or by contacting A1 Tradelines at (908) 767-5309.
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
