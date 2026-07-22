export interface APIProduct {
  name: string;
  price: string;
  reason: string;
  specs: string[];
  tradeoff: string;
  category_tier: 'budget' | 'balanced' | 'powerhouse';
}

interface APIResponse {
  products: APIProduct[];
}

const API_BASE = import.meta.env.VITE_API_BASE ?? '/api';

export async function fetchRecommendations(params: {
  query: string;
  price: string;
  utility: string;
  feature: string;
}): Promise<APIProduct[]> {
  const body = {
    category: params.query,
    budget: budgetToNumber(params.price),
    priority: params.utility,
    preference: params.feature,
  };

  const res = await fetch(`${API_BASE}/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }

  const data: APIResponse = await res.json();

  if (!data.products || !Array.isArray(data.products)) {
    throw new Error('Invalid API response shape');
  }

  return data.products;
}

function budgetToNumber(level: string): number {
  switch (level) {
    case 'low':
      return 35000;
    case 'mid':
      return 55000;
    case 'high':
      return 80000;
    default:
      return 50000;
  }
}
