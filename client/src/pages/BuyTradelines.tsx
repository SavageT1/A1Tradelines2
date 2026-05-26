import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpDown, CreditCard, Filter, Loader, Phone, Search, Shield, X } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import TradelineInquiryModal from "@/components/TradelineInquiryModal";
import SEOHead from "@/components/SEOHead";
import { toast } from "sonner";
import { fetchTradelines, type TradelineItem } from "@/services/tradelineApi";
import { generateServiceSchema } from "@/lib/seo";

const TRADELINES_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/tradelines-hero-MgAogTaYj2uNyddmtjtsbi.webp";

type SortKey = "price" | "creditLimit" | "ageYears" | "cycles";

const PRICE_RANGES = [
  { label: "All Total Prices", min: 0, max: Infinity },
  { label: "Under $500", min: 0, max: 500 },
  { label: "$500 - $1,000", min: 500, max: 1000 },
  { label: "$1,000+", min: 1000, max: Infinity },
];

const CREDIT_LIMIT_RANGES = [
  { label: "All Limits", min: 0, max: Infinity },
  { label: "Under $10k", min: 0, max: 10000 },
  { label: "$10k - $25k", min: 10000, max: 25000 },
  { label: "$25k+", min: 25000, max: Infinity },
];

const AGE_RANGES = [
  { label: "All Ages", min: 0, max: Infinity },
  { label: "0-5 Years", min: 0, max: 5 },
  { label: "5-10 Years", min: 5, max: 10 },
  { label: "10+ Years", min: 10, max: Infinity },
];

const formatCurrency = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 });

