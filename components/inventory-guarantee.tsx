import { ShieldCheck } from 'lucide-react'

export function InventoryGuarantee() {
  return (
    <div className="mt-8 flex items-start gap-3 border border-primary/30 bg-primary/5 p-6 text-sm leading-6 text-muted-foreground">
      <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
      <span>If your tradeline does not post to your credit report, you are covered by reassignment or refund. Review the purchase agreement for complete guarantee terms.</span>
    </div>
  )
}
