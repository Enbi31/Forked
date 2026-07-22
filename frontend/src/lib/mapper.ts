import type { Product } from '@/lib/fork-data';
import type { APIProduct } from '@/lib/api';

const BADGE_MAP: Record<
  string,
  { label: string; color: string; tier: 'budget' | 'balanced' | 'powerhouse' }
> = {
  budget: { label: 'The Budget Pick', color: 'bg-green-500', tier: 'budget' },
  balanced: { label: 'The Balanced Pick', color: 'bg-blue-500', tier: 'balanced' },
  powerhouse: { label: 'The Powerhouse', color: 'bg-purple-500', tier: 'powerhouse' },
};

export function mapAPIProducts(apiProducts: APIProduct[]): Product[] {
  return apiProducts.map((p, i) => {
    const badge = BADGE_MAP[p.category_tier] ?? {
      label: `Option ${i + 1}`,
      color: ['bg-green-500', 'bg-blue-500', 'bg-purple-500'][i] ?? 'bg-purple-500',
      tier: (['budget', 'balanced', 'powerhouse'] as const)[i] ?? 'powerhouse',
    };

    return {
      id: `ai-${i}`,
      tier: badge.tier,
      badgeLabel: badge.label,
      badgeColor: badge.color,
      title: p.name,
      price: p.price,
      forWho: p.reason,
      specs: p.specs ?? [],
      tradeoff: p.tradeoff ?? '',
      buyLink: `https://www.google.com/search?q=${encodeURIComponent(p.name)}+buy+online`,
    };
  });
}
