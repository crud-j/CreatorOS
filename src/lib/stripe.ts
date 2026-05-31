const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:4000'

export type PlanTier     = 'pro' | 'agency'
export type BillingCycle = 'monthly' | 'annual'

interface CheckoutOptions {
  tier:         PlanTier
  billingCycle: BillingCycle
  userId:       string
  userEmail:    string
}

interface CheckoutResponse {
  url:       string
  sessionId: string
}

export async function redirectToCheckout(options: CheckoutOptions): Promise<void> {
  const response = await fetch(`${BACKEND_URL}/api/stripe/create-checkout-session`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(options),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' })) as { error?: string }
    throw new Error(error.error ?? `HTTP ${response.status}`)
  }

  const data = (await response.json()) as CheckoutResponse

  if (!data.url) throw new Error('No checkout URL returned from server')

  window.location.href = data.url
}
