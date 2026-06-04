import { useState } from "react";
import { useLocation } from "wouter";
import { AlertCircle, ShieldCheck, Send } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/SEOHead";
import { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/lib/seo";
import { trackAssessmentStart, trackAssessmentSubmitted } from "@/lib/analytics";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/contact-hero-GATXTizuF7kKCUe38nynTh.webp";

const faqs = [
  {
    question: "What is a tradeline assessment?",
    answer: "A tradeline assessment helps A1 Tradelines understand your goal, timeline, budget, and general profile factors before discussing authorized user tradeline options. It does not guarantee a credit score increase, approval, or funding result.",
  },
  {
    question: "Should I submit my Social Security number?",
    answer: "No. Do not submit Social Security numbers, government ID numbers, credit monitoring passwords, banking logins, card numbers, or sensitive identity information through this form.",
  },
  {
    question: "Will the assessment guarantee the best tradeline?",
    answer: "No. The assessment is for education and matching support only. Reporting, scoring, and lender treatment can vary by bank, bureau, scoring model, lender, and individual profile.",
  },
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  scoreRange: "",
  goal: "",
  timeline: "",
  budget: "",
  utilization: "",
  openAccounts: "",
  negativeItems: "",
  preferredContact: "",
  notes: "",
};

export default function TradelineAssessment() {
  const [, setLocation] = useLocation();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const schema = [
    generateServiceSchema(),
    generateFAQSchema(faqs),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://a1tradelines.com/" },
      { name: "Tradeline Assessment", url: "https://a1tradelines.com/tradeline-assessment" },
    ]),
  ];

  const updateField = (key: keyof typeof form, value: string) => {
    if (!started) {
      setStarted(true);
      trackAssessmentStart();
    }
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const nameParts = form.name.trim().split(" ");
      const firstname = nameParts[0] || "";
      const lastname = nameParts.slice(1).join(" ") || "";
      const assessmentSummary = [
        "Tradeline Assessment Request",
        `Goal: ${form.goal}`,
        `Credit score range: ${form.scoreRange}`,
        `Timeline: ${form.timeline}`,
        `Budget: ${form.budget}`,
        `Utilization: ${form.utilization}`,
        `Open credit card accounts: ${form.openAccounts}`,
        `Negative items: ${form.negativeItems}`,
        `Preferred contact method: ${form.preferredContact}`,
        `Notes: ${form.notes || "None provided"}`,
        "Sensitive-info reminder: Client was instructed not to submit SSNs, government IDs, credit monitoring passwords, banking logins, card numbers, or sensitive identity information through the form.",
      ].join("\n");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname,
          lastname,
          email: form.email,
          phone: form.phone,
          subject: "Tradeline Assessment Request",
          message: assessmentSummary,
        }),
      });

      const result = await response.json();

      if (result.success) {
        trackAssessmentSubmitted();
        setLocation("/thank-you");
      } else {
        setError(result.message || "Failed to submit assessment");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to submit assessment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SEOHead
        title="Tradeline Assessment | Get Matched With Authorized User Tradelines"
        description="Request a tradeline assessment from A1 Tradelines. Share your goals, timeline, budget, utilization range, and profile factors for authorized user tradeline matching support."
        canonical="https://a1tradelines.com/tradeline-assessment"
        keywords="tradeline assessment, authorized user tradeline match, tradeline consultation, buy tradelines, credit profile assessment"
        schema={schema}
      />
      <PageHero
        title="Tradeline Assessment"
        subtitle="Get profile-based matching support before comparing authorized user tradeline options"
        backgroundImage={HERO_IMAGE}
      />

      <section className="site-section">
        <div className="site-container-narrow">
          <SectionReveal>
            <div className="content-card mb-8 flex gap-4 items-start border-neon/20 bg-neon/10">
              <ShieldCheck className="w-7 h-7 text-neon shrink-0 mt-1" />
              <div>
                <h2 className="text-left text-white mb-2">Secure Information Notice</h2>
                <p className="text-white/75 text-sm leading-relaxed">
                  Do not submit Social Security numbers, government ID numbers, credit monitoring passwords, banking logins, card numbers, or sensitive identity information through this form.
                </p>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal>
            <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 sm:p-10 neon-border-glow space-y-6">
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name" required value={form.name} onChange={(v) => updateField("name", v)} placeholder="John Doe" />
                <Field label="Email" required type="email" value={form.email} onChange={(v) => updateField("email", v)} placeholder="john@example.com" />
                <Field label="Phone" type="tel" value={form.phone} onChange={(v) => updateField("phone", v)} placeholder="(555) 123-4567" />
                <Select label="Preferred Contact" required value={form.preferredContact} onChange={(v) => updateField("preferredContact", v)} options={["Phone", "Text", "Email"]} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select label="Credit Score Range" required value={form.scoreRange} onChange={(v) => updateField("scoreRange", v)} options={["Under 500", "500-579", "580-619", "620-659", "660-699", "700+", "Not sure"]} />
                <Select label="Main Goal" required value={form.goal} onChange={(v) => updateField("goal", v)} options={["Mortgage preparation", "Auto loan", "Credit cards", "Business funding", "General credit profile", "Not sure"]} />
                <Select label="Timeline" required value={form.timeline} onChange={(v) => updateField("timeline", v)} options={["ASAP", "Within 30 days", "1-3 months", "3+ months", "Just researching"]} />
                <Select label="Budget Range" required value={form.budget} onChange={(v) => updateField("budget", v)} options={["Under $500", "$500-$1,000", "$1,000-$2,000", "$2,000-$5,000", "$5,000+", "Not sure"]} />
                <Select label="Current Utilization" required value={form.utilization} onChange={(v) => updateField("utilization", v)} options={["0-10%", "11-30%", "31-50%", "51-80%", "81%+", "Not sure"]} />
                <Select label="Open Credit Card Accounts" required value={form.openAccounts} onChange={(v) => updateField("openAccounts", v)} options={["0", "1-2", "3-5", "6+", "Not sure"]} />
              </div>

              <Select label="Any Late Payments, Collections, Charge-Offs, or Derogatory Items?" required value={form.negativeItems} onChange={(v) => updateField("negativeItems", v)} options={["No", "Yes", "Not sure", "Prefer to discuss"]} />

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/60 uppercase tracking-widest">Additional Notes</label>
                <textarea rows={5} value={form.notes} onChange={(e) => updateField("notes", e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-neon/50 transition-all resize-none" placeholder="Tell us anything useful about your goal or timeline. Do not include sensitive identity information." />
              </div>

              <p className="text-[11px] text-white/45 leading-relaxed rounded-xl border border-white/10 bg-white/[0.03] p-4">
                By submitting this form, you agree to be contacted by A1 Tradelines by phone, text, or email about your inquiry. Message and data rates may apply. Consent is not a condition of purchase. A1 Tradelines does not guarantee credit score increases, approvals, funding, loan terms, posting, or any specific credit outcome.
              </p>

              <button type="submit" disabled={loading} className="btn-neon w-full bg-neon text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-neon/20 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? "Submitting..." : "Submit Assessment"} {!loading && <Send className="w-4 h-4" />}
              </button>
            </form>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", required = false }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; type?: string; required?: boolean }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-white/60 uppercase tracking-widest">{label}</label>
      <input required={required} type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-neon/50 transition-all" placeholder={placeholder} />
    </div>
  );
}

function Select({ label, value, onChange, options, required = false }: { label: string; value: string; onChange: (value: string) => void; options: string[]; required?: boolean }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-white/60 uppercase tracking-widest">{label}</label>
      <select required={required} value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-neon/50 transition-all">
        <option value="">Select one</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  );
}
