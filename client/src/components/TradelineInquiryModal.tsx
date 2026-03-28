import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone as PhoneIcon } from 'lucide-react';
import { submitToHubSpot } from '@/lib/hubspot';

interface TradelineInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  tradeline: {
    name: string;
    creditLimit: string;
    age: string;
    price: string;
  };
}

export default function TradelineInquiryModal({
  isOpen,
  onClose,
  tradeline,
}: TradelineInquiryModalProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSendEmail = () => {
    if (!email || !phone) {
      setError('Please fill in all fields');
      return;
    }

    const subject = `Inquiry: ${tradeline.name} Tradeline`;
    const body = `I'm interested in the ${tradeline.name} tradeline.\n\nEmail: ${email}\nPhone: ${phone}\n\nTradeline Details:\n- Credit Limit: ${tradeline.creditLimit}\n- Age: ${tradeline.age}\n- Price: ${tradeline.price}`;
    const mailtoLink = `mailto:info@a1tradelines.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    onClose();
  };

  const handleMoreInfo = async () => {
    if (!email || !phone) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await submitToHubSpot({
        email,
        phone,
        message: `Tradeline Inquiry - ${tradeline.name}\nCredit Limit: ${tradeline.creditLimit}\nAge: ${tradeline.age}\nPrice: ${tradeline.price}`,
      });
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setEmail('');
          setPhone('');
        }, 2000);
      } else {
        setError(result.message || 'Failed to submit. Please try again or email us directly.');
      }
    } catch (err) {
      setError('Failed to submit. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="glass-panel rounded-xl p-6 space-y-6 white-glow">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {tradeline.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    Limit: {tradeline.creditLimit} • Age: {tradeline.age}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Success Message */}
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

              {/* Form */}
              {!success && (
                <>
                  <div className="space-y-4">
                    {/* Email Field */}
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

                    {/* Phone Field */}
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

                    {/* Error Message */}
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

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleSendEmail}
                      disabled={loading}
                      className="flex-1 px-4 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Mail size={16} />
                      Send via Email
                    </button>
                    <button
                      onClick={handleMoreInfo}
                      disabled={loading}
                      className="flex-1 px-4 py-2.5 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded-lg text-green-400 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 btn-neon"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          <PhoneIcon size={16} />
                          More Info
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
