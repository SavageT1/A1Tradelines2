'use client'

import { ArrowLeft, ArrowRight, Check, ShieldCheck } from 'lucide-react'
import { useState } from 'react'

type Question = {
  key: string
  label: string
  helper: string
  options: string[]
}

const questions: Question[] = [
  {
    key: 'goal',
    label: 'What are you hoping to achieve?',
    helper: 'This helps us tailor your free analysis.',
    options: [
      'Boost my credit score',
      'Qualify for a mortgage or auto loan',
      'Rebuild after past setbacks',
      'Just exploring my options',
    ],
  },
  {
    key: 'timeline',
    label: 'When do you need results?',
    helper: 'Timing shapes which tradelines fit best.',
    options: ['As soon as possible', 'Within 1–3 months', 'In 3–6 months', 'No specific deadline'],
  },
  {
    key: 'budget',
    label: 'What budget range are you considering?',
    helper: 'A ballpark is fine — nothing is charged now.',
    options: ['$500 – $1,000', '$1,000 – $2,000', '$2,000+', 'Not sure yet'],
  },
]

export function AssessmentQuiz({
  open,
  onClose,
  onComplete,
}: {
  open: boolean
  onClose: () => void
  onComplete: (answers: Record<string, string>) => void
}) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  if (!open) return null

  const total = questions.length
  const isSummary = step >= total
  const progress = Math.min(step, total) / total

  const select = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
    setStep((s) => s + 1)
  }

  const reset = () => {
    setStep(0)
    setAnswers({})
  }

  const close = () => {
    onClose()
    reset()
  }

  const finish = () => {
    onComplete(answers)
    reset()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-0 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Free credit analysis assessment">
      <div className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-border bg-background shadow-2xl sm:rounded-3xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-primary" />
            <span className="font-sans text-sm font-semibold tracking-[-0.02em]">Free credit analysis</span>
          </div>
          <button onClick={close} aria-label="Close assessment" className="rounded-full px-3 py-1 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            Close
          </button>
        </div>

        {/* Progress */}
        <div className="h-1 w-full bg-secondary">
          <div className="h-full bg-primary transition-[width] duration-300 ease-out" style={{ width: `${(isSummary ? 1 : progress) * 100}%` }} />
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-8">
          {!isSummary ? (
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                Question {step + 1} of {total}
              </p>
              <h2 className="mt-3 text-balance text-2xl font-semibold tracking-[-0.03em]">{questions[step].label}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{questions[step].helper}</p>

              <div className="mt-6 flex flex-col gap-3">
                {questions[step].options.map((option) => {
                  const selected = answers[questions[step].key] === option
                  return (
                    <button
                      key={option}
                      onClick={() => select(questions[step].key, option)}
                      className={`flex items-center justify-between rounded-xl border px-4 py-4 text-left text-sm font-medium transition-colors ${
                        selected ? 'border-primary bg-primary/5 text-foreground' : 'border-border hover:border-primary/50 hover:bg-secondary'
                      }`}
                    >
                      {option}
                      <ArrowRight className={`size-4 shrink-0 transition-colors ${selected ? 'text-primary' : 'text-muted-foreground'}`} />
                    </button>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10">
                <Check className="size-7 text-primary" />
              </div>
              <h2 className="mt-5 text-balance text-2xl font-semibold tracking-[-0.03em]">Your free analysis is ready to begin</h2>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                Based on your answers, one of our specialists will walk you through the tradelines that fit your goals — with no payment collected until you confirm your pick is the right fit.
              </p>

              <dl className="mx-auto mt-6 grid max-w-sm gap-2 text-left">
                {questions.map((q) => (
                  <div key={q.key} className="flex items-center justify-between gap-4 rounded-lg bg-secondary/60 px-4 py-2.5 text-sm">
                    <dt className="text-muted-foreground">{q.label.replace(/\?$/, '')}</dt>
                    <dd className="shrink-0 font-medium">{answers[q.key]}</dd>
                  </div>
                ))}
              </dl>

              <button
                onClick={finish}
                className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Book my free consultation
                <ArrowRight className="ml-2 size-4" />
              </button>
            </div>
          )}
        </div>

        {/* Footer: reassurance + back */}
        <div className="flex items-center justify-between gap-4 border-t border-border px-6 py-4">
          {step > 0 && !isSummary ? (
            <button onClick={() => setStep((s) => s - 1)} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft className="size-4" /> Back
            </button>
          ) : (
            <span />
          )}
          <p className="text-right text-[11px] font-medium text-muted-foreground">Free analysis — no SSN needed · No credit pull · Takes 60 seconds</p>
        </div>
      </div>
    </div>
  )
}
