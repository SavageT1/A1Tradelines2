import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpDown, Filter, Loader, Phone, Search, Shield, X } from "lucide-react";
import { Link } from "wouter";
import PageHero from "@/components/PageHero";
import SectionReveal from "@/components/SectionReveal";
import TradelineInquiryModal from "@/components/TradelineInquiryModal";
import SEOHead from "@/components/SEOHead";
import { toast } from "sonner";
import { fetchTradelines, type TradelineItem } from "@/services/tradelineApi";
import { generateServiceSchema } from "@/lib/seo";
import { trackEvent, trackInventoryCardClick, trackInventoryFilterChange } from "@/lib/analytics";

const TRADELINES_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663300423717/YgBCM3Vvv9dzqmN7qfKYzh/tradelines-hero-MgAogTaYj2uNyddmtjtsbi.webp";

type SortKey = "rank" | "postingDate" | "price" | "creditLimit" | "ageYears" | "cycles";

const SORT_DEFAULT_DIR: Record<SortKey, "asc" | "desc"> = {
  rank: "desc",
  postingDate: "asc",
  price: "asc",
  creditLimit: "desc",
  ageYears: "desc",
  cycles: "desc",
};

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

const getDateValue = (value?: string) => {
  if (!value) return Number.MAX_SAFE_INTEGER;
  const date = new Date(value);
  const time = date.getTime();
  return Number.isNaN(time) ? Number.MAX_SAFE_INTEGER : time;
};

const getRankScore = (item: TradelineItem) => {
  return (item.ageYears * 1000) + (item.creditLimit / 100) + (item.cycles * 75) - (item.price * 5);
};

const getSortValue = (item: TradelineItem, key: SortKey) => {
  switch (key) {
    case "rank":
      return getRankScore(item);
    case "postingDate":
      return getDateValue(item.postingDate);
    case "price":
      return item.price;
    case "creditLimit":
      return item.creditLimit;
    case "ageYears":
      return item.ageYears;
    case "cycles":
      return item.cycles;
    default:
      return item.price;
  }
};

