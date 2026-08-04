'use client'

import { useEffect, useState } from 'react'
import { whatsappHref } from '@/content/site'

/**
 * Floating WhatsApp launcher, fixed to the bottom-right on every page.
 * WhatsApp is the client's stated primary conversion channel, so this is the
 * one element allowed to sit on top of the page at all times.
 *
 * A speech bubble above the button rotates through short nudges. It has a
 * tail aimed at the icon and pops from the icon's corner (origin-bottom-right)
 * so it reads as the button speaking. The × dismisses it for the rest of the
 * browsing session (sessionStorage), and lives OUTSIDE the link so closing it
 * never navigates.
 *
 * z-40 keeps it under the header and the mobile nav drawer (both z-50).
 * The right offset mirrors the page `gutter` clamp (globals.css) so the
 * button tracks the same horizontal rhythm as the content, and it grows on
 * desktop where 56px reads tiny.
 */

const nudges = [
  'Questions? Talk to us',
  'Book a free trial',
  'We reply the same day',
  'Not sure which sport? Ask us',
]

const ROTATE_MS = 4000
const DISMISS_KEY = 'ts-wapp-nudge-dismissed'

export function WhatsAppFab() {
  const [index, setIndex] = useState(0)
  // Start hidden and reveal after the sessionStorage check, so a returning
  // visitor who dismissed it never sees a flash of the bubble.
  const [showNudge, setShowNudge] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY) !== '1') setShowNudge(true)
  }, [])

  useEffect(() => {
    if (!showNudge) return
    const id = setInterval(() => setIndex((i) => (i + 1) % nudges.length), ROTATE_MS)
    return () => clearInterval(id)
  }, [showNudge])

  const dismiss = () => {
    setShowNudge(false)
    sessionStorage.setItem(DISMISS_KEY, '1')
  }

  return (
    <div className="fixed bottom-[clamp(1.25rem,3vw,2.25rem)] right-[clamp(1.25rem,4.5vw,7rem)] z-40 flex flex-col items-end">
      {showNudge && (
        <div
          key={index}
          className="group/bubble relative mb-3 origin-bottom-right animate-[bubble-pop_360ms_cubic-bezier(0.2,0.7,0.3,1)]"
        >
          <div className="rounded-full border border-hairline bg-cream px-4 py-2 shadow-[0_2px_12px_rgba(36,31,33,0.14)]">
            {/* aria-hidden: the rotating text repeats the link's purpose, and
                a live region cycling every 4s would be screen-reader noise. */}
            <span aria-hidden className="whitespace-nowrap text-[0.8125rem] font-semibold text-ink">
              {nudges[index]}
            </span>
          </div>
          {/* Dismiss. Corner badge, revealed on hover/focus. Coarse pointers
              (touch) have no hover, so there it stays visible; without that
              the bubble would be un-dismissable on exactly the devices where
              screen space matters most. */}
          <button
            type="button"
            onClick={dismiss}
            aria-label="Hide this message"
            className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full border border-hairline bg-cream text-ink-faint opacity-0 shadow-[0_1px_6px_rgba(36,31,33,0.16)] transition-opacity duration-150 hover:text-ink focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-deep group-hover/bubble:opacity-100 [@media(pointer:coarse)]:opacity-100"
          >
            <svg viewBox="0 0 12 12" aria-hidden className="size-2.5">
              <path
                d="M2 2l8 8M10 2l-8 8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
          {/* Tail: a rotated square hanging off the bubble's bottom edge,
              horizontally centred on the icon below (right offset = half the
              icon width minus half the tail). */}
          <span
            aria-hidden
            className="absolute -bottom-[5px] right-[23px] size-2.5 rotate-45 border-b border-r border-hairline bg-cream md:right-[31px]"
          />
        </div>
      )}

      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="flex size-14 items-center justify-center rounded-full bg-green text-cream shadow-[0_4px_16px_rgba(36,31,33,0.25)] transition-transform duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-deep motion-reduce:transition-none motion-reduce:hover:scale-100 md:size-[4.5rem]"
      >
        <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden className="size-7 md:size-9">
          <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.59 4.46 1.71 6.4L3.2 28.8l6.58-1.67a12.74 12.74 0 0 0 6.22 1.6h.01c7.06 0 12.79-5.74 12.79-12.8 0-3.42-1.33-6.63-3.75-9.05a12.72 12.72 0 0 0-9.05-3.68Zm0 23.36h-.01c-1.91 0-3.79-.51-5.42-1.48l-.39-.23-4.03 1.02 1.08-3.93-.26-.4a10.6 10.6 0 0 1-1.62-5.64c0-5.87 4.78-10.64 10.66-10.64 2.84 0 5.51 1.11 7.52 3.12a10.57 10.57 0 0 1 3.11 7.53c0 5.87-4.78 10.65-10.64 10.65Zm5.84-7.97c-.32-.16-1.89-.93-2.19-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.89-.77 2.16-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
        </svg>
      </a>
    </div>
  )
}
