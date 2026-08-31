import { AppError } from '@/lib/errors';
import { getPushOrigin } from '@/data/push/catalog';
import type { PushProduct } from '@/data/push/types';

type JsonBag = Record<string, unknown>;

function asObject(value: unknown): JsonBag | null {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as JsonBag) : null;
}

export async function fetchAkProducts(): Promise<{ products: PushProduct[]; ok: boolean }> {
  const origin = getPushOrigin();
  try {
    const response = await fetch(`${origin}/api/products?all=1`, { headers: { Accept: 'application/json' } });
    if (!response.ok) return { products: [], ok: false };
    const json: unknown = await response.json();
    const bag = asObject(json);
    const rows = Array.isArray(bag?.data) ? bag.data : [];
    const products = rows.filter((item): item is PushProduct => Boolean(asObject(item)));
    return { products, ok: true };
  } catch (error) {
    throw new AppError('Could not reach akacademy.online. Check your connection and try again.', {
      retryable: true,
      cause: error,
    });
  }
}
