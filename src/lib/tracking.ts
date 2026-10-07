// Navegador: um evento vai para o Pixel da Meta (com eventID para deduplicar com a
// Conversions API) e para o dataLayer do GTM, onde a tag do GA4 o recebe.

type Fbq = (...args: unknown[]) => void
declare global {
  interface Window {
    fbq?: Fbq
    dataLayer?: Record<string, unknown>[]
  }
}

// Eventos padrão da Meta usam fbq('track'); os nossos, fbq('trackCustom')
const META_STANDARD_EVENTS = new Set(['PageView', 'Lead', 'CompleteRegistration', 'StartTrial', 'Subscribe', 'Purchase'])

type TrackOptions = {
  /** Nome do evento na Meta (ex.: StartTrial); sem ele, vai só para o GA4. */
  metaEvent?: string
  /** Nome do evento no GA4 (ex.: begin_trial). */
  ga4Event: string
  /** Igual ao event_id enviado pelo servidor, quando houver envio duplo. */
  eventId?: string
  params?: Record<string, unknown>
}

export function trackEvent({ metaEvent, ga4Event, eventId, params = {} }: TrackOptions): void {
  if (typeof window === 'undefined') return
  if (metaEvent) {
    window.fbq?.(
      META_STANDARD_EVENTS.has(metaEvent) ? 'track' : 'trackCustom',
      metaEvent,
      params,
      eventId ? { eventID: eventId } : undefined,
    )
  }
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event: ga4Event, ...params })
}
