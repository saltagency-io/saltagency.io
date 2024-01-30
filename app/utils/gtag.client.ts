declare global {
  interface Window {
    gtag(
      option: string,
      gaTrackingId: string,
      options: Record<string, unknown>,
    ): void
  }
}

function warn() {
  if (ENV.NODE_ENV !== 'development') {
    console.warn(
      'window.gtag is not defined. This could mean your google analytics script has not loaded on the page yet.',
    )
  }
}

export function pageView(url: string, trackingId: string) {
  if (!window.gtag) {
    warn()
    return
  }
  window.gtag('config', trackingId, {
    page_path: url,
  })
}

export function event({
  action,
  category,
  label,
  value,
  group,
}: Record<string, string>) {
  if (!window.gtag) {
    warn()
    return
  }
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    send_to: group,
    value: value,
  })
}
