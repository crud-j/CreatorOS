import { useEffect, useState } from 'react'
import { supabase } from '@backend/AuthFunctionality/supabaseClient'

export type Plan = 'free' | 'pro' | 'agency'

interface SubscriptionState {
  plan:      Plan
  isLoading: boolean
  isPro:     boolean
  isAgency:  boolean
  isFree:    boolean
}

export function useSubscription(): SubscriptionState {
  const [plan,      setPlan]      = useState<Plan>('free')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function fetchPlan() {
      try {
        const { data: { session } } = await supabase.auth.getSession()

        if (!session?.user) {
          if (isMounted) { setPlan('free'); setIsLoading(false) }
          return
        }

        const { data, error } = await supabase
          .from('users').select('plan').eq('id', session.user.id).single()

        if (error) throw error
        if (isMounted) setPlan(((data as { plan?: string } | null)?.plan as Plan) ?? 'free')
      } catch (err) {
        console.error('useSubscription error:', err)
        if (isMounted) setPlan('free')
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    void fetchPlan()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => { void fetchPlan() })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  return { plan, isLoading, isPro: plan === 'pro', isAgency: plan === 'agency', isFree: plan === 'free' }
}
