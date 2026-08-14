import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Layers,
  Send,
  ShieldCheck,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import SEOHead from "@/components/SEOHead";
import { trackFormEvent } from "@/lib/analytics";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/seo";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  monthlyClients: "",
  message: "",
};

export default function BrokerProgram() {
  const [, setLocation] = useLocation();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);
  const [started, setStarted] = useState(false);

  const cards = [
    {
      icon: Layers,
      title: "Inventory access",
      text: "Request access to current A1 Tradelines inventory and matching resources.",
    },
    {
      icon: BadgeCheck,
      title: "Partner pricing",
      text: "Eligible tradelines may qualify for partner pricing, subject to approval, availability, and program terms.",
    },
    {
      icon: ShieldCheck,
      title: "Agency-ready support",
      text: "Use practical resources designed for qualified agencies serving their own clients.",
    },
    {
      icon: Building2,
      title: "White-label support",
      text: "Qualified partners may offer eligible A1 resources under their own brand, subject to approval and program terms.",
    },
  ];

  const schema = [
    generateServiceSchema(),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://a1tradelines.com/" },
      {
        name: "Broker Program",
        url: "https://a1tradelines.com/broker-program",
      },
    ]),
  ];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!consent)
      return setError(
        "Please confirm that you agree to be contacted about the broker program."
      );
    setLoading(true);
    setError("");
    const parts = form.name.trim().split(/\s+/);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: parts[0] || "",
          lastname: parts.slice(1).join(" "),
          email: form.email,
          phone: form.phone,
          subject: `Broker Program Application — ${form.company}`,
          message: [
            `Company: ${form.company}`,
            `Website: ${form.website || "Not provided"}`,
            `Approximate clients per month: ${form.monthlyClients || "Not provided"}`,
            `Business details: ${form.message}`,
          ].join("\n"),
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success)
        throw new Error(
          result.message || "Application could not be submitted."
        );
      trackFormEvent("broker_application", "submitted");
      setLocation("/thank-you");
    } catch (submissionError) {
      trackFormEvent("broker_application", "failed");
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Application could not be submitted. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const update =
    (field: keyof typeof form) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm({ ...form, [field]: event.target.value });
  const markStarted = () => {
    if (!started) {
      setStarted(true);
      trackFormEvent("broker_application", "started");
    }
  };

  return (
    <div className="bg-[#f4f5f7] pb-20 pt-32">
      <SEOHead
        title="Tradeline Broker Program & Application | A1 Tradelines"
        description="Apply for the A1 Tradelines broker program. Qualified agencies can request inventory access, white-label support, partner resources, and eligible pricing."
        canonical="https://a1tradelines.com/broker-program"
        keywords="tradeline broker program, tradeline broker application, wholesale tradelines, authorized user tradeline partner"
        schema={schema}
      />

      <section className="border-b border-slate-200 px-5 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-blue-700">
              A1 Partner Program
            </p>
            <h1 className="mt-6 max-w-4xl text-left text-5xl font-black tracking-[-.055em] text-[#12213f] sm:text-7xl">
              Serve more clients with a clearer tradeline workflow.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              Qualified credit professionals, agencies, and financial-service
              businesses can apply for broker access, white-label support,
              partner resources, and eligible pricing.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#broker-application"
                className="inline-flex items-center justify-center gap-3 bg-[#12213f] px-6 py-4 text-sm font-black uppercase tracking-[.1em] text-white hover:bg-blue-700"
              >
                Apply to become a broker <ArrowRight size={18} />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 border border-[#12213f] bg-white px-6 py-4 text-sm font-black uppercase tracking-[.1em] text-[#12213f]"
              >
                Ask a partner question
              </Link>
            </div>
          </div>
          <div className="border border-slate-200 bg-white p-8 shadow-[0_18px_44px_rgba(18,33,63,.08)]">
            <Building2 className="text-blue-700" size={32} />
            <h2 className="mt-7 text-3xl font-black tracking-[-.04em] text-[#12213f]">
              Who should apply?
            </h2>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-700">
              <li>
                Established credit education or financial-service businesses
              </li>
              <li>
                Agencies with a consistent, compliant client-intake process
              </li>
              <li>
                Partners who communicate limitations and never guarantee
                outcomes
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="border border-slate-200 bg-white p-7 shadow-sm"
              >
                <Icon className="text-blue-700" />
                <h2 className="mt-7 text-xl font-bold text-[#12213f]">
                  {title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="broker-application"
        className="scroll-mt-28 px-5 py-10 sm:px-8 lg:px-12"
      >
        <div className="mx-auto grid max-w-7xl overflow-hidden border border-slate-200 bg-white shadow-[0_22px_55px_rgba(18,33,63,.1)] lg:grid-cols-[.72fr_1.28fr]">
          <div className="dark-feature bg-[#12213f] p-8 text-white sm:p-10 lg:p-12">
            <p className="text-xs font-black uppercase tracking-[.16em] text-lime-300">
              Broker application
            </p>
            <h2 className="mt-5 text-4xl font-black tracking-[-.045em] text-white">
              Tell us about your business.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-200">
              Applications are reviewed for fit, operational readiness, and
              alignment with program standards. Submission does not guarantee
              approval or specific pricing.
            </p>
            <div className="mt-8 border-t border-white/20 pt-7 text-xs leading-6 text-slate-300">
              Do not include Social Security numbers, client credit reports,
              government IDs, credit-monitoring passwords, banking credentials,
              or card information.
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            onFocusCapture={markStarted}
            className="p-7 sm:p-10 lg:p-12"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-bold text-[#12213f]">
                Full name
                <input
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={update("name")}
                  className="mt-2 w-full border border-slate-300 bg-white px-4 py-3 font-normal text-[#12213f]"
                />
              </label>
              <label className="text-sm font-bold text-[#12213f]">
                Business name
                <input
                  required
                  autoComplete="organization"
                  value={form.company}
                  onChange={update("company")}
                  className="mt-2 w-full border border-slate-300 bg-white px-4 py-3 font-normal text-[#12213f]"
                />
              </label>
              <label className="text-sm font-bold text-[#12213f]">
                Business email
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={update("email")}
                  className="mt-2 w-full border border-slate-300 bg-white px-4 py-3 font-normal text-[#12213f]"
                />
              </label>
              <label className="text-sm font-bold text-[#12213f]">
                Phone number
                <input
                  required
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  className="mt-2 w-full border border-slate-300 bg-white px-4 py-3 font-normal text-[#12213f]"
                />
              </label>
              <label className="text-sm font-bold text-[#12213f]">
                Business website{" "}
                <span className="font-normal text-slate-500">(optional)</span>
                <input
                  type="url"
                  placeholder="https://"
                  value={form.website}
                  onChange={update("website")}
                  className="mt-2 w-full border border-slate-300 bg-white px-4 py-3 font-normal text-[#12213f]"
                />
              </label>
              <label className="text-sm font-bold text-[#12213f]">
                Approximate clients per month
                <select
                  value={form.monthlyClients}
                  onChange={update("monthlyClients")}
                  className="mt-2 w-full border border-slate-300 bg-white px-4 py-3 font-normal text-[#12213f]"
                >
                  <option value="">Select a range</option>
                  <option>1–10</option>
                  <option>11–25</option>
                  <option>26–50</option>
                  <option>51–100</option>
                  <option>100+</option>
                </select>
              </label>
            </div>
            <label className="mt-5 block text-sm font-bold text-[#12213f]">
              Tell us about your services and what you need from the program
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={update("message")}
                className="mt-2 w-full resize-y border border-slate-300 bg-white px-4 py-3 font-normal text-[#12213f]"
              />
            </label>
            <label className="mt-5 flex items-start gap-3 text-xs leading-6 text-slate-700">
              <input
                required
                type="checkbox"
                checked={consent}
                onChange={event => setConsent(event.target.checked)}
                className="mt-1 h-4 w-4"
              />
              <span>
                I agree that A1 Tradelines may contact me by phone, text, or
                email about this broker application. Message and data rates may
                apply. Consent is not a condition of purchase.
              </span>
            </label>
            {error && (
              <p
                role="alert"
                className="mt-5 border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                {error}
              </p>
            )}
            <button
              disabled={loading}
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-3 bg-[#12213f] px-6 py-4 text-sm font-black uppercase tracking-[.1em] text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Submitting…" : "Submit broker application"}{" "}
              {!loading && <Send size={17} />}
            </button>
            <p className="mt-4 text-[11px] leading-5 text-slate-500">
              By submitting, you acknowledge the{" "}
              <Link href="/privacy-policy" className="underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms-of-service" className="underline">
                Terms of Service
              </Link>
              .
            </p>
          </form>
        </div>
      </section>

      <section className="px-5 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl border-t border-slate-300 pt-8 text-xs leading-6 text-slate-600">
          <p>
            Partner approval, inventory access, discounts, and program terms are
            subject to review and may change. A1 Tradelines does not guarantee
            reporting, credit-score changes, approvals, funding, or any other
            outcome.
          </p>
          <p className="mt-3">
            Need an agency CRM?{" "}
            <a
              href="https://www.gohighlevel.com/?fp_ref=geekinai67"
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="font-bold text-blue-700 underline"
            >
              See GoHighLevel
            </a>
            . A1 Tradelines may receive compensation if you use this affiliate
            link.
          </p>
        </div>
      </section>
    </div>
  );
}
