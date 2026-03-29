/*
 * Contact.tsx — Contact page
 * Neon Pulse Design: beautiful contact form with glassmorphism, social links.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, ArrowRight, AlertCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/SEOHead";

const CONTACT_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/contact-hero-GATXTizuF7kKCUe38nynTh.webp";

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Phone",
    value: "(908) 767-5309",
    href: "tel:+19087675309",
    description: "Mon-Fri, 9am-6pm EST",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@a1tradelines.com",
    href: "mailto:info@a1tradelines.com",
    description: "We respond within 24 hours",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "522 N Central Ave #831",
    href: "https://maps.google.com/?q=522+N+Central+Ave+%23831+Phoenix+AZ+85004",
    description: "Phoenix, Arizona 85004",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon - Fri, 9am - 6pm",
    href: null,
    description: "Eastern Standard Time",
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Split name into first and last name
      const nameParts = form.name.trim().split(" ");
      const firstname = nameParts[0] || "";
      const lastname = nameParts.slice(1).join(" ") || "";

      // ✅ Submit to backend proxy (fixes CORS issue)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname,
          lastname,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.message || "Failed to submit form");
      }
    } catch (err) {
      setError("Failed to submit form. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SEOHead
        title="Contact A1 TradeLines — Get Your Free Credit Strategy Consultation"
        description="Get in touch with our credit strategy team. Schedule a free consultation, ask questions, or learn how tradelines can help your credit profile improvement goals."
        canonical="https://a1tradelines.com/contact"
        keywords="contact A1 Tradelines, credit consultation, tradeline advice, credit strategy"
      />
      <PageHero
        title="Contact Us"
        subtitle="Get in touch with our credit strategy team"
        backgroundImage={CONTACT_HERO}
      />

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <SectionReveal direction="left">
                <div className="space-y-4">
                  <h2 className="text-2xl font-display font-extrabold">
                    Let's <span className="text-neon">Talk</span>
                  </h2>
                  <p className="text-white/40 leading-relaxed">
                    Whether you have questions about tradelines, need help choosing the right strategy, or want to schedule a free consultation — we're here to help.
                  </p>
                </div>
              </SectionReveal>

              <div className="space-y-4">
                {CONTACT_INFO.map((info, i) => (
                  <SectionReveal key={info.label} delay={i * 0.1} direction="left">
                    <motion.div
                      whileHover={{ x: 5, borderColor: "rgba(0,255,127,0.3)" }}
                      className="glass-panel rounded-xl p-5 flex items-start gap-4 transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-neon/10 rounded-lg flex items-center justify-center shrink-0">
                        <info.icon className="w-5 h-5 text-neon" />
                      </div>
                      <div>
                        <p className="text-xs text-white/30 uppercase tracking-widest mb-1">{info.label}</p>
                        {info.href ? (
                          <a href={info.href} className="font-bold text-white hover:text-neon transition-colors">
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-bold text-white">{info.value}</p>
                        )}
                        <p className="text-xs text-white/30 mt-0.5">{info.description}</p>
                      </div>
                    </motion.div>
                  </SectionReveal>
                ))}
              </div>

              {/* Social */}
              <SectionReveal direction="left" delay={0.3}>
                <div className="space-y-3">
                  <p className="text-xs text-white/30 uppercase tracking-widest font-bold">Follow Us</p>
                  <div className="flex gap-3">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-neon hover:border-neon/30 transition-all"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-neon hover:border-neon/30 transition-all"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                  </div>
                </div>
              </SectionReveal>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <SectionReveal direction="right">
                <div className="glass-panel rounded-2xl p-7 sm:p-10 neon-border-glow">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12 space-y-4"
                    >
                      <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                      </div>
                      <h3 className="text-2xl font-display font-extrabold">Message Sent!</h3>
                      <p className="text-white/50 max-w-sm mx-auto">
                        Thank you for reaching out. A member of our team will get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setForm({ name: "", email: "", phone: "", subject: "", message: "" });
                          setError(null);
                        }}
                        className="mt-4 text-neon text-sm font-bold hover:underline"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      <div className="mb-8">
                        <h3 className="text-xl font-display font-extrabold mb-2">Send Us a Message</h3>
                        <p className="text-sm text-white/40">Fill out the form below and we'll get back to you promptly.</p>
                      </div>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-5 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3"
                        >
                          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                          <p className="text-sm text-red-300">{error}</p>
                        </motion.div>
                      )}
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-white/40 uppercase tracking-widest">Full Name</label>
                            <input
                              required
                              type="text"
                              value={form.name}
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                              className="w-full bg-black/30 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-neon/50 transition-all"
                              placeholder="John Doe"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-white/40 uppercase tracking-widest">Email</label>
                            <input
                              required
                              type="email"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              className="w-full bg-black/30 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-neon/50 transition-all"
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-white/40 uppercase tracking-widest">Phone</label>
                            <input
                              type="tel"
                              value={form.phone}
                              onChange={(e) => setForm({ ...form, phone: e.target.value })}
                              className="w-full bg-black/30 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-neon/50 transition-all"
                              placeholder="(555) 123-4567"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-white/40 uppercase tracking-widest">Subject</label>
                            <input
                              required
                              type="text"
                              value={form.subject}
                              onChange={(e) => setForm({ ...form, subject: e.target.value })}
                              className="w-full bg-black/30 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-neon/50 transition-all"
                              placeholder="Tradeline inquiry"
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-white/40 uppercase tracking-widest">Message</label>
                          <textarea
                            required
                            rows={5}
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            className="w-full bg-black/30 border border-white/10 rounded-lg py-3 px-4 text-sm outline-none focus:border-neon/50 transition-all resize-none"
                            placeholder="Tell us about your credit goals..."
                          />
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          type="submit"
                          disabled={loading}
                          className="btn-neon w-full bg-neon text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-neon/20 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? "Submitting..." : "Get My Free Consultation"} {!loading && <Send className="w-4 h-4" />}
                        </motion.button>
                      </form>
                    </>
                  )}
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 sm:py-28 bg-emerald-500/5 border-t border-emerald-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel rounded-3xl p-8 sm:p-12 border-l-4 border-emerald-500 bg-emerald-500/5 text-center"
            >
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight mb-4">
                100% <span className="text-emerald-400">Perfect Payment History</span>
              </h2>
              <p className="text-white/70 leading-relaxed text-lg max-w-2xl mx-auto mb-6">
                Every tradeline comes with a <span className="font-bold text-white">$0 balance</span> and <span className="font-bold text-white">100% perfect payment history</span>. We guarantee it. If it doesn't post, we make it right — money-back guarantee or replacement at no cost.
              </p>
              <a href="/faq">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 font-bold rounded-xl hover:bg-emerald-500/30 transition-all"
                >
                  Learn About Our Guarantee <ArrowRight className="w-4 h-4" />
                </motion.button>
              </a>
            </motion.div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}   
