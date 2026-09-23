'use client'

import { ArrowUpRight, Check, ChevronDown, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CardMarquee } from '@/components/card-marquee'
import { BookingModal } from '@/components/booking-modal'
import { AssessmentQuiz } from '@/components/assessment-quiz'
import { HomeInventoryPreview } from '@/components/home-inventory-preview'

const steps = [
  { number: '01', title: 'Browse available tradelines', body: 'Review card type, account age, credit limit, utilization, and pricing before you choose an option.' },
  { number: '02', title: 'Choose the right fit', body: 'We help you compare available tradelines and explain the purchase and reporting process clearly.' },
  { number: '03', title: 'Reserve your tradelines', body: 'Reserve online in minutes — no payment is collected until one of our specialists confirms your pick is the right fit.' },
]



const faqs = [
  ['Will this hurt my credit?', 'No. Getting started with A1 Tradelines does not require a hard credit inquiry.'],
  ['Is my personal information safe?', 'We treat your information with care and only ask for what is necessary to help you understand your options.'],
  ['How quickly can I get started?', 'Most people can complete the initial consultation in just a few minutes. We will explain next steps clearly.'],
  ['What if the tradeline does not post?', 'You are covered by reassignment or refund under the terms of your purchase agreement. See the agreement for the simple terms.'],
]