const formatDate = (value?: string) => {
  if (!value) return "TBD";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "TBD";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const getMonthlyPrice = (item: TradelineItem) => {
  const months = item.cycles && item.cycles > 0 ? item.cycles : 1;
  return item.price / months;
};

const getMonthLabel = (cycles: number) => `${cycles || 1} month${(cycles || 1) === 1 ? "" : "s"}`;

export default function BuyTradelines() {
  const [tradelines, setTradelines] = useState<TradelineItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  useEffect(() => {
    const loadTradelines = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchTradelines();
        setTradelines(data);
      } catch (err) {
        console.error("Error loading tradelines:", err);
        setError("Failed to load tradelines. Please try again later.");
        toast.error("Failed to load tradelines");
      } finally {
        setIsLoading(false);
      }
    };

    loadTradelines();
  }, []);

  const filtered = useMemo(() => {
    let items = [...tradelines];

    if (searchTerm) {
      items = items.filter((t) => t.bank.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (categoryFilter !== "All") {
      items = items.filter((t) => t.category === categoryFilter);
    }

    items = items.filter((t) => t.price >= priceRange.min && t.price <= priceRange.max);
    items = items.filter((t) => t.creditLimit >= creditLimitRange.min && t.creditLimit <= creditLimitRange.max);
    items = items.filter((t) => t.ageYears >= ageRange.min && t.ageYears <= ageRange.max);

    items.sort((a, b) => {
      const diff = a[sortBy] - b[sortBy];
      return sortDir === "asc" ? diff : -diff;
    });

    return items;
  }, [tradelines, searchTerm, categoryFilter, priceRange, creditLimitRange, ageRange, sortBy, sortDir]);

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
    priceRange.label !== "All Total Prices" ||
    creditLimitRange.label !== "All Limits" ||
    ageRange.label !== "All Ages";

  const resetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("All");
    setPriceRange(PRICE_RANGES[0]);
    setCreditLimitRange(CREDIT_LIMIT_RANGES[0]);
    setAgeRange(AGE_RANGES[0]);
  };

  const openTradeline = (tradeline: TradelineItem) => {
    setSelectedTradeline(tradeline);
    setIsModalOpen(true);
  };

  const schema = generateServiceSchema();

  return (
    <div>
      <SEOHead
        title="Authorized User Tradeline Inventory | A1 Tradelines"
        description="Browse authorized user tradeline options by bank, credit limit, account age, reporting term, availability, purchase deadline, target reporting date, and price."
        canonical="https://a1tradelines.com/buy-tradelines"
        keywords="authorized user tradelines, tradeline inventory, tradeline matching, credit profile strategy"
        schema={schema}
      />
      <PageHero
        title="Tradeline Inventory"
        subtitle="Compare authorized user tradelines by age, limit, monthly price, total price, and reporting dates"
        backgroundImage={TRADELINES_HERO}
      />

      <section className="site-section">
        <div className="site-container">
          <SectionReveal>
            <div className="mb-8 glass-panel rounded-2xl p-6 sm:p-8 border-l-4 border-emerald-500 bg-emerald-500/5">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-emerald-400">How to Read This Inventory</h3>
                  <p className="text-white/65 leading-relaxed">
                    The highlighted price shows the estimated monthly price. The total price is shown clearly underneath. The deadline shows when the tradeline should be purchased to target the listed reporting date.
                  </p>
                  <p className="text-xs text-white/35 leading-relaxed">
                    Purchase and reporting dates are based on vendor inventory data and may vary. Authorized user tradelines do not guarantee score increases, approvals, funding, or specific credit outcomes.
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="glass-panel rounded-2xl p-4 sm:p-6 mb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
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

              <button
                onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                  showFiltersPanel ? "bg-neon/10 border-neon/30 text-neon" : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </SectionReveal>

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
                    <h3 className="text-lg font-bold text-white">Filters</h3>
                    {hasActiveFilters && (
                      <button onClick={resetFilters} className="text-xs font-medium text-neon hover:text-neon/80 transition-colors flex items-center gap-1">
                        <X className="w-3 h-3" /> Clear All
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-3">Total Price</label>
                      <div className="space-y-2">
                        {PRICE_RANGES.map((range) => (
                          <button key={range.label} onClick={() => setPriceRange(range)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all border ${priceRange.label === range.label ? "bg-neon/10 border-neon/30 text-neon font-medium" : "bg-white/5 border-white/10 text-white/60 hover:text-white/80"}`}>
                            {range.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-3">Credit Limit</label>
                      <div className="space-y-2">
                        {CREDIT_LIMIT_RANGES.map((range) => (
                          <button key={range.label} onClick={() => setCreditLimitRange(range)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all border ${creditLimitRange.label === range.label ? "bg-neon/10 border-neon/30 text-neon font-medium" : "bg-white/5 border-white/10 text-white/60 hover:text-white/80"}`}>
                            {range.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-3">Account Age</label>
                      <div className="space-y-2">
                        {AGE_RANGES.map((range) => (
                          <button key={range.label} onClick={() => setAgeRange(range)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all border ${ageRange.label === range.label ? "bg-neon/10 border-neon/30 text-neon font-medium" : "bg-white/5 border-white/10 text-white/60 hover:text-white/80"}`}>
                            {range.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-3">Category</label>
                      <div className="space-y-2">
                        {["All", "Premium", "Standard", "Economy"].map((cat) => (
                          <button key={cat} onClick={() => setCategoryFilter(cat)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all border ${categoryFilter === cat ? "bg-neon/10 border-neon/30 text-neon font-medium" : "bg-white/5 border-white/10 text-white/60 hover:text-white/80"}`}>
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

          <SectionReveal>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <p className="text-sm text-white/35">
                Showing <span className="text-white/70 font-mono font-bold">{filtered.length}</span> available tradelines
              </p>
              <div className="flex flex-wrap gap-2">
                {(["price", "creditLimit", "ageYears", "cycles"] as SortKey[]).map((key) => (
                  <button key={key} onClick={() => toggleSort(key)} className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-all border ${sortBy === key ? "bg-neon/10 border-neon/30 text-neon" : "bg-white/5 border-white/10 text-white/40 hover:text-white"}`}>
                    <ArrowUpDown className="w-3 h-3" />
                    {key === "price" ? "Total Price" : key === "creditLimit" ? "Limit" : key === "ageYears" ? "Age" : "Months"}
                  </button>
                ))}
              </div>
            </div>
          </SectionReveal>

          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                <Loader className="w-8 h-8 text-neon" />
              </motion.div>
              <p className="ml-4 text-white/60">Loading current vendor inventory...</p>
            </div>
          )}

          {error && !isLoading && (
            <div className="text-center py-20">
              <p className="text-red-400 text-lg mb-4">{error}</p>
              <button onClick={() => window.location.reload()} className="text-neon text-sm font-medium hover:underline transition-colors">Try again</button>
            </div>
          )}

          {!isLoading && !error && (
            <>
              <div className="hidden lg:block overflow-hidden rounded-2xl border border-white/10 glass-panel">
                <table className="w-full text-sm">
                  <thead className="bg-white/[0.04] text-white/45 uppercase tracking-widest text-[11px]">
                    <tr>
                      <th className="text-left px-5 py-4">Bank</th>
                      <th className="text-right px-5 py-4">Limit</th>
                      <th className="text-right px-5 py-4">Age</th>
                      <th className="text-right px-5 py-4">Reports For</th>
                      <th className="text-right px-5 py-4">Deadline</th>
                      <th className="text-right px-5 py-4">Target Report</th>
                      <th className="text-right px-5 py-4">Spots</th>
                      <th className="text-right px-5 py-4">Price</th>
                      <th className="text-right px-5 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filtered.map((t) => (
                      <tr key={t.id} className="hover:bg-white/[0.04] transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-neon/15 rounded-lg flex items-center justify-center">
                              <CreditCard className="w-4 h-4 text-neon" />
                            </div>
                            <div>
                              <p className="font-bold text-white">{t.bank}</p>
                              <p className="text-[11px] text-white/35 uppercase tracking-widest">{t.category} • $0 balance</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-right font-mono text-white/85">{formatCurrency(t.creditLimit)}</td>
                        <td className="px-5 py-4 text-right font-mono text-white/85">{t.ageYears} yrs</td>
                        <td className="px-5 py-4 text-right text-white/75">{getMonthLabel(t.cycles)}</td>
                        <td className="px-5 py-4 text-right text-amber-300">Buy by {formatDate(t.statementDate)}</td>
                        <td className="px-5 py-4 text-right text-white/75">Target {formatDate(t.postingDate)}</td>
                        <td className="px-5 py-4 text-right text-white/75">{t.spotsAvailable}</td>
                        <td className="px-5 py-4 text-right">
                          <p className="text-lg font-display font-extrabold text-neon font-mono">{formatCurrency(getMonthlyPrice(t))}</p>
                          <p className="text-[11px] text-white/35">per month</p>
                          <p className="text-xs text-white/55">{formatCurrency(t.price)} total</p>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button onClick={() => openTradeline(t)} className="btn-neon bg-neon text-black px-4 py-2.5 rounded-lg text-xs font-bold shadow-lg shadow-neon/20">
                            Check Availability
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="lg:hidden grid grid-cols-1 gap-4">
                <AnimatePresence mode="popLayout">
                  {filtered.map((t, i) => (
                    <motion.div key={t.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.02 }} className="tradeline-card rounded-2xl p-5 space-y-4 transition-all duration-300 card-shine">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-lg font-bold text-white">{t.bank}</p>
                          <p className="text-[11px] text-white/40 uppercase tracking-widest">{t.category} • $0 balance</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-display font-extrabold text-neon font-mono">{formatCurrency(getMonthlyPrice(t))}</p>
                          <p className="text-[11px] text-white/35">per month</p>
                          <p className="text-xs text-white/55">{formatCurrency(t.price)} total</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/[0.08] rounded-lg p-3 border border-white/10">
                          <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Limit</p>
                          <p className="text-sm font-bold font-mono text-white/90 mt-1">{formatCurrency(t.creditLimit)}</p>
                        </div>
                        <div className="bg-white/[0.08] rounded-lg p-3 border border-white/10">
                          <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Age</p>
                          <p className="text-sm font-bold font-mono text-white/90 mt-1">{t.ageYears} Years</p>
                        </div>
                        <div className="bg-white/[0.08] rounded-lg p-3 border border-white/10">
                          <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Reports For</p>
                          <p className="text-sm font-bold text-white/90 mt-1">{getMonthLabel(t.cycles)}</p>
                        </div>
                        <div className="bg-white/[0.08] rounded-lg p-3 border border-white/10">
                          <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Spots</p>
                          <p className="text-sm font-bold text-white/90 mt-1">{t.spotsAvailable} available</p>
                        </div>
                      </div>

                      <div className="rounded-xl border border-amber-500/25 bg-amber-500/10 p-3 text-sm">
                        <p className="text-amber-300 font-bold">Purchase by {formatDate(t.statementDate)}</p>
                        <p className="text-white/55 text-xs mt-1">Target reporting date: {formatDate(t.postingDate)}</p>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/15 border border-emerald-500/30 rounded-lg">
                        <Shield className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Clean Payment History • $0 Reported Balance</span>
                      </div>

                      <button onClick={() => openTradeline(t)} className="cta-primary w-full">
                        Check Availability <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}

          {!isLoading && !error && filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/30 text-lg">No tradelines match your filters.</p>
              <button onClick={resetFilters} className="mt-4 text-neon text-sm font-medium hover:underline transition-colors">Clear filters</button>
            </div>
          )}

          <SectionReveal>
            <div className="mt-16 glass-panel rounded-2xl p-8 sm:p-10 text-center neon-border-glow">
              <h3 className="text-2xl font-display font-extrabold mb-3">Need Help Choosing?</h3>
              <p className="text-white/45 mb-6 max-w-xl mx-auto">
                A1 Tradelines can help you compare age, limit, reporting term, purchase deadline, target reporting date, and total price before selecting an authorized user tradeline.
              </p>
              <a href="/contact" className="cta-primary">
                <Phone className="w-4 h-4" /> Request Consultation
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>

      <TradelineInquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} tradeline={selectedTradeline} />
    </div>
  );
}
