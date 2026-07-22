export interface Product {
  id: string;
  tier: 'budget' | 'balanced' | 'powerhouse';
  badgeLabel: string;
  badgeColor: string;
  title: string;
  price: string;
  forWho: string;
  specs: string[];
  tradeoff: string;
  buyLink: string;
}

export interface FilterGroup { label: string; value: string }



export const filterOptions: Record<string, FilterGroup[]> = {
  price:   [{ label: 'Low', value: 'low' }, { label: 'Mid', value: 'mid' }, { label: 'High', value: 'high' }],
  utility: [{ label: 'Daily Use', value: 'daily' }, { label: 'Heavy Work', value: 'heavy' }, { label: 'Gaming', value: 'gaming' }],
  feature: [{ label: 'Battery Life', value: 'battery' }, { label: 'Portability', value: 'portability' }, { label: 'Performance', value: 'performance' }],
};

export const tierFilterMap: Record<string, { price: string; utility: string; feature: string }> = {
  budget:     { price: 'low',  utility: 'daily',  feature: 'battery' },
  balanced:   { price: 'mid',  utility: 'heavy',  feature: 'portability' },
  powerhouse: { price: 'high', utility: 'gaming', feature: 'performance' },
};
