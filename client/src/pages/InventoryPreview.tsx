import { ExternalLink, ShieldCheck } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const vendorInventoryUrl =
  "https://app.tradelinescore.com/authorized-user-tradeline/eXgzNXRrM1gyVXN3ZTBkMWo0U2xidz09";

export default function InventoryPreview() {
  return (
    <div className="min-h-screen bg-[#f4f5f7] pt-20">
      <SEOHead
        title="Inventory Preview | A1 Tradelines"
        description="Private preview of the new authorized user tradeline inventory experience."
      />

      <section className="border-b border-slate-200 bg-white">
        <div className="site-container py-10 sm:py-14">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-amber-900">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Private preview — not live
            </div>
            <h1 className="text-left font-display text-5xl font-black tracking-[-.035em] text-[#12213f] sm:text-6xl">
              New Inventory Experience
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
              This is how the new vendor inventory will appear inside the A1 Tradelines redesign. The current inventory page and customer navigation remain unchanged.
            </p>
          </div>
        </div>
      </section>

      <section className="site-container py-8 sm:py-12">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
          <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-slate-700">
              Live vendor inventory embedded securely within A1 Tradelines
            </p>
            <a
              href={vendorInventoryUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900"
            >
              Open full-screen <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <iframe
            title="A1 Tradelines new inventory preview"
            src={vendorInventoryUrl}
            className="block h-[1100px] w-full border-0"
            allow="payment *"
          />
        </div>
      </section>
    </div>
  );
}
