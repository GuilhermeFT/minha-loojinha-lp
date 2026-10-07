// Origem da visita (UTMs, fbclid, gclid) guardada num cookie do domínio raiz
// .minhaloojinha.com.br, compartilhado entre a LP e o painel. Mesmo formato de
// minha-loojinha-dashboard/src/lib/tracking/attribution.ts: se mudar um, mude o outro.

export const ATTRIBUTION_COOKIE = 'ml_attr'
const MAX_AGE_DAYS = 90
const PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'] as const

export type Touch = Partial<Record<(typeof PARAMS)[number], string>> & {
  landing?: string
  /** Momento da visita, em ms; usado no formato do fbc. */
  ts: number
}
export type Attribution = { first?: Touch; last?: Touch }

export function parseAttribution(raw: string | undefined | null): Attribution {
  if (!raw) return {}
  try {
    return JSON.parse(decodeURIComponent(raw)) as Attribution
  } catch {
    return {}
  }
}

/**
 * fbc no formato da Meta (fb.1.<ms>.<fbclid>), montado a partir do fbclid
 * quando o cookie _fbc do Pixel não existe (ex.: Pixel bloqueado).
 */
export function fbcFromAttribution(attr: Attribution): string | null {
  const touch = attr.last?.fbclid ? attr.last : attr.first?.fbclid ? attr.first : null
  return touch?.fbclid ? `fb.1.${touch.ts}.${touch.fbclid}` : null
}

/** Achata o primeiro e o último toque em pares chave/valor curtos (metadata do Stripe). */
export function attributionToMetadata(attr: Attribution): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [prefix, touch] of [['ft', attr.first], ['lt', attr.last]] as const) {
    if (!touch) continue
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const) {
      if (touch[key]) out[`${prefix}_${key}`] = touch[key]!.slice(0, 200)
    }
  }
  return out
}

/** Navegador: registra a visita atual se ela trouxer UTM ou id de clique. */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  const touch: Touch = { ts: Date.now(), landing: window.location.pathname }
  let hasSignal = false
  for (const key of PARAMS) {
    const value = params.get(key)
    if (value) {
      touch[key] = value.slice(0, 500)
      hasSignal = true
    }
  }
  if (!hasSignal) return

  const current = parseAttribution(readCookie(ATTRIBUTION_COOKIE))
  const next: Attribution = { first: current.first ?? touch, last: touch }

  // Domínio raiz para a LP (minhaloojinha.com.br) e o painel (painel.minhaloojinha.com.br) lerem o mesmo cookie
  const host = window.location.hostname
  const domain = host.endsWith('minhaloojinha.com.br') ? '; domain=.minhaloojinha.com.br' : ''
  document.cookie =
    `${ATTRIBUTION_COOKIE}=${encodeURIComponent(JSON.stringify(next))}; path=/; max-age=${MAX_AGE_DAYS * 86400}; SameSite=Lax${domain}` +
    (window.location.protocol === 'https:' ? '; Secure' : '')
}

export function readCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  return document.cookie
    .split('; ')
    .find((c) => c.startsWith(`${name}=`))
    ?.slice(name.length + 1)
}
