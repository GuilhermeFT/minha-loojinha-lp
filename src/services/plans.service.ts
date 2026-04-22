'use server'

import { unstable_cache } from 'next/cache'
import { supabase } from '@/lib/supabase'

type PlansPrice = {
  monthly: { price: string; billingNote: string }
  yearly: { price: string; billingNote: string; savingsBadge: string }
}

function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

async function fetchPlansPrice(): Promise<PlansPrice | null> {
  if (!supabase) return null

  const { data, error } = await supabase
    .from('plans')
    .select('price_monthly, price_yearly')
    .eq('is_active', true)
    .order('created_at', { ascending: true })
    .limit(1)
    .single()

  if (error || !data?.price_monthly || !data?.price_yearly) return null

  const monthly = data.price_monthly as number
  const yearly = data.price_yearly as number
  const monthlyEquivalent = yearly / 12
  const savings = Math.round((1 - monthlyEquivalent / monthly) * 100)

  return {
    monthly: {
      price: formatBRL(monthly),
      billingNote: 'Cobrado mensalmente',
    },
    yearly: {
      price: formatBRL(monthlyEquivalent),
      billingNote: `Cobrado como R$ ${formatBRL(yearly)}/ano`,
      savingsBadge: `Economize ${savings}%`,
    },
  }
}

export const getPlansPrice = unstable_cache(fetchPlansPrice, ['plans-price'], {
  revalidate: 3600,
})
