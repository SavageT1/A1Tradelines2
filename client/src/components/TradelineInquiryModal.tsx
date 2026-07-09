import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone as PhoneIcon, User, Mail } from 'lucide-react';
import { submitToHubSpot } from '@/lib/hubspot';
import type { TradelineItem } from '@/services/tradelineApi';

interface TradelineInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  tradeline: TradelineItem | null;
}

const formatCurrency = (value: number) =>
  value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

const getTradelineSummary = (tradeline: TradelineItem | null) => {
  if (!tradeline) {
    return {
      bank: 'Selected Tradeline',
      creditLimit: 'TBD',
      age: 'TBD',
      price: 'TBD',
      reportsFor: 'TBD',
    };
  }

  const cycles = tradeline.cycles || 1;

  return {
    bank: tradeline.bank,
    creditLimit: formatCurrency(tradeline.creditLimit),
    age: `${tradeline.ageYears} year${tradeline.ageYears === 1 ? '' : 's'}`,
    price: `${formatCurrency(tradeline.price)} total`,
    reportsFor: `${cycles} month${cycles === 1 ? '' : 's'}`,
  };
};

export default function TradelineInquiryModal({
  isOpen,
  onClose,
  tradeline,
}: TradelineInquiryModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const summary = getTradelineSummary(tradeline);

  const handleSubmit = async () => {
    if (!name || !email || !phone) {
      setError('Please fill in your name, email, and phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const [firstname, ...rest] = name.trim().split(/\s+/);
      const lastname = rest.join(' ');
      const result = await submitToHubSpot({
        firstname,
        lastname,
        email,
        phone,
        subject: `Inquiry: ${summary.bank} Tradeline`,
        message: `Tradeline Inquiry - ${summary.bank}\nCredit Limit: ${summary.creditLimit}\nAge: ${summary.age}\nReports For: ${summary.reportsFor}\nPrice: ${summary.price}`,
      });

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setName('');
          setEmail('');
          setPhone('');
        }, 2000);
      } else {
        setError(result.message || 'Failed to submit. Please try again.');
      }
    } catch {
      setError('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 px-4"
          >
            <div className="glass-panel rounded-xl p-6 space-y-6 white-glow">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{summary.bank}</h3>
                  <p className="text-sm text-gray-400">
                    Limit: {summary.creditLimit} • Age: {summary.age}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Reports for {summary.reportsFor} • {summary.price}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 text-center"
                >
                  <p className="text-green-400 text-sm font-medium">
                    ✓ Thank you! We'll be in touch soon.
                  </p>
                </motion.div>
              )}

              {!success && (
                <>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User
                          size={16}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            setError('');
                          }}
                          placeholder="Your name"
                          className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail
                          size={16}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setError('');
                          }}
                          placeholder="your@email.com"
                          className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <PhoneIcon
                          size={16}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            setError('');
                          }}
                          placeholder="(555) 123-4567"
                          className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 transition-all"
                        />
                      </div>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-500/20 border border-red-500/50 rounded-lg p-3"
                      >
                        <p className="text-red-400 text-sm">{error}</p>
                      </motion.div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full px-4 py-2.5 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded-lg text-green-400 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 btn-neon"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <PhoneIcon size={16} />
                          Check Availability
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
