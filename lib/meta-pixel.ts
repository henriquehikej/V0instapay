// Meta Pixel Event Tracker
// Dispara eventos para ambos os pixels: 1648896763111109 e 911693154918272

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void
  }
}

export function trackAddToCart(value?: number, currency: string = 'BRL') {
  if (typeof window !== 'undefined' && window.fbq) {
    // Dispara AddToCart para ambos os pixels
    window.fbq('track', 'AddToCart', {
      content_type: 'product',
      content_name: 'Saque InstaPix',
      value: value ? value / 100 : 3834.72,
      currency: currency,
    })
  }
}

export function trackInitiateCheckout(value?: number, currency: string = 'BRL') {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_type: 'product',
      content_name: 'Saque InstaPix',
      value: value ? value / 100 : 3834.72,
      currency: currency,
    })
  }
}

export function trackLead() {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead')
  }
}
