/*
 * TradelineWizard.tsx — Integrated Credit Score Simulator.
 * Dual-path flow:
 *   Path A: Upload credit report → auto-extract contact info → show results + tradeline recs (no lead gate)
 *   Path B: Manual entry → select tradeline → lead capture gate → show results + tradeline recs
 * Neon Pulse Design: neon green accent, glassmorphism panels, dark void bg.
 */
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  CreditCard,
  History,
  ShieldCheck,
  Info,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Mail,
  Phone,
  User,
  HelpCircle,
  UploadCloud,
  Loader2,
  FileText,
  MapPin,
  Star,
  ArrowRight,
} from "lucide-react";
import { Link } from "wouter";

// --- Types ---
interface Tradeline {
  id: string;
  name: string;
  limit: number;
  balance: number;
  ageInMonths: number;
  isSimulated?: boolean;
}

interface CreditProfile {
  totalBalance: number;
  totalLimit: number;
  averageAgeInMonths: number;
  onTimePaymentPercentage: number;
  missedPaymentsRange: string;
  tradelines: Tradeline[];
}

interface SimulationResult {
  originalScore: number;
  newScore: number;
  originalUtilization: number;
  newUtilization: number;
  originalAverageAge: number;
  newAverageAge: number;
  insights: string[];
}

interface ExtractedContact {
  name: string;
  address: string;
  reportDate: string;
}

// --- Constants ---
const MIN_SCORE = 300;
const MAX_SCORE = 850;

const MISSED_PAYMENTS_MAP: Record<string, number> = {
  "0": 100,
  "1-2": 98,
  "2-4": 95,
  "5-10": 90,
  "10+": 80,
};

// --- Helpers ---
const calculateScore = (profile: CreditProfile): number => {
  const { totalBalance, totalLimit, averageAgeInMonths, onTimePaymentPercentage } = profile;
  const paymentPoints = (onTimePaymentPercentage / 100) * 192.5;
  const utilization = totalLimit > 0 ? totalBalance / totalLimit : 1;
  let utilizationPoints = 0;
  if (utilization <= 0.01) utilizationPoints = 165;
  else if (utilization <= 0.1) utilizationPoints = 150;
  else if (utilization <= 0.3) utilizationPoints = 120;
  else if (utilization <= 0.5) utilizationPoints = 80;
  else if (utilization <= 0.7) utilizationPoints = 40;
  else if (utilization <= 0.9) utilizationPoints = 10;
  const agePoints = Math.min((averageAgeInMonths / 240) * 82.5, 82.5);
  const mixPoints = Math.min(profile.tradelines.length * 15, 110);
  const rawScore = MIN_SCORE + paymentPoints + utilizationPoints + agePoints + mixPoints;
  return Math.round(Math.min(rawScore, MAX_SCORE));
};

const getScoreColor = (score: number) => {
  if (score >= 800) return "text-emerald-400";
  if (score >= 740) return "text-green-400";
  if (score >= 670) return "text-yellow-400";
  if (score >= 580) return "text-orange-400";
  return "text-red-400";
};

const getScoreLabel = (score: number) => {
  if (score >= 800) return "Exceptional";
  if (score >= 740) return "Very Good";
  if (score >= 670) return "Good";
  if (score >= 580) return "Fair";
  return "Poor";
};

// Tradeline recommendation options with score boost estimates
const TRADELINE_OPTIONS = [
  { name: "Premium Plus", limit: 50000, age: 180, price: "$1,200", bank: "Chase", tier: "Premium" },
  { name: "Platinum Elite", limit: 25000, age: 120, price: "$850", bank: "Amex", tier: "Premium" },
  { name: "Gold Preferred", limit: 15000, age: 84, price: "$550", bank: "Citi", tier: "Standard" },
  { name: "Silver Standard", limit: 5000, age: 48, price: "$350", bank: "Capital One", tier: "Economy" },
];

// Additional boost tradelines shown in results
const BOOST_TRADELINES = [
  { name: "Diamond Reserve", limit: 75000, age: 240, price: "$1,800", bank: "Chase", boost: "+45-80 pts", tier: "Ultra Premium" },
  { name: "Centurion Select", limit: 50000, age: 180, price: "$1,200", bank: "Amex", boost: "+35-65 pts", tier: "Premium" },
  { name: "Prestige Gold", limit: 30000, age: 144, price: "$950", bank: "Citi", boost: "+25-50 pts", tier: "Premium" },
  { name: "Advantage Plus", limit: 20000, age: 96, price: "$700", bank: "BofA", boost: "+20-40 pts", tier: "Standard" },
  { name: "Builder Select", limit: 10000, age: 60, price: "$450", bank: "Discover", boost: "+15-30 pts", tier: "Economy" },
];

