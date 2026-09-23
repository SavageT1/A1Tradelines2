import { Fragment } from 'react'

// Renders a title string with the word "tradelines" (any casing) in forest green.
export function HighlightTradelines({ text }: { text: string }) {
  const parts = text.split(/(tradelines)/gi)
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === 'tradelines' ? (
          <span key={i} className="text-primary">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}
