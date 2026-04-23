'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

const STORAGE_KEY = 'ml-cookie-consent'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (!saved) {
        const t = window.setTimeout(() => setVisible(true), 600)
        return () => window.clearTimeout(t)
      }
    } catch {
      setVisible(true)
    }
  }, [])

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-4 left-4 right-4 md:right-auto md:left-6 md:bottom-6 z-[60] max-w-sm rounded-xl border border-[hsl(var(--border))] bg-white/95 backdrop-blur px-4 py-3 shadow-[var(--shadow-card)]"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Fechar aviso de cookies"
        className="absolute top-2 right-2 rounded-md p-1 text-[var(--text-muted)] hover:text-[var(--palette-darkest)] hover:bg-[var(--bg-warm-2)] transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
      <p className="text-sm text-[var(--text-secondary)] pr-6 leading-relaxed">
        Usamos cookies para melhorar sua experiência e medir o uso do site.{' '}
        <Link
          href="/politica-de-privacidade"
          className="text-[var(--palette-dark)] underline underline-offset-2 hover:text-[var(--palette-mid)]"
        >
          Saiba mais
        </Link>
        .
      </p>
      <button
        type="button"
        onClick={dismiss}
        className="mt-3 w-full rounded-md bg-[var(--palette-mid)] px-3 py-1.5 text-sm font-medium text-white hover:bg-[var(--palette-dark)] transition-colors"
      >
        Entendi
      </button>
    </div>
  )
}