// --- Sub-components ---
const ScoreGauge = ({ score, label }: { score: number; label: string }) => {
  const percentage = ((score - MIN_SCORE) / (MAX_SCORE - MIN_SCORE)) * 100;
  const color = getScoreColor(score);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex flex-col items-center justify-center p-6 sm:p-8 glass-panel rounded-2xl neon-border-glow card-shine"
    >
      <div className="relative w-40 h-40 sm:w-48 sm:h-48">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="50%" cy="50%" r="44%" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-white/5" />
          <motion.circle
            cx="50%"
            cy="50%"
            r="44%"
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={552.92}
            initial={{ strokeDashoffset: 552.92 }}
            animate={{ strokeDashoffset: 552.92 - (552.92 * percentage) / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={color}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            key={score}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-5xl sm:text-6xl font-display font-extrabold tracking-tighter ${color}`}
          >
            {score}
          </motion.span>
          <span className="text-white/40 text-xs font-medium uppercase tracking-widest">{label}</span>
        </div>
      </div>
    </motion.div>
  );
};

const MetricCard = ({ icon: Icon, label, value, trend }: { icon: any; label: string; value: string; trend?: number | null }) => (
  <div className="glass-panel rounded-xl p-4 space-y-1 card-shine">
    <div className="flex items-center justify-between mb-1">
      <div className="p-1.5 bg-neon/10 rounded-lg">
        <Icon className="w-4 h-4 text-neon" />
      </div>
      {trend != null && trend !== 0 && (
        <span className={`flex items-center gap-0.5 text-xs font-bold ${trend > 0 ? "text-emerald-400" : "text-red-400"}`}>
          {trend > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(trend)}%
        </span>
      )}
    </div>
    <span className="text-white/40 text-[10px] font-medium uppercase tracking-wider">{label}</span>
    <span className="text-lg font-bold text-white block">{value}</span>
  </div>
);

const Tooltip = ({ content }: { content: string }) => (
  <div className="group relative inline-block ml-1.5 align-middle">
    <HelpCircle className="w-3.5 h-3.5 text-white/20 hover:text-neon transition-colors cursor-help" />
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-void border border-white/10 rounded-xl text-[11px] text-white/70 leading-relaxed opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60] shadow-2xl">
      {content}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-void" />
    </div>
  </div>
);

// --- Main Component ---
export default function TradelineWizard() {
  // Steps: 1 = profile input, 2 = select tradeline, 2.5 = lead gate (manual only), 3 = results
  const [step, setStep] = useState(1);
  const [inputMethod, setInputMethod] = useState<"none" | "upload" | "manual">("none");
  const [profile, setProfile] = useState<CreditProfile>({
    totalBalance: 2500,
    totalLimit: 5000,
    averageAgeInMonths: 36,
    onTimePaymentPercentage: 100,
    missedPaymentsRange: "0",
    tradelines: [{ id: "1", name: "Primary Card", limit: 5000, balance: 2500, ageInMonths: 36 }],
  });
  const [simulatedTradeline, setSimulatedTradeline] = useState<Tradeline | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", email: "", phone: "" });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [extractedContact, setExtractedContact] = useState<ExtractedContact | null>(null);

  const validateField = (name: string, value: number) => {
    let error = "";
    if (name === "totalBalance" && value < 0) error = "Cannot be negative";
    if (name === "totalLimit" && value < 0) error = "Cannot be negative";
    if (name === "averageAgeInMonths" && value < 0) error = "Cannot be negative";
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  const handleProfileChange = (name: keyof CreditProfile, value: string) => {
    setInputMethod("manual");
    if (name === "missedPaymentsRange") {
      const percentage = MISSED_PAYMENTS_MAP[value] || 100;
      setProfile({ ...profile, missedPaymentsRange: value, onTimePaymentPercentage: percentage });
      return;
    }
    const numValue = value === "" ? 0 : Number(value);
    setProfile({ ...profile, [name]: numValue });
    validateField(name, numValue);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setInputMethod("upload");

    // Simulate report parsing — extracting contact info + credit data
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);

      // Simulated extracted data from credit report
      setExtractedContact({
        name: "Report Owner",
        address: "Extracted from report",
        reportDate: new Date().toLocaleDateString(),
      });

      setProfile({
        totalBalance: 12450,
        totalLimit: 45000,
        averageAgeInMonths: 72,
        onTimePaymentPercentage: 98,
        missedPaymentsRange: "1-2",
        tradelines: [
          { id: "1", name: "Chase Freedom", limit: 15000, balance: 3200, ageInMonths: 96 },
          { id: "2", name: "Amex Gold", limit: 20000, balance: 5750, ageInMonths: 60 },
          { id: "3", name: "Citi Double Cash", limit: 10000, balance: 3500, ageInMonths: 48 },
        ],
      });

      // Auto-capture lead from report — skip lead gate
      setLeadCaptured(true);

      setTimeout(() => {
        setStep(2);
        setUploadSuccess(false);
      }, 1500);
    }, 2500);
  };

  const isStep1Valid = useMemo(() => {
    return (
      profile.totalLimit >= 0 &&
      profile.totalBalance >= 0 &&
      profile.averageAgeInMonths >= 0 &&
      Object.values(errors).every((e) => !e)
    );
  }, [profile, errors]);

  const currentScore = useMemo(() => calculateScore(profile), [profile]);

  const simulationResult = useMemo((): SimulationResult | null => {
    if (!simulatedTradeline) return null;
    const newTradelines = [...profile.tradelines, simulatedTradeline];
    const newTotalBalance = newTradelines.reduce((sum, t) => sum + t.balance, 0);
    const newTotalLimit = newTradelines.reduce((sum, t) => sum + t.limit, 0);
    const newAverageAge = newTradelines.reduce((sum, t) => sum + t.ageInMonths, 0) / newTradelines.length;
    const newProfile: CreditProfile = {
      ...profile,
      totalBalance: newTotalBalance,
      totalLimit: newTotalLimit,
      averageAgeInMonths: newAverageAge,
      tradelines: newTradelines,
    };
    const newScore = calculateScore(newProfile);
    const insights: string[] = [];
    if (newScore > currentScore) insights.push(`Adding this tradeline could increase your score by ${newScore - currentScore} points.`);
    const oldUtil = (profile.totalBalance / profile.totalLimit) * 100;
    const newUtil = (newTotalBalance / newTotalLimit) * 100;
    if (newUtil < oldUtil) insights.push(`Your credit utilization would drop from ${oldUtil.toFixed(1)}% to ${newUtil.toFixed(1)}%.`);
    if (newAverageAge > profile.averageAgeInMonths) {
      insights.push(`Your average age of accounts would increase by ${Math.round((newAverageAge - profile.averageAgeInMonths) / 12)} years.`);
    } else {
      insights.push(`Note: Adding a new account slightly lowers your average age, but the utilization benefit often outweighs this.`);
    }
    return {
      originalScore: currentScore,
      newScore,
      originalUtilization: oldUtil,
      newUtilization: newUtil,
      originalAverageAge: profile.averageAgeInMonths,
      newAverageAge,
      insights,
    };
  }, [profile, simulatedTradeline, currentScore]);

  // Calculate boost estimates for each recommendation based on current profile
  const getBoostEstimate = (limit: number, age: number) => {
    const newTradelines = [...profile.tradelines, { id: "sim", name: "Sim", limit, balance: 0, ageInMonths: age }];
    const newTotalBalance = newTradelines.reduce((sum, t) => sum + t.balance, 0);
    const newTotalLimit = newTradelines.reduce((sum, t) => sum + t.limit, 0);
    const newAverageAge = newTradelines.reduce((sum, t) => sum + t.ageInMonths, 0) / newTradelines.length;
    const newProfile: CreditProfile = {
      ...profile,
      totalBalance: newTotalBalance,
      totalLimit: newTotalLimit,
      averageAgeInMonths: newAverageAge,
      tradelines: newTradelines,
    };
    const boostedScore = calculateScore(newProfile);
    return boostedScore - currentScore;
  };

  const handleAddTradeline = (t: Partial<Tradeline>) => {
    const newTradeline: Tradeline = {
      id: Math.random().toString(36).substr(2, 9),
      name: t.name || "New Tradeline",
      limit: t.limit || 10000,
      balance: t.balance || 0,
      ageInMonths: t.ageInMonths || 120,
      isSimulated: true,
    };
    setSimulatedTradeline(newTradeline);

    // Path A (upload): lead already captured, go straight to results
    // Path B (manual): need lead gate first
    if (leadCaptured) {
      setStep(3);
    } else {
      setStep(2.5 as any);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSubmitted(true);
    setLeadCaptured(true);
    setTimeout(() => {
      setStep(3);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
      {/* Left Column: Steps */}
      <div className="order-2 lg:order-1 lg:col-span-7 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight">
            CREDIT SCORE <span className="text-neon neon-text-glow">SIMULATOR</span>
          </h2>
          <p className="text-white/40 text-sm">The Credit Score Simulator by A1 Tradelines</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-3">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step >= s ? "bg-neon text-black" : "bg-white/5 text-white/30"
                }`}
              >
                {s}
              </div>
              {s < 3 && <div className={`w-10 h-0.5 rounded-full ${step > s ? "bg-neon" : "bg-white/5"}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: Profile Input */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-5 glass-panel p-5 sm:p-7 rounded-2xl card-shine"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-neon" />
                  <h3 className="text-lg font-bold">Your Current Profile</h3>
                </div>
                <button
                  onClick={() => {
                    setProfile({
                      totalBalance: 2500,
                      totalLimit: 5000,
                      averageAgeInMonths: 36,
                      onTimePaymentPercentage: 100,
                      missedPaymentsRange: "0",
                      tradelines: [{ id: "1", name: "Primary Card", limit: 5000, balance: 2500, ageInMonths: 36 }],
                    });
                    setErrors({});
                    setInputMethod("none");
                    setExtractedContact(null);
                  }}
                  className="text-xs font-bold text-white/30 hover:text-white transition-colors uppercase tracking-widest"
                >
                  Reset
                </button>
              </div>

              {/* Upload Credit Report */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileUpload}
                className={`relative group border-2 border-dashed ${
                  uploadSuccess ? "border-emerald-500/50 bg-emerald-500/5" : "border-white/10 hover:border-neon/40 bg-white/[0.02]"
                } rounded-xl p-6 transition-all text-center cursor-pointer overflow-hidden`}
              >
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={handleFileUpload} accept=".pdf,.jpg,.png,.jpeg" />
                <div className="relative z-0 space-y-2">
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-8 h-8 text-neon animate-spin" />
                      <p className="text-neon font-bold text-sm animate-pulse">Analyzing Report...</p>
                      <p className="text-white/30 text-[11px]">Extracting credit data & contact info</p>
                    </div>
                  ) : uploadSuccess ? (
                    <div className="flex flex-col items-center gap-2">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                      <p className="text-emerald-400 font-bold text-sm">Report Analyzed!</p>
                      <p className="text-white/30 text-[11px]">Contact info extracted — no form needed</p>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="w-8 h-8 text-neon/60 mx-auto" />
                      <p className="font-medium text-white/70 text-sm">Upload Credit Report</p>
                      <p className="text-[11px] text-white/30">PDF, PNG, JPG — we'll extract your data & contact info automatically</p>
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <FileText className="w-3 h-3 text-neon/40" />
                        <span className="text-[10px] text-neon/40 font-medium">Skip the form — upload for instant results</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-px bg-white/5 flex-1" />
                <span className="text-[10px] font-bold text-white/15 uppercase tracking-[0.15em]">or enter manually</span>
                <div className="h-px bg-white/5 flex-1" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center">
                    <label className="text-xs font-medium text-white/50">Total Credit Card Balances</label>
                    <Tooltip content="The sum of all current debt on your credit cards. Keeping balances low relative to limits is crucial." />
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm font-mono">$</span>
                    <input
                      type="number"
                      value={profile.totalBalance || ""}
                      onChange={(e) => handleProfileChange("totalBalance", e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 pl-7 pr-3 text-sm outline-none focus:border-neon/50 transition-all"
                      placeholder="0"
                    />
                  </div>
                  {errors.totalBalance && (
                    <p className="text-red-400 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.totalBalance}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center">
                    <label className="text-xs font-medium text-white/50">Total Credit Card Limits</label>
                    <Tooltip content="Total spending limit across all open credit card accounts." />
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm font-mono">$</span>
                    <input
                      type="number"
                      value={profile.totalLimit || ""}
                      onChange={(e) => handleProfileChange("totalLimit", e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 pl-7 pr-3 text-sm outline-none focus:border-neon/50 transition-all"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center">
                    <label className="text-xs font-medium text-white/50">Average Account Age (Months)</label>
                    <Tooltip content="Average length of time your credit accounts have been open." />
                  </div>
                  <input
                    type="number"
                    value={profile.averageAgeInMonths || ""}
                    onChange={(e) => handleProfileChange("averageAgeInMonths", e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-3 text-sm outline-none focus:border-neon/50 transition-all"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center">
                    <label className="text-xs font-medium text-white/50">Estimated Missed Payments</label>
                    <Tooltip content="Number of times you've missed a payment by 30+ days." />
                  </div>
                  <select
                    value={profile.missedPaymentsRange}
                    onChange={(e) => handleProfileChange("missedPaymentsRange", e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-3 text-sm outline-none focus:border-neon/50 transition-all appearance-none"
                  >
                    <option value="0" className="bg-void">None (Perfect)</option>
                    <option value="1-2" className="bg-void">1-2 Missed</option>
                    <option value="2-4" className="bg-void">2-4 Missed</option>
                    <option value="5-10" className="bg-void">5-10 Missed</option>
                    <option value="10+" className="bg-void">10+ Missed</option>
                  </select>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  if (isStep1Valid) {
                    if (inputMethod !== "upload") setInputMethod("manual");
                    setStep(2);
                  }
                }}
                disabled={!isStep1Valid}
                className={`btn-neon w-full ${
                  isStep1Valid ? "bg-neon text-black shadow-lg shadow-neon/20" : "bg-white/5 text-white/20 cursor-not-allowed"
                } font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all text-sm`}
              >
                Next: Choose Tradeline <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}

          {/* STEP 2: Select Tradeline */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-neon" />
                  <h3 className="text-lg font-bold">Select a Tradeline</h3>
                </div>
                <button onClick={() => setStep(1)} className="text-white/30 hover:text-white flex items-center gap-1 text-sm">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              </div>

              {/* Show extracted info badge if uploaded */}
              {inputMethod === "upload" && extractedContact && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-emerald-400 text-xs font-bold">Contact info extracted from your report</p>
                    <p className="text-white/40 text-[11px]">No additional form required — select a tradeline to see your results instantly</p>
                  </div>
                </motion.div>
              )}

              {/* Show manual entry notice */}
              {inputMethod === "manual" && !leadCaptured && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-3 bg-neon/5 border border-neon/10 rounded-xl"
                >
                  <Info className="w-5 h-5 text-neon shrink-0" />
                  <div>
                    <p className="text-neon/80 text-xs font-bold">Quick contact info needed to unlock results</p>
                    <p className="text-white/30 text-[11px]">After selecting a tradeline, we'll ask for your info to show personalized results</p>
                  </div>
                </motion.div>
              )}

              <div className="grid gap-3">
                {TRADELINE_OPTIONS.map((t, i) => {
                  const boost = getBoostEstimate(t.limit, t.age);
                  return (
                    <motion.div
                      key={t.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ scale: 1.01, x: 5 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAddTradeline({ name: t.name, limit: t.limit, ageInMonths: t.age, balance: 0 })}
                      className="group glass-panel p-4 sm:p-5 rounded-xl flex items-center justify-between hover:border-neon/30 cursor-pointer transition-all card-shine"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-neon/10 rounded-lg flex items-center justify-center group-hover:bg-neon/20 transition-colors">
                          <CreditCard className="w-5 h-5 text-neon" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{t.name}</h4>
                          <p className="text-white/40 text-xs">
                            <span className="font-mono">${t.limit.toLocaleString()}</span> Limit &middot; {Math.round(t.age / 12)} Years &middot; {t.bank}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block font-bold text-neon font-mono">{t.price}</span>
                        {boost > 0 && (
                          <span className="text-[9px] text-emerald-400 font-bold">+{boost} pts</span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="p-4 bg-neon/5 border border-neon/10 rounded-xl flex gap-3">
                <Info className="w-5 h-5 text-neon shrink-0 mt-0.5" />
                <p className="text-xs text-neon/60 leading-relaxed">
                  Adding a seasoned tradeline with a high limit and zero balance can drastically lower your utilization and increase your average account age.
                </p>
              </div>
            </motion.div>
          )}

          {/* LEAD CAPTURE GATE — Only for manual entry path */}
          {(step as number) === 2.5 && (
            <motion.div
              key="leadgate"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel p-6 sm:p-8 rounded-2xl space-y-5 neon-border-glow"
            >
              {leadSubmitted ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold">Thank You!</h3>
                  <p className="text-white/50 text-sm">Loading your simulation results...</p>
                </div>
              ) : (
                <>
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-neon/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Sparkles className="w-6 h-6 text-neon" />
                    </div>
                    <h3 className="text-xl font-bold">Unlock Your Score</h3>
                    <p className="text-white/40 text-sm max-w-sm mx-auto">
                      Enter your contact info to see your personalized credit score simulation and tradeline recommendations.
                    </p>
                    <p className="text-neon/40 text-[11px]">
                      Tip: Upload your credit report instead to skip this step!
                    </p>
                  </div>
                  <form onSubmit={handleLeadSubmit} className="space-y-3">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input
                        required
                        type="text"
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 pl-10 pr-3 text-sm outline-none focus:border-neon/50 transition-all"
                        placeholder="Full Name"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input
                        required
                        type="email"
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                        className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 pl-10 pr-3 text-sm outline-none focus:border-neon/50 transition-all"
                        placeholder="Email Address"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input
                        required
                        type="tel"
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                        className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 pl-10 pr-3 text-sm outline-none focus:border-neon/50 transition-all"
                        placeholder="Phone Number"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      className="btn-neon w-full bg-neon text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-neon/20 text-sm"
                    >
                      Unlock My Results <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </form>
                  <p className="text-white/20 text-[10px] text-center">We respect your privacy. No spam, ever.</p>
                </>
              )}
            </motion.div>
          )}

          {/* STEP 3: Results + Boost Recommendations */}
          {step === 3 && simulationResult && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-neon" />
                  <h3 className="text-lg font-bold">Simulation Results</h3>
                </div>
                <button
                  onClick={() => {
                    setSimulatedTradeline(null);
                    setStep(2);
                  }}
                  className="text-white/30 hover:text-white flex items-center gap-1 text-sm"
                >
                  <ChevronLeft className="w-4 h-4" /> Try Another
                </button>
              </div>

              {/* Score Result Card */}
              <div className="glass-panel rounded-2xl p-5 sm:p-7 space-y-5 neon-border-glow card-shine">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-white/5 gap-3">
                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Projected Score</p>
                    <div className="flex items-baseline gap-3">
                      <motion.span
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`text-5xl font-display font-extrabold ${getScoreColor(simulationResult.newScore)}`}
                      >
                        {simulationResult.newScore}
                      </motion.span>
                      <motion.span
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-emerald-400 font-bold flex items-center gap-1 text-sm"
                      >
                        <ArrowUpRight className="w-4 h-4" />+{simulationResult.newScore - simulationResult.originalScore}
                      </motion.span>
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Current</p>
                    <span className="text-xl font-bold text-white/50 font-mono">{simulationResult.originalScore}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest">Key Improvements</h4>
                  {simulationResult.insights.map((insight, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex gap-2 items-start p-3 bg-black/20 rounded-lg border border-white/5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-white/70 text-sm leading-relaxed">{insight}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* ===== BOOST YOUR SCORE FURTHER ===== */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-neon animate-pulse" />
                  <h3 className="text-lg font-bold">Boost Your Score Even Further</h3>
                </div>
                <p className="text-white/40 text-sm">
                  Based on your profile, these tradelines could push your score even higher. Stack multiple for maximum impact.
                </p>

                <div className="grid gap-3">
                  {BOOST_TRADELINES.map((t, i) => {
                    const boost = getBoostEstimate(t.limit, t.age);
                    const potentialScore = currentScore + boost;
                    return (
                      <motion.div
                        key={t.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + i * 0.1 }}
                        className="group glass-panel p-4 rounded-xl hover:border-neon/30 transition-all card-shine"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="w-10 h-10 bg-neon/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-neon/20 transition-colors">
                              <CreditCard className="w-5 h-5 text-neon" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-sm truncate">{t.name}</h4>
                                <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                                  t.tier === "Ultra Premium" ? "bg-amber-500/20 text-amber-400" :
                                  t.tier === "Premium" ? "bg-neon/10 text-neon" :
                                  "bg-white/5 text-white/40"
                                }`}>
                                  {t.tier}
                                </span>
                              </div>
                              <p className="text-white/40 text-xs">
                                <span className="font-mono">${t.limit.toLocaleString()}</span> Limit &middot; {Math.round(t.age / 12)}yr &middot; {t.bank}
                              </p>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="block font-bold text-neon font-mono text-sm">{t.price}</span>
                            {boost > 0 && (
                              <span className="text-[10px] text-emerald-400 font-bold flex items-center justify-end gap-0.5">
                                <ArrowUpRight className="w-3 h-3" />+{boost} pts → {potentialScore}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                    <Link
                      href="/buy-tradelines"
                      className="btn-neon block w-full bg-neon text-black font-bold py-3.5 rounded-xl text-center text-sm shadow-lg shadow-neon/20 transition-all"
                    >
                      Browse Full Inventory <ArrowRight className="w-4 h-4 inline ml-1" />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                    <Link
                      href="/contact"
                      className="btn-ghost block w-full bg-white/5 border border-white/10 text-white font-bold py-3.5 rounded-xl text-center text-sm transition-all"
                    >
                      <Phone className="w-4 h-4 inline mr-1" /> Talk to a Strategist
                    </Link>
                  </motion.div>
                </div>

                {/* Strategy note */}
                <div className="p-4 bg-neon/5 border border-neon/10 rounded-xl flex gap-3">
                  <Star className="w-5 h-5 text-neon shrink-0 mt-0.5" />
                  <div>
                    <p className="text-neon/80 text-xs font-bold mb-1">Pro Strategy Tip</p>
                    <p className="text-xs text-neon/50 leading-relaxed">
                      Combining 2-3 tradelines from different banks often produces better results than a single tradeline. Our strategists can build a custom plan to maximize your score increase for your specific funding goals.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Column: Dashboard */}
      <div className="order-1 lg:order-2 lg:col-span-5 space-y-5">
        <div className="lg:sticky lg:top-24 space-y-5">
          <ScoreGauge
            score={step === 3 && simulationResult ? simulationResult.newScore : currentScore}
            label={getScoreLabel(step === 3 && simulationResult ? simulationResult.newScore : currentScore)}
          />
          <div className="grid grid-cols-2 gap-3">
            <MetricCard
              icon={CreditCard}
              label="Utilization"
              value={`${((profile.totalBalance / (profile.totalLimit || 1)) * 100).toFixed(1)}%`}
              trend={step === 3 && simulationResult ? Math.round(simulationResult.newUtilization - simulationResult.originalUtilization) : null}
            />
            <MetricCard icon={History} label="Avg. Age" value={`${(profile.averageAgeInMonths / 12).toFixed(1)} Yrs`} />
            <MetricCard icon={ShieldCheck} label="Payment History" value={`${profile.onTimePaymentPercentage}%`} />
            <MetricCard icon={TrendingUp} label="Accounts" value={`${profile.tradelines.length + (simulatedTradeline ? 1 : 0)}`} />
          </div>

          {/* Extracted contact info badge (upload path) */}
          {inputMethod === "upload" && extractedContact && step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel rounded-xl p-4 space-y-2"
            >
              <div className="flex items-center gap-2 text-emerald-400">
                <FileText className="w-4 h-4" />
                <h4 className="font-bold text-xs uppercase tracking-widest">Report Data</h4>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-white/50">
                  <User className="w-3 h-3 text-white/30" />
                  <span>{extractedContact.name}</span>
                </div>
                <div className="flex items-center gap-2 text-white/50">
                  <MapPin className="w-3 h-3 text-white/30" />
                  <span>{extractedContact.address}</span>
                </div>
                <div className="flex items-center gap-2 text-white/50">
                  <History className="w-3 h-3 text-white/30" />
                  <span>Report date: {extractedContact.reportDate}</span>
                </div>
              </div>
            </motion.div>
          )}

          <div className="bg-neon/5 border border-neon/10 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-neon">
              <Zap className="w-4 h-4 animate-pulse" />
              <h4 className="font-bold text-sm">Simulator Tip</h4>
            </div>
            <p className="text-xs text-neon/50 leading-relaxed">
              {step === 3
                ? "Want an even bigger boost? Stack multiple tradelines from different banks for maximum impact on your score."
                : "Keeping your utilization below 30% is good, but below 10% is where you see the most significant score jumps. Adding a high-limit tradeline is the fastest way to achieve this."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
