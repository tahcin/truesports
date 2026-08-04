'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Custom select, styled to the site instead of the OS. A native <select>
 * can't style its option list, so the popup here is our own listbox: cream
 * panel, hairline border, green active state, same as the header menus.
 *
 * Accessibility: combobox/listbox pattern. Focus stays on the trigger and
 * aria-activedescendant tracks the highlighted option; arrows move it,
 * Enter/Space select, Escape closes, Home/End jump. A hidden input carries
 * the value so FormData sees a normal field.
 */

export type SelectOption = { value: string; label: string }

export function Select({
  id,
  name,
  options,
  defaultValue = '',
  className = '',
}: {
  id: string
  name: string
  options: SelectOption[]
  defaultValue?: string
  /** Trigger styling, pass the form's shared field classes. */
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(defaultValue)
  const [active, setActive] = useState(() =>
    Math.max(0, options.findIndex((o) => o.value === defaultValue)),
  )
  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    if (!open) return
    const onOutside = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onOutside)
    return () => document.removeEventListener('pointerdown', onOutside)
  }, [open])

  useEffect(() => {
    if (!open) return
    listRef.current
      ?.querySelector(`#${id}-opt-${active}`)
      ?.scrollIntoView({ block: 'nearest' })
  }, [open, active, id])

  const openList = () => {
    setActive(Math.max(0, options.findIndex((o) => o.value === value)))
    setOpen(true)
  }

  const choose = (index: number) => {
    setValue(options[index].value)
    setOpen(false)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (!open) openList()
        else setActive((a) => Math.min(a + 1, options.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        if (!open) openList()
        else setActive((a) => Math.max(a - 1, 0))
        break
      case 'Home':
        if (open) {
          e.preventDefault()
          setActive(0)
        }
        break
      case 'End':
        if (open) {
          e.preventDefault()
          setActive(options.length - 1)
        }
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (open) choose(active)
        else openList()
        break
      case 'Escape':
        if (open) {
          e.preventDefault()
          setOpen(false)
        }
        break
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={`${id}-listbox`}
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`flex items-center justify-between gap-3 text-left ${className}`}
      >
        <span className="truncate">{selected?.label ?? ''}</span>
        <svg
          viewBox="0 0 12 8"
          aria-hidden
          className={`size-3 shrink-0 text-ink-faint transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path
            d="M1 1.5 6 6.5 11 1.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul
          ref={listRef}
          id={`${id}-listbox`}
          role="listbox"
          className="absolute inset-x-0 top-full z-20 mt-1.5 max-h-72 overflow-auto border border-hairline bg-cream py-1.5 shadow-[0_12px_28px_-14px_rgba(36,31,33,0.4)] animate-[panel-drop_150ms_cubic-bezier(0.2,0.7,0.3,1)]"
        >
          {options.map((o, i) => (
            <li
              key={o.value || '__none'}
              id={`${id}-opt-${i}`}
              role="option"
              aria-selected={o.value === value}
              onPointerEnter={() => setActive(i)}
              onClick={() => choose(i)}
              className={`cursor-pointer px-3.5 py-2.5 text-[0.9375rem] transition-colors ${
                i === active ? 'bg-green/10 text-green-deep' : ''
              } ${o.value === value ? 'font-semibold' : ''}`}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
