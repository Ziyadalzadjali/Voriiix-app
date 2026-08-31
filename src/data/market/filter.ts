import type { PushProduct, PushTag } from '../push/types';

export type MarketSection = 'trade' | 'exchange' | 'store';

function tagsOf(product: PushProduct): PushTag[] {
  return Array.isArray(product.tags) ? product.tags : [];
}

function hasTagType(product: PushProduct, type: string): boolean {
  const wanted = type.toLowerCase();
  return tagsOf(product).some((tag) => String(tag.type || '').toLowerCase() === wanted);
}

function hasTypedTag(product: PushProduct, type: string, name: string): boolean {
  return tagsOf(product).some(
    (tag) =>
      String(tag.type || '').trim().toLowerCase() === type.toLowerCase() &&
      String(tag.name || '').trim().toLowerCase() === name.toLowerCase(),
  );
}

function hasCategory(product: PushProduct, name: string): boolean {
  return hasTypedTag(product, 'category', name);
}

export function isTradeProduct(product: PushProduct): boolean {
  return Boolean(product && product.active && hasTagType(product, 'trade'));
}

export function filterMarketProducts(products: PushProduct[], section: MarketSection): PushProduct[] {
  return products.filter((product) => {
    if (!isTradeProduct(product) && section !== 'store') return false;
    if (section === 'exchange') {
      return hasTypedTag(product, 'trade', 'exchange') || hasCategory(product, 'exchange');
    }
    if (section === 'store') {
      return Boolean(product.active) && (hasCategory(product, 'store') || hasCategory(product, 'shop'));
    }
    return !hasTypedTag(product, 'trade', 'exchange') && !hasCategory(product, 'exchange');
  });
}

export function countTradeProducts(products: PushProduct[]): number {
  return products.filter(isTradeProduct).length;
}

export function countActiveBids(products: PushProduct[]): number {
  return products.filter((product) => product.active && hasTypedTag(product, 'trade', 'bid')).length;
}
