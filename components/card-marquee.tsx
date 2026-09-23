import { Wifi } from 'lucide-react'

type CardVariant = {
  id: string
  className: string
  label: string
  chip: string
}

const cards: CardVariant[] = [
  { id: 'a', className: 'marquee-card--primary', label: 'A1', chip: 'chip--gold' },
  { id: 'b', className: 'marquee-card--dark', label: 'A1', chip: 'chip--silver' },
  { id: 'c', className: 'marquee-card--sage', label: 'A1', chip: 'chip--gold' },
  { id: 'd', className: 'marquee-card--ivory', label: 'A1', chip: 'chip--silver' },
  { id: 'e', className: 'marquee-card--forest', label: 'A1', chip: 'chip--gold' },
]

function CreditCard({ variant }: { variant: CardVariant }) {
  return (
    <div className={`marquee-card ${variant.className}`} aria-hidden="true">
      <div className="flex items-start justify-between">
        <span className="marquee-card__brand">
          {variant.label} <span className="marquee-card__brand-accent">Tradelines</span>
        </span>
        <Wifi className="size-4 rotate-90 opacity-70" />
      </div>
      <div className={`marquee-card__chip ${variant.chip}`} />
      <div className="marquee-card__number">
        <span>••••</span>
        <span>••••</span>
        <span>••••</span>
        <span>4021</span>
      </div>
      <div className="marquee-card__footer">
        <span>MEMBER SINCE</span>
        <span>'14</span>
      </div>
    </div>
  )
}

function Row({ reverse }: { reverse?: boolean }) {
  const sequence = reverse ? [...cards].reverse() : cards
  const doubled = [...sequence, ...sequence]
  return (
    <div className={`marquee-row ${reverse ? 'marquee-row--reverse' : ''}`}>
      <div className="marquee-track">
        {doubled.map((c, i) => (
          <CreditCard key={`${c.id}-${i}`} variant={c} />
        ))}
      </div>
    </div>
  )
}

export function CardMarquee() {
  return (
    <div className="card-marquee" aria-hidden="true">
      <Row />
      <Row reverse />
    </div>
  )
}
