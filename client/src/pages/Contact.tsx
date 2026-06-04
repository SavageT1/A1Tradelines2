/*
 * Contact.tsx — Contact page
 * Neon Pulse Design: contact form with glassmorphism and direct contact links.
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Mail, Phone, Send, Clock, AlertCircle, ShieldCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/SEOHead";

const CONTACT_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/contact-hero-GATXTizuF7kKCUe38nynTh.webp";

const CONTACT_INFO = [
  { icon: Phone, label: "Phone", value: "(908) 767-5309", href: "tel:+19087675309", description: "Mon-Fri, 9am-6pm EST" },
  { icon: Mail, label: "Email", value: "info@a1tradelines.com", href: "mailto:info@a1tradelines.com", description: "We respond within 24 hours" },
  { icon: Clock, label: "Business Hours", value: "Mon - Fri, 9am - 6pm", href: null, description: "Eastern Standard Time" },
];

export default function Contact() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const nameParts = form.name.trim().split(" ");
      const firstname = nameParts[0] || "";
      const lastname = nameParts.slice(1).join(" ") || "";
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, email: form.email, phone: form.phone, subject: form.subject, message: form.message }),
      });
      const result = await response.json();
      if (result.success) setLocation("/thank-you");
      else setError(result.message || "Failed to submit form");
    } catch (err) {
      setError("Failed to submit form. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SEOHead title="Contact A1 Tradelines | Authorized User Tradeline Consultation" description="Contact A1 Tradelines to ask questions about authorized user tradeline options, reporting timelines, and profile-based matching. No credit outcome is guaranteed." canonical="https://a1tradelines.com/contact" keywords="contact A1 Tradelines, authorized user tradelines, tradeline consultation, credit profile strategy" />
      <PageHero title="Contact Us" subtitle="Ask about authorized user tradeline options and profile-based matching" backgroundImage={CONTACT_HERO} />

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            <div className="lg:col-span-2 space-y-8">
              <SectionReveal direction="left">
                <div className="space-y-4">
                  <h2 className="text-2xl font-display font-extrabold">Let's <span className="text-neon">Talk</span></h2>
                  <p className="text-white/70 leading-relaxed">Have questions about authorized user tradelines, reporting timelines, or profile-based matching? Send a message and our team will respond.</p>
                </div>
              </SectionReveal>
              <div className="space-y-4">
                {CONTACT_INFO.map((info, i) => (
                  <SectionReveal key={info.label} delay={i * 0.1} direction="left">
                    <motion.div whileHover={{ x: 5, borderColor: "rgba(0,255,127,0.3)" }} className="glass-panel rounded-xl p-5 flex items-start gap-4 transition-all duration-300">
                      <div className="w-10 h-10 bg-neon/10 rounded-lg flex items-center justify-center shrink-0"><info.icon className="w-5 h-5 text-neon" /></div>
                      <div>
                        <p className="text-xs text-white/55 uppercase tracking-widest mb-1">{info.label}</p>
                        {info.href ? <a href={info.href} className="font-bold text-white hover:text-neon transition-colors">{info.value}</a> : <p className="font-bold text-white">{info.value}</p>}
                        <p className="text-xs text-white/55 mt-0.5">{info.description}</p>
                      </div>
                    </motion.div>
                  </SectionReveal>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              <SectionReveal direction="right">
                <div className="glass-panel rounded-2xl p-7 sm:p-10 neon-border-glow">
                  <div className="mb-8">
                    <h3 className="text-xl font-display font-extrabold mb-2">Send Us a Message</h3>
                    <p className="text-sm text-white/70">Fill out the form below and we'll get back to you promptly.</p>
                  </div>
                  <div className="mb-5 p-4 rounded-xl border border-neon/20 bg-neon/10 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-neon shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-white/75 leading-relaxed">Do not submit Social Security numbers, government ID numbers, credit monitoring passwords, banking logins, card numbers, or sensitive identity information through this form.</p>
                  </div>
                  {error && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" /><p className="text-sm text-red-300">{error}</p>
                    </motion.div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5"><label className="text-xs font-medium text-white/60 uppercase tracking-widest">Full Name</label><input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-black/30 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-neon/50 transition-all" placeholder="John Doe" /></div>
                      <div className="space-y-1.5"><label className="text-xs font-medium text-white/60 uppercase tracking-widest">Email</label><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-black/30 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-neon/50 transition-all" placeholder="john@example.com" /></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5"><label className="text-xs font-medium text-white/60 uppercase tracking-widest">Phone</label><input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-black/30 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-neon/50 transition-all" placeholder="(555) 123-4567" /></div>
                      <div className="space-y-1.5"><label className="text-xs font-medium text-white/60 uppercase tracking-widest">Subject</label><input required type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full bg-black/30 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-neon/50 transition-all" placeholder="Tradeline inquiry" /></div>
                    </div>
                    <div className="space-y-1.5"><label className="text-xs font-medium text-white/60 uppercase tracking-widest">Message</label><textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full bg-black/30 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-neon/50 transition-all resize-none" placeholder="Tell us about your tradeline questions or credit profile goals. Do not include sensitive identity information." /></div>
                    <p className="text-[11px] text-white/45 leading-relaxed">By submitting this form, you agree to be contacted by A1 Tradelines by phone, text, or email about your inquiry. Message and data rates may apply. Consent is not a condition of purchase. Results are not guaranteed.</p>
                    <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" disabled={loading} className="btn-neon w-full bg-neon text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-neon/20 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                      {loading ? "Submitting..." : "Request Consultation"} {!loading && <Send className="w-4 h-4" />}
                    </motion.button>
                  </form>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
