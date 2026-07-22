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

export const dummyProducts: Product[] = [
  {
    id: 'budget', tier: 'budget', badgeLabel: 'The Budget Pick', badgeColor: 'bg-green-500',
    title: 'Lenovo IdeaPad 1', price: '~₹35,000',
    forWho: 'Perfect for JEE prep, note-taking, browsing, and light coding.',
    specs: ['AMD Ryzen 5 5500U processor', '8GB DDR4 RAM', '512GB SSD + 15.6" FHD display'],
    tradeoff: 'Plastic build, dim 250-nit screen, no dedicated GPU for gaming',
    buyLink: 'https://www.amazon.in/s?k=lenovo+ideapad+1+ryzen+5',
  },
  {
    id: 'balanced', tier: 'balanced', badgeLabel: 'The Balanced Pick', badgeColor: 'bg-blue-500',
    title: 'ASUS Vivobook 15', price: '~₹55,000',
    forWho: 'Great for study + casual gaming (Valorant, Minecraft) on the side.',
    specs: ['Intel i5-1235U processor', '16GB DDR4 RAM', '512GB SSD + 15.6" OLED display'],
    tradeoff: "Integrated graphics only — won't run AAA titles smoothly",
    buyLink: 'https://www.amazon.in/s?k=asus+vivobook+15+i5',
  },
  {
    id: 'powerhouse', tier: 'powerhouse', badgeLabel: 'The Powerhouse', badgeColor: 'bg-purple-500',
    title: 'ASUS TUF A15', price: '~₹80,000',
    forWho: 'Handles JEE prep + AAA gaming (GTA V, RDR2) + future-proofing.',
    specs: ['AMD Ryzen 7 7735HS processor', '16GB DDR5 RAM', '1TB SSD + NVIDIA RTX 3050'],
    tradeoff: 'Heavier at 2.3 kg, shorter battery life (~5 hr), bulkier chassis',
    buyLink: 'https://www.amazon.in/s?k=asus+tuf+a15+rtx+3050',
  },
];

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