function BankBadge({ bank }: { bank: string }) {
  const initials = bank
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <div className="w-11 h-11 bg-white/10 border border-white/10 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
      <span className="text-[11px] font-black tracking-wider text-neon">{initials || "BK"}</span>
    </div>
  );
}

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
  const [sortBy, setSortBy] = useState<SortKey>("rank");
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
      const diff = getSortValue(a, sortBy) - getSortValue(b, sortBy);
      if (diff !== 0) {
        return sortDir === "asc" ? diff : -diff;
      }
      return a.bank.localeCompare(b.bank) || a.id - b.id;
    });

    return items;
  }, [tradelines, searchTerm, categoryFilter, priceRange, creditLimitRange, ageRange, sortBy, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir(SORT_DEFAULT_DIR[key]);
    }
    trackEvent("inventory_sort_change", { sort_key: key });
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
    trackEvent("inventory_filters_reset");
  };

  const openTradeline = (tradeline: TradelineItem) => {
    trackInventoryCardClick({ id: tradeline.id, bank: tradeline.bank, price: tradeline.price });
    setSelectedTradeline(tradeline);
    setIsModalOpen(true);
  };

  const handlePriceRangeChange = (range: (typeof PRICE_RANGES)[number]) => {
    setPriceRange(range);
    trackInventoryFilterChange("price_range", range.label);
  };

  const handleCreditLimitRangeChange = (range: (typeof CREDIT_LIMIT_RANGES)[number]) => {
    setCreditLimitRange(range);
    trackInventoryFilterChange("credit_limit_range", range.label);
  };

  const handleAgeRangeChange = (range: (typeof AGE_RANGES)[number]) => {
    setAgeRange(range);
    trackInventoryFilterChange("age_range", range.label);
  };

  const handleCategoryFilterChange = (cat: string) => {
    setCategoryFilter(cat);
    trackInventoryFilterChange("category", cat);
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

      <section className="site-container py-8 sm:py-12">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-2xl">
          <div className="border-b border-white/10 px-5 py-4 sm:px-6">
            <h2 className="text-left text-xl font-bold text-white">Live Tradeline Options</h2>
            <p className="mt-1 text-sm text-white/60">View current options and pricing below.</p>
          </div>
          <div className="grid gap-3 border-b border-white/10 bg-[#0d1b33] p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
            {[
              ["Credit limit", "The card's total limit."],
              ["Account age", "How long the account has been open."],
              ["Posting date", "When the account may show on a report."],
              ["Price", "What the option costs."],
            ].map(([term, meaning]) => (
              <div key={term} className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                <p className="text-xs font-bold uppercase tracking-wider text-lime-300">{term}</p>
                <p className="mt-1 text-sm leading-5 text-white/70">{meaning}</p>
              </div>
            ))}
          </div>
          <iframe
            title="Live A1 Tradeline Booking Page"
            src="https://app.tradelinescore.com/authorized-user-tradeline/eXgzNXRrM1gyVXN3ZTBkMWo0U2xidz09"
            className="block h-[900px] w-full border-0 bg-white sm:h-[1100px]"
            allow="payment *"
          />
        </div>
      </section>

      <section className="hidden site-section" aria-hidden="true">
        <div className="site-container">
          <SectionReveal>
            <div className="mb-8 glass-panel rounded-2xl p-6 sm:p-8 border-l-4 border-emerald-500 bg-emerald-500/5">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-emerald-400">How to Read This Inventory</h3>
                  <p className="text-white/65 leading-relaxed">
                    The highlighted price shows the estimated monthly price. The total price is shown clearly underneath. The deadline is the latest day we need to purchase the tradeline so it can post by the target reporting date.
                  </p>
                  <p className="text-xs text-white/35 leading-relaxed">
                    Purchase and reporting dates are based on vendor inventory data and may vary. Authorized user tradelines do not guarantee score increases, approvals, funding, or specific credit outcomes.
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>

          <div className="sticky top-20 sm:top-24 lg:top-28 z-30 mb-6">
            <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-white/10 bg-void/80 backdrop-blur-xl shadow-2xl shadow-black/20">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col xl:flex-row gap-3 xl:items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by bank name..."
                      className="w-full bg-black/30 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm outline-none focus:border-neon/50 transition-all"
                    />
                  </div>

                  <button
                    onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all border touch-manipulation ${showFiltersPanel ? "bg-neon/10 border-neon/30 text-neon" : "bg-white/5 border-white/10 text-white/60 hover:text-white"}`}
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                  </button>
                </div>

                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <p className="text-sm text-white/35">
                    Showing <span className="text-white/70 font-mono font-bold">{filtered.length}</span> available tradelines
                  </p>
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-lg border border-neon/30 bg-neon/10 px-4 py-2.5 text-sm font-semibold text-neon hover:bg-neon hover:text-black transition-all">
                    Request Help Choosing
                    <Phone className="w-4 h-4" />
                  </Link>
                  <div className="flex flex-wrap gap-2">
                    {(["rank", "postingDate", "price", "creditLimit", "ageYears", "cycles"] as SortKey[]).map((key) => (
                      <button
                        key={key}
                        onClick={() => toggleSort(key)}
                        title={
                          key === "rank"
                            ? "Rank first by overall fit"
                            : key === "postingDate"
                              ? "Soonest reporting date first"
                              : key === "price"
                                ? "Lowest monthly price first"
                                : key === "creditLimit"
                                  ? "Highest limit first"
                                  : key === "ageYears"
                                    ? "Oldest accounts first"
                                    : "Longest reporting term first"
                        }
                        className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-all border ${sortBy === key ? "bg-neon/10 border-neon/30 text-neon" : "bg-white/5 border-white/10 text-white/40 hover:text-white"}`}
                      >
                        <ArrowUpDown className="w-3 h-3" />
                        {key === "rank"
                          ? "Rank"
                          : key === "postingDate"
                            ? "Soonest Report"
                            : key === "price"
                              ? "Total Price"
                              : key === "creditLimit"
                                ? "Limit"
                                : key === "ageYears"
                                  ? "Age"
                                  : "Months"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

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

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-3">Total Price</label>
                      <div className="space-y-2">
                        {PRICE_RANGES.map((range) => (
                          <button key={range.label} onClick={() => handlePriceRangeChange(range)} className={`w-full text-left px-3 py-3 rounded-lg text-sm transition-all border touch-manipulation ${priceRange.label === range.label ? "bg-neon/10 border-neon/30 text-neon font-medium" : "bg-white/5 border-white/10 text-white/60 hover:text-white/80"}`}>
                            {range.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-3">Credit Limit</label>
                      <div className="space-y-2">
                        {CREDIT_LIMIT_RANGES.map((range) => (
                          <button key={range.label} onClick={() => handleCreditLimitRangeChange(range)} className={`w-full text-left px-3 py-3 rounded-lg text-sm transition-all border touch-manipulation ${creditLimitRange.label === range.label ? "bg-neon/10 border-neon/30 text-neon font-medium" : "bg-white/5 border-white/10 text-white/60 hover:text-white/80"}`}>
                            {range.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-3">Account Age</label>
                      <div className="space-y-2">
                        {AGE_RANGES.map((range) => (
                          <button key={range.label} onClick={() => handleAgeRangeChange(range)} className={`w-full text-left px-3 py-3 rounded-lg text-sm transition-all border touch-manipulation ${ageRange.label === range.label ? "bg-neon/10 border-neon/30 text-neon font-medium" : "bg-white/5 border-white/10 text-white/60 hover:text-white/80"}`}>
                            {range.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-3">Category</label>
                      <div className="space-y-2">
                        {["All", "Premium", "Standard", "Economy"].map((cat) => (
                          <button key={cat} onClick={() => handleCategoryFilterChange(cat)} className={`w-full text-left px-3 py-3 rounded-lg text-sm transition-all border touch-manipulation ${categoryFilter === cat ? "bg-neon/10 border-neon/30 text-neon font-medium" : "bg-white/5 border-white/10 text-white/60 hover:text-white/80"}`}>
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
                  <thead className="bg-white/[0.04] text-[#A5D6FF] uppercase tracking-widest text-[12px]">
                    <tr>
                      <th className="text-left px-5 py-4 text-[#5DF136] text-sm">Bank</th>
                      <th className="text-right px-5 py-4 text-[#A5D6FF] text-sm">Limit</th>
                      <th className="text-right px-5 py-4 text-[#A5D6FF] text-sm">Age</th>
                      <th className="text-right px-5 py-4 text-[#A5D6FF] text-sm">Deadline</th>
                      <th className="text-right px-5 py-4 text-[#5DF136] text-sm">Posting Date</th>
                      <th className="text-right px-5 py-4 text-[#A5D6FF] text-sm">Reports For</th>
                      <th className="text-right px-5 py-4 text-[#A5D6FF] text-sm">Price</th>
                      <th className="text-right px-5 py-4 text-[#5DF136] text-sm">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filtered.map((t) => (
                      <tr key={t.id} className="hover:bg-white/[0.04] transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <BankBadge bank={t.bank} />
                            <div>
                              <p className="font-bold text-white">{t.bank}</p>
                              <p className="text-[11px] text-white/35 uppercase tracking-widest">{t.category} • $0 balance</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-right font-mono text-white/85">{formatCurrency(t.creditLimit)}</td>
                        <td className="px-5 py-4 text-right font-mono text-white/85">{t.ageYears} yrs</td>
                        <td className="px-5 py-4 text-right">
                          <span className="text-white/60">Buy by </span>
                          <span className="text-neon font-semibold">{formatDate(t.statementDate)}</span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <span className="text-white/60">Posts by </span>
                          <span className="text-neon font-semibold">{formatDate(t.postingDate)}</span>
                        </td>
                        <td className="px-5 py-4 text-right text-white/75">{getMonthLabel(t.cycles)}</td>
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
                    <motion.div key={t.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.02 }} className="tradeline-card rounded-2xl p-4 sm:p-5 space-y-4 transition-all duration-300 card-shine">
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
                          <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Posting Date</p>
                          <p className="text-sm font-bold text-neon mt-1">{formatDate(t.postingDate)}</p>
                        </div>
                      </div>

                      <div className="rounded-xl border border-amber-500/25 bg-amber-500/10 p-3 text-sm">
                        <p className="font-bold">
                          <span className="text-white/60">Purchase by </span>
                          <span className="text-neon">{formatDate(t.statementDate)}</span>
                        </p>
                        <p className="text-white/55 text-xs mt-1">
                          <span className="text-white/60">Posts by </span>
                          <span className="text-neon">{formatDate(t.postingDate)}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/15 border border-emerald-500/30 rounded-lg">
                        <Shield className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Clean Payment History • $0 Reported Balance</span>
                      </div>

                      <button onClick={() => openTradeline(t)} className="cta-primary w-full min-h-12">
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
            <div className="mt-16 glass-panel rounded-2xl p-6 sm:p-10 text-center neon-border-glow">
              <h3 className="text-2xl font-display font-extrabold mb-3">Need Help Choosing?</h3>
              <p className="text-white/45 mb-6 max-w-xl mx-auto">
                A1 Tradelines can help you compare age, limit, reporting term, purchase deadline, target reporting date, and total price before selecting an authorized user tradeline.
              </p>
              <a href="/contact" className="cta-primary w-full sm:w-auto">
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
