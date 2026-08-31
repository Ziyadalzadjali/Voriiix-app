import type { PushProduct, PushTag } from '../push/types';

export type FunDenRoom = 'on-fire' | 'heros' | 'car-simulator' | 'ps5' | 'vip-room';

export const FUN_DEN_ROOMS: { id: FunDenRoom; label: string }[] = [
  { id: 'on-fire', label: 'On Fire' },
  { id: 'heros', label: 'Heros' },
  { id: 'car-simulator', label: 'Car Simulator' },
  { id: 'ps5', label: 'PS5' },
  { id: 'vip-room', label: 'VIP Room' },
];

function tagsOf(product: PushProduct): PushTag[] {
  return Array.isArray(product.tags) ? product.tags : [];
}

function hasTypedTag(product: PushProduct, type: string, name: string): boolean {
  return tagsOf(product).some(
    (tag) =>
      String(tag.type || '').trim().toLowerCase() === type.toLowerCase() &&
      String(tag.name || '').trim().toLowerCase() === name.toLowerCase(),
  );
}

function hasTagType(product: PushProduct, type: string): boolean {
  const wanted = type.toLowerCase();
  return tagsOf(product).some((tag) => String(tag.type || '').toLowerCase() === wanted);
}

export function isFunDenProduct(product: PushProduct): boolean {
  if (!product?.active) return false;
  return (
    hasTypedTag(product, 'trade', 'fun den') ||
    hasTypedTag(product, 'category', 'fun den') ||
    hasTagType(product, 'fun den')
  );
}

export function filterFunDenProducts(products: PushProduct[], room: FunDenRoom): PushProduct[] {
  const rows = products.filter(isFunDenProduct);
  if (room === 'heros') {
    return rows.filter((product) => /hero|heros|heroes/i.test(`${product.name || ''} ${product.sku || ''}`));
  }
  if (room === 'car-simulator') {
    return rows.filter((product) => hasTypedTag(product, 'sim', 'car'));
  }
  if (room === 'ps5') {
    return rows.filter(
      (product) => hasTypedTag(product, 'fun den', 'fc26') || hasTypedTag(product, 'fun den', 'ps5'),
    );
  }
  if (room === 'vip-room') {
    return rows.filter((product) => hasTypedTag(product, 'fun den', 'viproom'));
  }
  return rows;
}
