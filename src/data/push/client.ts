import { AppError } from '@/lib/errors';
import { getPushOrigin } from '@/data/push/catalog';
import type { PushCatalog, PushLeaderboards, PushProduct } from '@/data/push/types';

type JsonBag = Record<string, unknown>;

function asObject(value: unknown): JsonBag | null {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as JsonBag) : null;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

async function getJson(url: string): Promise<unknown | null> {
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) return null;
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function fetchPushCatalog(): Promise<PushCatalog> {
  const origin = getPushOrigin();
  const productsUrl = `${origin}/api/products?all=1`;
  const boardsUrl = `${origin}/api/leaderboards`;

  const settled = await Promise.allSettled([getJson(productsUrl), getJson(boardsUrl)]);
  const productsResult = settled[0];
  const boardsResult = settled[1];

  const productsJson = productsResult.status === 'fulfilled' ? productsResult.value : null;
  const boardsJson = boardsResult.status === 'fulfilled' ? boardsResult.value : null;

  if (productsResult.status === 'rejected' && boardsResult.status === 'rejected') {
    throw new AppError('Could not reach the Champ Drifter path. Check your connection and try again.', {
      retryable: true,
      cause: productsResult.reason,
    });
  }

  const productsBag = asObject(productsJson);
  const boardsBag = asObject(boardsJson);
  const products = asArray(productsBag?.data).filter((item): item is PushProduct => Boolean(asObject(item)));
  const boards = (asObject(boardsBag?.data) ?? {}) as PushLeaderboards;

  return {
    products,
    boards,
    productsOk: productsResult.status === 'fulfilled' && productsJson != null,
    boardsOk: boardsResult.status === 'fulfilled' && boardsJson != null,
  };
}
