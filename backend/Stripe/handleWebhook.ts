import type { Request, Response } from 'express'
import { stripe } from './stripeClient'
import { supabaseAdmin } from '../AuthFunctionality/supabaseAdmin'

// Derive Stripe types from the stripe instance to avoid module resolution issues
// across different tsconfig moduleResolution modes (bundler vs node10)
type StripeEvent = ReturnType<typeof stripe.webhooks.constructEvent>

// These are lightweight structural types instead of Stripe SDK namespace imports
interface CheckoutSessionLike {
  metadata?: Record<string, string> | null
  subscription?: string | object | null
  customer?: string | object | null
}

interface SubscriptionLike {
  id: string
  status: string
  metadata?: Record<string, string> | null
  items: {
    data: Array<{
      price?: { id: string } | null
    }>
  }
}

interface InvoiceLike {
  customer?: string | object | null
}

function getPlanFromPriceId(priceId: string): 'pro' | 'agency' | null {
  const priceMap: Record<string, 'pro' | 'agency'> = {
    [process.env.STRIPE_PRO_MONTHLY_PRICE_ID    ?? 'unset']: 'pro',
    [process.env.STRIPE_PRO_ANNUAL_PRICE_ID     ?? 'unset']: 'pro',
    [process.env.STRIPE_AGENCY_MONTHLY_PRICE_ID ?? 'unset']: 'agency',
    [process.env.STRIPE_AGENCY_ANNUAL_PRICE_ID  ?? 'unset']: 'agency',
  }
  return priceMap[priceId] ?? null
}

async function updateUserPlan(
  supabaseUserId: string,
  plan: 'free' | 'pro' | 'agency',
  stripeSubId?: string,
  stripeCustomerId?: string
): Promise<void> {
  const updateData: Record<string, unknown> = { plan }
  if (stripeSubId)      updateData.stripe_sub_id      = stripeSubId
  if (stripeCustomerId) updateData.stripe_customer_id = stripeCustomerId

  const { error } = await supabaseAdmin
    .from('users')
    .update(updateData)
    .eq('id', supabaseUserId)

  if (error) {
    console.error(`Failed to update user ${supabaseUserId} to plan ${plan}:`, error)
    throw new Error('Database update failed')
  }
  console.log(`User ${supabaseUserId} updated to plan: ${plan}`)
}

export async function handleWebhook(req: Request, res: Response): Promise<void> {
  const sig = req.headers['stripe-signature']
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!sig || !webhookSecret) {
    res.status(400).json({ error: 'Missing stripe-signature header' })
    return
  }

  let event: StripeEvent

  try {
    event = stripe.webhooks.constructEvent(req.body as Buffer, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    res.status(400).json({ error: 'Webhook signature verification failed' })
    return
  }

  console.log(`Stripe webhook received: ${event.type}`)

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as CheckoutSessionLike
        const supabaseUserId = session.metadata?.supabase_user_id
        const tier = session.metadata?.tier as 'pro' | 'agency' | undefined
        if (!supabaseUserId || !tier) break
        await updateUserPlan(
          supabaseUserId,
          tier,
          typeof session.subscription === 'string' ? session.subscription : undefined,
          typeof session.customer === 'string' ? session.customer : undefined
        )
        break
      }
      case 'customer.subscription.updated': {
        const sub = event.data.object as SubscriptionLike
        const supabaseUserId = sub.metadata?.supabase_user_id
        if (!supabaseUserId) break
        if (sub.status === 'active' || sub.status === 'trialing') {
          const priceId = sub.items.data[0]?.price?.id
          const plan    = priceId ? getPlanFromPriceId(priceId) : null
          if (plan) await updateUserPlan(supabaseUserId, plan, sub.id)
        }
        break
      }
      case 'customer.subscription.deleted': {
        const sub = event.data.object as SubscriptionLike
        const supabaseUserId = sub.metadata?.supabase_user_id
        if (!supabaseUserId) break
        await updateUserPlan(supabaseUserId, 'free')
        break
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object as InvoiceLike
        const customerId = typeof invoice.customer === 'string' ? invoice.customer : null
        if (!customerId) break
        const { data: userData } = await supabaseAdmin
          .from('users')
          .select('id, email')
          .eq('stripe_customer_id', customerId)
          .single()
        if (userData) {
          const user = userData as { id: string; email: string }
          console.warn(`Payment failed for user ${user.id} (${user.email})`)
        }
        break
      }
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }
    res.status(200).json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    res.status(500).json({ error: 'Webhook processing failed' })
  }
}
