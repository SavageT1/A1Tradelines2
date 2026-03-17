/*
 * BuyTradelines.tsx — Tradeline marketplace page
 * Neon Pulse Design: lighter cards, advanced filtering (price, credit limit, age), improved readability.
 */
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Filter, ArrowUpDown, Search, ChevronDown, Phone, ArrowRight, Shield, X } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import TradelineInquiryModal from "@/components/TradelineInquiryModal";
import { toast } from "sonner";

const TRADELINES_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/tradelines-hero-MgAogTaYj2uNyddmtjtsbi.webp";

interface TradelineItem {
  id: number;
  bank: string;
  creditLimit: number;
  ageYears: number;
  ageMonths: number;
  price: number;
  category: string;
}

const SAMPLE_TRADELINES: TradelineItem[] = [
  { id: 1, bank: "Chase", creditLimit: 50000, ageYears: 15, ageMonths: 180, price: 1200, category: "Premium" },
  { id: 2, bank: "American Express", creditLimit: 35000, ageYears: 12, ageMonths: 144, price: 950, category: "Premium" },
  { id: 3, bank: "Citi", creditLimit: 25000, ageYears: 10, ageMonths: 120, price: 850, category: "Standard" },
  { id: 4, bank: "Bank of America", creditLimit: 20000, ageYears: 8, ageMonths: 96, price: 700, category: "Standard" },
  { id: 5, bank: "Capital One", creditLimit: 15000, ageYears: 7, ageMonths: 84, price: 550, category: "Standard" },
  { id: 6, bank: "Discover", creditLimit: 12000, ageYears: 6, ageMonths: 72, price: 450, category: "Economy" },
  { id: 7, bank: "US Bank", creditLimit: 10000, ageYears: 5, ageMonths: 60, price: 400, category: "Economy" },
  { id: 8, bank: "Wells Fargo", creditLimit: 8000, ageYears: 4, ageMonths: 48, price: 350, category: "Economy" },
  { id: 9, bank: "Chase", creditLimit: 30000, ageYears: 11, ageMonths: 132, price: 900, category: "Premium" },
  { id: 10, bank: "American Express", creditLimit: 45000, ageYears: 14, ageMonths: 168, price: 1100, category: "Premium" },
  { id: 11, bank: "Citi", creditLimit: 18000, ageYears: 9, ageMonths: 108, price: 750, category: "Standard" },
  { id: 12, bank: "Capital One", creditLimit: 5000, ageYears: 4, ageMonths: 48, price: 300, category: "Economy" },
];

type SortKey = "price" | "creditLimit" | "ageYears";

// Price range filter options
const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "$0 - $500", min: 0, max: 500 },
  { label: "$500 - $1000", min: 500, max: 1000 },
  { label: "$1000+", min: 1000, max: Infinity },
];

// Credit limit filter options
const CREDIT_LIMIT_RANGES = [
  { label: "All Limits", min: 0, max: Infinity },
  { label: "$0 - $10k", min: 0, max: 10000 },
  { label: "$10k - $25k", min: 10000, max: 25000 },
  { label: "$25k+", min: 25000, max: Infinity },
];

// Account age filter options
const AGE_RANGES = [
  { label: "All Ages", min: 0, max: Infinity },
  { label: "0-5 Years", min: 0, max: 5 },
  { label: "5-10 Years", min: 5, max: 10 },
  { label: "10+ Years", min: 10, max: Infinity },
];

