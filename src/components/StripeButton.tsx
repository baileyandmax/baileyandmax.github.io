import { useEffect, useRef, useState } from 'react'

interface StripeButtonProps {
  buyButtonId: string
  publishableKey: string
}

export function StripeButton({ buyButtonId, publishableKey }: StripeButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let stripeBuyButton: HTMLElement | null = null
    let loaded = false

    // Wait for Stripe script to load
    const waitForStripe = setInterval(() => {
      if (customElements.get('stripe-buy-button')) {
        clearInterval(waitForStripe)
        loaded = true
        
        // Create the stripe-buy-button element
        stripeBuyButton = document.createElement('stripe-buy-button')
        stripeBuyButton.setAttribute('buy-button-id', buyButtonId)
        stripeBuyButton.setAttribute('publishable-key', publishableKey)

        // Append the button
        container.appendChild(stripeBuyButton)
        setIsLoading(false)
      }
    }, 100)

    // Timeout after 10 seconds
    const timeout = setTimeout(() => {
      clearInterval(waitForStripe)
      if (!loaded) {
        setError(true)
        setIsLoading(false)
      }
    }, 10000)

    return () => {
      clearInterval(waitForStripe)
      clearTimeout(timeout)
      // Clean up the button element if it exists
      if (stripeBuyButton && container.contains(stripeBuyButton)) {
        container.removeChild(stripeBuyButton)
      }
    }
  }, [buyButtonId, publishableKey])

  return (
    <div ref={containerRef} className="stripe-button-container">
      {isLoading && <p style={{ color: '#64748b' }}>Loading contribution options...</p>}
      {error && <p style={{ color: '#dc2626' }}>Failed to load contribution button. Please refresh the page.</p>}
    </div>
  )
}

