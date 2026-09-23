'use client'

import Script from 'next/script'

// A1 Contact Form — standard GoHighLevel inline embed.
// The iframe points at the public form URL; form_embed.js auto-resizes the
// iframe height by posting messages keyed to the iframe id (inline-<formId>).
//
// `prefill` appends GoHighLevel form pre-fill params (?custom.<field_key>=…)
// so data captured earlier in the visit (e.g. quiz answers saved to the
// matching custom fields) lands on the contact record at submit time. The
// custom fields must exist on the form in GHL for the values to be saved.
const FORM_ID = 'KhzTR8K1KHiASdCuQiD9'
const FORM_URL = `https://api.leadconnectorhq.com/widget/form/${FORM_ID}`

export function GhlForm({
  minHeight = 640,
  prefill,
}: {
  minHeight?: number
  prefill?: Record<string, string>
}) {
  const params = new URLSearchParams()
  if (prefill) {
    for (const [key, value] of Object.entries(prefill)) {
      if (value) params.set(`custom.${key}`, value)
    }
  }
  const query = params.toString()
  const src = query ? `${FORM_URL}?${query}` : FORM_URL

  return (
    <div className="rounded-2xl border border-border bg-[#FAFAF7] p-6 sm:p-8">
      <iframe
        src={src}
        id={`inline-${FORM_ID}`}
        title="A1 Contact Form"
        loading="lazy"
        style={{ width: '100%', minHeight, border: 'none', borderRadius: 3 }}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-form-id={FORM_ID}
        data-layout-iframe-id={`inline-${FORM_ID}`}
        data-form-name="A1 Contact Form"
      />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </div>
  )
}
