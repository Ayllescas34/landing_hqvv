interface PromotionLike {
  active?: boolean | null
  displayMode?: 'always' | 'once' | 'manual' | null
  startDate?: string | null
  endDate?: string | null
  order?: number | null
}

export function getActivePromotion<T extends PromotionLike>(
  promotions: T[],
  now: Date = new Date(),
): T | null {
  const eligible = promotions.filter((promo) => {
    if (!promo.active || promo.displayMode === 'manual') return false
    if (promo.startDate && now < new Date(promo.startDate)) return false
    if (promo.endDate && now > new Date(promo.endDate)) return false
    return true
  })

  if (eligible.length === 0) return null

  eligible.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  return eligible[0]
}
