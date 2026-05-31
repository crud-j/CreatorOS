import type { Request, Response } from 'express'
import { stripe } from './stripeClient'
import { PRICE_IDS } from './stripePriceIds'
import type { PlanTier, BillingCycle } from './stripePriceIds'
import { supabaseAdmin } from '../AuthFunctionality/supabaseAdmin'

export async function createCheckoutSession(req: Request, res: Response): Promise<void> {
  try {
    const { tier, billingCycle, userId, userEmail }: {
      tier: PlanTier; billingCycle: BillingCycle; userId: string; userEmail: string
    } = req.body

    if (!tier || !billingCycle || !userId || !userEmail) {
      res.status(400).json({ error: 'Missing required fields: tier, billingCycle, userId, userEmail' })
      return
    }

    if (!['pro', 'agency'].includes(tier)) {
      res.status(400).json({ error: 'Invalid tier. Must be pro or agency.' })
      return
    }

    if (!['monthly', 'annual'].includes(billingCycle)) {
      res.status(400).json({ error: 'Invalid billingCycle. Must be monthly or annual.' })
      return
    }

    const priceId = PRICE_IDS[tier][billingCycle]
    if (!priceId) {
      res.status(500).json({ error: `Price ID not configured for ${tier} ${billingCycle}` })
      return
    }

    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('stripe_customer_id, plan')
      .eq('id', userId)
      .maybeSingle()

    if (userError) {
      console.error('Supabase user lookup error:', userError)
      res.status(500).json({ error: 'Failed to fetch user data' })
      return
    }

    // No row yet (existing auth user before trigger was set up) — create it now
    if (!userData) {
      const { error: insertError } = await supabaseAdmin
        .from('users')
        .insert({ id: userId, email: userEmail, plan: 'free' })

      if (insertError && insertError.code !== '23505') {
        console.error('Failed to create user row:', insertError)
        res.status(500).json({ error: 'Failed to initialise user record' })
        return
      }
    }

    let customerId = (userData as { stripe_customer_id: string | null; plan: string } | null)?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: userEmail,
        metadata: { supabase_user_id: userId },
      })
      customerId = customer.id

      const { error: updateError } = await supabaseAdmin
        .from('users')
        .update({ stripe_customer_id: customerId })
        .eq('id', userId)

      if (updateError) console.error('Failed to save Stripe customer ID:', updateError)
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/dashboard?payment=success&plan=${tier}`,
      cancel_url:  `${process.env.FRONTEND_URL}/?section=pricing&payment=cancelled`,
      subscription_data: {
        metadata: { supabase_user_id: userId, tier, billing_cycle: billingCycle },
      },
      metadata: { supabase_user_id: userId, tier, billing_cycle: billingCycle },
      allow_promotion_codes: true,
    })

    res.status(200).json({ url: session.url, sessionId: session.id })
  } catch (error) {
    console.error('Create checkout session error:', error)
    res.status(500).json({ error: error instanceof Error ? error.message : 'Internal server error' })
  }
}
