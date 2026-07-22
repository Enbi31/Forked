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

export class TimeoutError extends Error {
  constructor() {
    super('Request timed out. The AI service is taking too long to respond.');
    this.name = 'TimeoutError';
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

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

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(`${API_BASE}/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new NetworkError(`API error ${res.status}: ${text}`);
    }

    const data: APIResponse = await res.json();

    if (!data.products || !Array.isArray(data.products)) {
      throw new NetworkError('Invalid API response shape');
    }

    return data.products;
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new TimeoutError();
    }
    if (err instanceof NetworkError) throw err;
    if (err instanceof TimeoutError) throw err;
    throw new NetworkError(err instanceof Error ? err.message : 'Network request failed');
  } finally {
    clearTimeout(timeoutId);
  }
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
