import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [location] = useLocation();

  // Don't show on contact page — they're already there
  const isContactPage = location === "/contact";

  useEffect(() => {
    if (isContactPage || dismissed) return;
    const timer = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(timer);
  }, [isContactPage, dismissed]);

  useEffect(() => {
    if (isContactPage) setVisible(false);
  }, [isContactPage]);

  if (isContactPage || dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 80, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="relative glass-panel rounded-2xl p-4 shadow-2xl shadow-neon/20 border border-neon/30 max-w-xs">
            <button
              onClick={() => setDismissed(true)}
              className="absolute top-2 right-2 text-white/30 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-3 pr-4">
              <div className="w-10 h-10 bg-neon/10 rounded-xl flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-neon" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-white">Free Credit Consultation</p>
                <p className="text-xs text-white/50">Talk to a strategist — no obligation.</p>
              </div>
            </div>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-3 w-full bg-neon text-black font-bold py-2.5 rounded-xl text-sm btn-neon shadow-lg shadow-neon/30"
              >
                Get My Free Consultation
              </motion.button>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
