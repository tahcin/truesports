'use client'

import { useState } from 'react'
import { programs, savyaFit } from '@/content/programs'
import { whatsappHref } from '@/content/site'
import { Select } from './select'

/**
 * Enquiry form. Fields per the client brief: Name, Phone, Email,
 * Program of Interest, Message (02-brief/website-requirements.md §2.6).
 *
 * Submits to /api/enquiry, which appends a row to the client's Google Sheet
 * via an Apps Script webhook (06-build/google-sheet-webhook/README.md).
 * If the endpoint fails (webhook down, env var missing), the error state
 * offers a WhatsApp handoff with the same details, so no enquiry is lost.
 */
export function EnquiryForm({ defaultProgram }: { defaultProgram?: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [waFallback, setWaFallback] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const payload = {
      name: String(data.get('name') ?? ''),
      phone: String(data.get('phone') ?? ''),
      email: String(data.get('email') ?? ''),
      program: String(data.get('program') ?? ''),
      message: String(data.get('message') ?? ''),
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`enquiry endpoint responded ${res.status}`)
      setStatus('sent')
    } catch {
      setWaFallback(
        [
          `Hi! I'd like to enquire about ${payload.program || 'your programs'}.`,
          '',
          `Name: ${payload.name}`,
          `Phone: ${payload.phone}`,
          payload.email ? `Email: ${payload.email}` : '',
          payload.message ? `\n${payload.message}` : '',
        ]
          .filter(Boolean)
          .join('\n'),
      )
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div aria-live="polite" className="border border-hairline bg-cream-deep p-7">
        <p className="mb-2 font-display text-display-s">Thanks, we&rsquo;ve got it.</p>
        <p className="text-[0.9375rem] text-ink-soft">
          We usually reply the same day. If it&rsquo;s urgent, WhatsApp us on{' '}
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="font-semibold text-green-deep">
            +91 89047 28080
          </a>
          .
        </p>
      </div>
    )
  }

  const field =
    'min-h-12 w-full border border-hairline bg-cream px-3.5 py-3 text-base transition-colors placeholder:text-ink-faint focus:border-green-deep focus:outline-none sm:text-[0.9375rem]'
  const label = 'micro mb-2 block text-ink-soft'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Your name <span className="text-orange-deep">*</span>
          </label>
          <input id="name" name="name" required className={field} placeholder="Priya Sharma" />
        </div>
        <div>
          <label htmlFor="phone" className={label}>
            Phone <span className="text-orange-deep">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className={field}
            placeholder="+91 98765 43210"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={label}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={field}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="program" className={label}>
          Program of interest
        </label>
        <Select
          id="program"
          name="program"
          defaultValue={defaultProgram ?? ''}
          className={field}
          options={[
            { value: '', label: "I'm not sure yet, please advise" },
            ...programs.map((p) => ({ value: p.name, label: p.name })),
            { value: savyaFit.name, label: savyaFit.name },
            { value: 'School partnership', label: 'School partnership' },
            { value: 'Bring True Sport to my community', label: 'Bring True Sport to my community' },
          ]}
        />
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${field} resize-y`}
          placeholder="Your child's age, and anything you'd like us to know."
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="group inline-flex min-h-12 items-center gap-2 rounded-sm bg-orange px-5 py-3 text-[0.9375rem] font-semibold text-ink transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_20px_-10px_rgba(36,31,33,0.5)] disabled:pointer-events-none disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send enquiry'}
        <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </button>

      <p aria-live="polite" className="text-[0.8125rem] text-ink-soft">
        {status === 'error' ? (
          <>
            Something went wrong sending that.{' '}
            <a
              href={whatsappHref(waFallback)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-green-deep"
            >
              Send it via WhatsApp instead →
            </a>
          </>
        ) : (
          'We usually reply the same day.'
        )}
      </p>
    </form>
  )
}