function CreditScoreMeter() {
  const [score, setScore] = useState(500)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)
  const scoreRef = useRef(500)
  const cyclesRef = useRef(0)

  useEffect(() => {
    lastScrollY.current = window.scrollY
    const updateScore = () => {
      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - lastScrollY.current
      if (Math.abs(scrollDelta) < 1) return
      const increasedScore = scoreRef.current + Math.abs(scrollDelta) * 0.55
      const reached850 = increasedScore >= 850
      const nextScore = reached850 ? 500 + ((increasedScore - 850) % 350) : increasedScore
      scoreRef.current = nextScore
      lastScrollY.current = currentScrollY
      setScore(Math.round(nextScore))
      if (reached850) {
        cyclesRef.current += 1
        if (cyclesRef.current >= 2) setHidden(true)
      }
    }
    window.addEventListener('scroll', updateScore, { passive: true })
    return () => window.removeEventListener('scroll', updateScore)
  }, [])

  if (hidden) return null

  return <aside className="score-meter" aria-label={`Credit score progress: ${score}`}><div className="flex items-center justify-between gap-8"><span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Your score journey</span><span className="font-mono text-xs text-primary">{score} / 850</span></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out" style={{ width: `${((score - 500) / 350) * 100}%` }} /></div><p className="mt-2 text-[11px] text-muted-foreground">Scroll to explore</p></aside>
}

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [assessmentOpen, setAssessmentOpen] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground motion-page">
      <CreditScoreMeter />
      <SiteHeader />

      <section id="top" className="relative overflow-hidden">
        <CardMarquee />
        <div className="relative z-[1] mx-auto max-w-7xl px-6 pb-16 pt-16 lg:px-10 lg:pb-24 lg:pt-24">
        <div className="max-w-4xl hero-content">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-primary"><span className="text-primary">Tradelines</span> available to buy</p>
          <h1 className="text-balance font-sans text-[2.75rem] font-semibold leading-[0.95] tracking-[-0.06em] sm:text-7xl lg:text-[7.25rem]">Buy <span className="text-primary">tradelines</span> with confidence.</h1>
          <p className="mt-8 max-w-xl text-pretty text-lg leading-7 text-muted-foreground">Review available <span className="text-primary">tradelines</span>, compare the details, and choose the tradeline that fits your goals.</p>
          <div className="mt-8 flex flex-wrap gap-3"><button onClick={() => setAssessmentOpen(true)} className="inline-flex items-center rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">Get my free analysis <ArrowUpRight className="ml-2 size-4" /></button><a href="/inventory" className="inline-flex items-center rounded-full border border-border px-6 py-4 text-sm font-medium text-foreground hover:bg-secondary">View available tradelines</a></div>
          <p className="mt-4 font-mono text-xs text-muted-foreground">Free analysis — no SSN needed · No credit pull · Takes 60 seconds</p>
        </div>
        <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-y border-border py-5 text-sm text-muted-foreground"><span className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> Privacy guarantee</span><span className="flex items-center gap-2"><Check className="size-4 text-primary" /> Clear tradeline details</span><span className="flex items-center gap-2"><Check className="size-4 text-primary" /> Posting guarantee: reassignment or refund</span></div>
        </div>
      </section>

      <section id="inventory" className="border-y border-border bg-secondary/30 reveal-section"><div className="mx-auto max-w-7xl px-6 py-12 md:py-20 lg:px-10 lg:py-28"><div className="flex flex-col justify-between gap-6 border-b border-border pb-6 md:pb-10 md:flex-row md:items-end"><div><p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">Tradelines available to buy</p><h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.05em] lg:text-6xl">Compare <span className="text-primary">tradelines</span> before you buy.</h2></div><p className="max-w-sm text-sm leading-6 text-muted-foreground">Every tradeline is reviewed before it is listed. Compare the details that matter, then contact us to confirm availability, pricing, and reporting.</p></div><div className="mt-8 hidden rounded-xl border border-border bg-background p-4 sm:p-6 md:block"><iframe width="100%" height="900" src="https://app.tradelinescore.com/authorized-user-tradeline/eXgzNXRrM1gyVXN3ZTBkMWo0U2xidz09" title="Tradeline Booking Page" style={{ border: 0, borderRadius: 12 }} className="w-full" /></div><div className="mt-6"><HomeInventoryPreview /></div><div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs leading-5 text-muted-foreground">Inventory updates in real time as tradelines are booked. Availability does not guarantee approval or a specific credit outcome.</p><Link href="/inventory" className="inline-flex items-center self-start rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">View live inventory <ArrowUpRight className="ml-2 size-4" /></Link></div><div className="mt-10 flex flex-col gap-4 border border-primary/30 bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" /><div><h3 className="font-medium tracking-tight">Our posting guarantee</h3><p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">If your tradeline does not post, you are covered by reassignment or refund under your purchase agreement.</p></div></div><a href="#faq" className="shrink-0 text-sm font-medium text-primary underline underline-offset-4">See guarantee terms</a></div></div></section>

      <section id="why-a1" className="border-y border-border bg-secondary/50 reveal-section">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-28"><div><p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">The A1 difference</p><h2 className="mt-5 max-w-sm text-4xl font-semibold leading-tight tracking-[-0.05em] lg:text-5xl">Tradelines done right, start to finish.</h2></div><div className="grid gap-0 border-t border-border sm:grid-cols-2"><article className="border-b border-border py-7 sm:pr-8"><span className="font-mono text-xs text-muted-foreground">01 / FREE CONSULTATION</span><h3 className="mt-5 text-xl font-medium tracking-tight">Free, no-pressure consultation</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Get straight answers before you spend a dollar. We break down exactly what a tradeline can and cannot do for you.</p></article><article className="border-b border-border py-7 sm:pl-8 sm:pr-2 sm:border-l"><span className="font-mono text-xs text-muted-foreground">02 / GUIDANCE</span><h3 className="mt-5 text-xl font-medium tracking-tight">Matched to your goals</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">We help you choose the right tradeline for your situation — no upselling, no tradelines you don&apos;t need.</p></article><article className="py-7 sm:pr-8"><span className="font-mono text-xs text-muted-foreground">03 / TRUST</span><h3 className="mt-5 text-xl font-medium tracking-tight">Secure and confidential</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Your information stays protected at every step. We handle your credit details with the care they deserve.</p></article><article className="py-7 sm:pl-8 sm:border-l"><span className="font-mono text-xs text-muted-foreground">04 / GUARANTEE</span><h3 className="mt-5 text-xl font-medium tracking-tight">Backed by our guarantee</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">If your tradeline doesn&apos;t post, you&apos;re covered by reassignment or refund per your purchase agreement. Clear expectations, honest results.</p></article></div></div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-12 md:py-20 lg:px-10 lg:py-32"><div className="flex flex-col justify-between gap-4 border-b border-border pb-6 md:flex-row md:items-end md:gap-6 md:pb-10"><div><p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">A simple start</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] lg:text-6xl">Less overwhelm.<br />More direction.</h2></div><p className="max-w-xs text-sm leading-6 text-muted-foreground">We make the process simple and easy to understand, every step of the way.</p></div><div className="grid gap-5 pt-6 md:grid-cols-3 md:gap-10 md:pt-10 reveal-grid">{steps.map((step) => <article key={step.number} className="border-t-2 border-primary pt-4 md:pt-5"><span className="font-mono text-xs text-muted-foreground">{step.number}</span><h3 className="mt-3 max-w-xs text-xl font-medium leading-tight tracking-[-0.04em] md:mt-8 md:text-2xl">{step.title}</h3><p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground md:mt-4">{step.body}</p></article>)}</div></section>


      <section className="bg-primary text-primary-foreground"><div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-20 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:py-28"><div><p className="font-mono text-xs uppercase tracking-[0.22em] text-primary-foreground/60">Start with a conversation</p><h2 className="mt-5 max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] lg:text-7xl">You do not have to figure it out alone.</h2></div><button onClick={() => setAssessmentOpen(true)} className="inline-flex shrink-0 items-center self-start rounded-full bg-background px-6 py-4 text-sm font-medium text-foreground hover:bg-background/90 lg:self-end">Get my free analysis <ArrowUpRight className="ml-2 size-4" /></button></div></section>

      <section id="faq" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28"><div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">Good questions</p><h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] lg:text-5xl">FAQ</h2></div><div className="border-t border-border">{faqs.map(([question, answer], index) => <div key={question} className="border-b border-border"><button className="flex w-full items-center justify-between py-6 text-left text-lg font-medium" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>{question}<ChevronDown className={`size-5 text-muted-foreground transition-transform ${openFaq === index ? 'rotate-180' : ''}`} /></button>{openFaq === index && <p className="max-w-xl pb-6 text-sm leading-6 text-muted-foreground">{answer}</p>}</div>)}</div></div></section>

      <SiteFooter />

      <AssessmentQuiz
        open={assessmentOpen}
        onClose={() => setAssessmentOpen(false)}
        onComplete={(answers) => {
          setQuizAnswers(answers)
          setAssessmentOpen(false)
          setBookingOpen(true)
        }}
      />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} answers={quizAnswers} source="quiz" />
    </main>
  )
}
