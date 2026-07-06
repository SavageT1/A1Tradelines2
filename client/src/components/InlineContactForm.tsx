/*
 * InlineContactForm.tsx — Reusable contact form that posts to /api/contact → HubSpot.
 * Drop it anywhere as a self-contained section.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

interface InlineContactFormProps {
  heading?: string;
  subheading?: string;
  defaultSubject?: string;
  sectionId?: string;
}

export default function InlineContactForm({
  heading = "Get Your Free Credit Strategy Consultation",
  subheading = "Fill out the form and a strategist will reach out within 24 hours.",
  defaultSubject = "Tradeline Inquiry",
  sectionId,
}: InlineContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: defaultSubject,
    message: "",
  });

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
        setError(result.message || "Failed to submit. Please try again.");
      }
    } catch {
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id={sectionId} className="py-20 sm:py-28 bg-white/[0.02] border-t border-white/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="glass-panel rounded-3xl p-8 sm:p-12 neon-border-glow">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-display font-extrabold">Message Sent!</h3>
                <p className="text-white/50 max-w-sm mx-auto">
                  Thanks! A member of our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", phone: "", subject: defaultSubject, message: "" });
                    setError(null);
                  }}
                  className="mt-4 text-neon text-sm font-bold hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold mb-2">{heading}</h2>
                  <p className="text-sm text-white/40">{subheading}</p>
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
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/40 uppercase tracking-widest">Message</label>
                    <textarea
                      required
                      rows={4}
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
                    {loading ? "Submitting..." : "Get My Free Consultation"}{" "}
                    {!loading && <Send className="w-4 h-4" />}
                  </motion.button>
                </form>
              </>
            )}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
