export const PRICE_IDS = {
  pro: {
    monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID ?? '',
    annual:  process.env.STRIPE_PRO_ANNUAL_PRICE_ID  ?? '',
  },
  agency: {
    monthly: process.env.STRIPE_AGENCY_MONTHLY_PRICE_ID ?? '',
    annual:  process.env.STRIPE_AGENCY_ANNUAL_PRICE_ID  ?? '',
  },
} as const

export type PlanTier = 'pro' | 'agency'
export type BillingCycle = 'monthly' | 'annual'