export default function BuyTradelines() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceRange, setPriceRange] = useState(PRICE_RANGES[0]);
  const [creditLimitRange, setCreditLimitRange] = useState(CREDIT_LIMIT_RANGES[0]);
  const [ageRange, setAgeRange] = useState(AGE_RANGES[0]);
  const [sortBy, setSortBy] = useState<SortKey>("price");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [selectedTradeline, setSelectedTradeline] = useState<TradelineItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  const filtered = useMemo(() => {
    let items = [...SAMPLE_TRADELINES];
    
    // Apply search filter
    if (searchTerm) {
      items = items.filter((t) => t.bank.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    // Apply category filter
    if (categoryFilter !== "All") {
      items = items.filter((t) => t.category === categoryFilter);
    }
    
    // Apply price range filter
    items = items.filter((t) => t.price >= priceRange.min && t.price <= priceRange.max);
    
    // Apply credit limit range filter
    items = items.filter((t) => t.creditLimit >= creditLimitRange.min && t.creditLimit <= creditLimitRange.max);
    
    // Apply age range filter
    items = items.filter((t) => t.ageYears >= ageRange.min && t.ageYears <= ageRange.max);
    
    // Apply sorting
    items.sort((a, b) => {
      const diff = a[sortBy] - b[sortBy];
      return sortDir === "asc" ? diff : -diff;
    });
    
    return items;
  }, [searchTerm, categoryFilter, priceRange, creditLimitRange, ageRange, sortBy, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir("asc");
    }
  };

  const hasActiveFilters = 
    searchTerm || 
    categoryFilter !== "All" || 
    priceRange.label !== "All Prices" || 
    creditLimitRange.label !== "All Limits" || 
    ageRange.label !== "All Ages";

  const resetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("All");
    setPriceRange(PRICE_RANGES[0]);
    setCreditLimitRange(CREDIT_LIMIT_RANGES[0]);
    setAgeRange(AGE_RANGES[0]);
  };

  return (
    <div>
      <PageHero
        title="Buy Tradelines"
        subtitle="Browse our inventory of premium authorized user tradelines"
        backgroundImage={TRADELINES_HERO}
      />

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Guarantee Banner */}
          <SectionReveal>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 glass-panel rounded-2xl p-6 sm:p-8 border-l-4 border-emerald-500 bg-emerald-500/5"
            >
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-emerald-400 mb-2">Our Guarantee</h3>
                  <p className="text-white/70 leading-relaxed">
                    Every tradeline in our inventory comes with a <span className="font-bold text-white">100% perfect payment history</span> and <span className="font-bold text-white">$0 balance</span>. We guarantee the quality and accuracy of every tradeline we provide. Your credit profile is our priority.
                  </p>
                </div>
              </div>
            </motion.div>
          </SectionReveal>

          {/* Main Search Bar */}
          <SectionReveal>
            <div className="glass-panel rounded-2xl p-4 sm:p-6 mb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by bank name..."
                  className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm outline-none focus:border-neon/50 transition-all"
                />
              </div>

              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                  showFiltersPanel
                    ? "bg-neon/10 border-neon/30 text-neon"
                    : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </SectionReveal>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showFiltersPanel && (
              <SectionReveal>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="glass-panel rounded-2xl p-6 mb-6 border border-neon/20"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white">Advanced Filters</h3>
                    {hasActiveFilters && (
                      <button
                        onClick={resetFilters}
                        className="text-xs font-medium text-neon hover:text-neon/80 transition-colors flex items-center gap-1"
                      >
                        <X className="w-3 h-3" />
                        Clear All
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Price Range Filter */}
                    <div>
                      <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-3">
                        Price Range
                      </label>
                      <div className="space-y-2">
                        {PRICE_RANGES.map((range) => (
                          <button
                            key={range.label}
                            onClick={() => setPriceRange(range)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all border ${
                              priceRange.label === range.label
                                ? "bg-neon/10 border-neon/30 text-neon font-medium"
                                : "bg-white/5 border-white/10 text-white/60 hover:text-white/80"
                            }`}
                          >
                            {range.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Credit Limit Filter */}
                    <div>
                      <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-3">
                        Credit Limit
                      </label>
                      <div className="space-y-2">
                        {CREDIT_LIMIT_RANGES.map((range) => (
                          <button
                            key={range.label}
                            onClick={() => setCreditLimitRange(range)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all border ${
                              creditLimitRange.label === range.label
                                ? "bg-neon/10 border-neon/30 text-neon font-medium"
                                : "bg-white/5 border-white/10 text-white/60 hover:text/80"
                            }`}
                          >
                            {range.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Account Age Filter */}
                    <div>
                      <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-3">
                        Account Age
                      </label>
                      <div className="space-y-2">
                        {AGE_RANGES.map((range) => (
                          <button
                            key={range.label}
                            onClick={() => setAgeRange(range)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all border ${
                              ageRange.label === range.label
                                ? "bg-neon/10 border-neon/30 text-neon font-medium"
                                : "bg-white/5 border-white/10 text-white/60 hover:text-white/80"
                            }`}
                          >
                            {range.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Category Filter */}
                    <div>
                      <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-3">
                        Category
                      </label>
                      <div className="space-y-2">
                        {["All", "Premium", "Standard", "Economy"].map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setCategoryFilter(cat)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all border ${
                              categoryFilter === cat
                                ? "bg-neon/10 border-neon/30 text-neon font-medium"
                                : "bg-white/5 border-white/10 text-white/60 hover:text-white/80"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SectionReveal>
            )}
          </AnimatePresence>

          {/* Sort Controls */}
          <SectionReveal>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <p className="text-sm text-white/30">
                Showing <span className="text-white/60 font-mono font-bold">{filtered.length}</span> tradelines
              </p>
              <div className="flex gap-2">
                {(["price", "creditLimit", "ageYears"] as SortKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => toggleSort(key)}
                    className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-all border ${
                      sortBy === key
                        ? "bg-neon/10 border-neon/30 text-neon"
                        : "bg-white/5 border-white/10 text-white/40 hover:text-white"
                    }`}
                  >
                    <ArrowUpDown className="w-3 h-3" />
                    {key === "price" ? "Price" : key === "creditLimit" ? "Limit" : "Age"}
                  </button>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Tradeline Grid - LIGHTER CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((t, i) => (
                <motion.div
                  key={t.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ y: -5, borderColor: "rgba(0,255,127,0.3)" }}
                  className="tradeline-card rounded-2xl p-6 space-y-4 transition-all duration-300 card-shine group"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neon/15 rounded-lg flex items-center justify-center group-hover:bg-neon/25 transition-colors">
                        <CreditCard className="w-5 h-5 text-neon" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-white">{t.bank}</h3>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${
                          t.category === "Premium" ? "text-neon" : t.category === "Standard" ? "text-blue-400" : "text-white/50"
                        }`}>
                          {t.category}
                        </span>
                      </div>
                    </div>
                    <span className="text-xl font-display font-extrabold text-neon font-mono">
                      ${t.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Guarantee Badge */}
                  <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/15 border border-emerald-500/30 rounded-lg">
                    <Shield className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Perfect Payment • $0 Balance</span>
                  </div>

                  {/* Details - IMPROVED CONTRAST */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/[0.08] rounded-lg p-3 border border-white/10">
                      <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Credit Limit</p>
                      <p className="text-sm font-bold font-mono text-white/90 mt-1">${t.creditLimit.toLocaleString()}</p>
                    </div>
                    <div className="bg-white/[0.08] rounded-lg p-3 border border-white/10">
                      <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Account Age</p>
                      <p className="text-sm font-bold font-mono text-white/90 mt-1">{t.ageYears} Years</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => {
                      setSelectedTradeline(t);
                      setIsModalOpen(true);
                    }}
                    className="btn-ghost w-full bg-neon/15 border border-neon/30 text-neon py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 hover:bg-neon/25"
                  >
                    Inquire Now <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/30 text-lg">No tradelines match your filters.</p>
              <button 
                onClick={resetFilters} 
                className="mt-4 text-neon text-sm font-medium hover:underline transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Bottom CTA */}
          <SectionReveal>
            <div className="mt-16 glass-panel rounded-2xl p-8 sm:p-10 text-center neon-border-glow">
              <h3 className="text-2xl font-display font-extrabold mb-3">
                Need Help Choosing?
              </h3>
              <p className="text-white/40 mb-6 max-w-lg mx-auto">
                Our credit strategists can analyze your profile and recommend the perfect tradeline combination for your goals.
              </p>
              <a
                href="/contact"
                className="btn-neon inline-flex items-center gap-2 bg-neon text-black px-8 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-neon/20 transition-all"
              >
                <Phone className="w-4 h-4" /> Schedule Free Consultation
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Inquiry Modal */}
      {selectedTradeline && (
        <TradelineInquiryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          tradeline={{
            name: selectedTradeline.bank,
            creditLimit: `$${selectedTradeline.creditLimit.toLocaleString()}`,
            age: `${selectedTradeline.ageYears} Years`,
            price: `$${selectedTradeline.price.toLocaleString()}`,
          }}
        />
      )}
    </div>
  );
}
