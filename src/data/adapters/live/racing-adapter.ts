import type { RacingAdapter } from '@/data/adapters/contracts';
import { fetchPushCatalog } from '@/data/push/client';
import { mapPushRacingPage } from '@/data/push/catalog';
import type { PushCatalog, PushPath } from '@/data/push/types';
import type { RacingPage } from '@/data/types';

const CACHE_MS = 30_000;

export class LiveRacingAdapter implements RacingAdapter {
  private cache: { at: number; catalog: PushCatalog } | null = null;

  async getPage(path: PushPath = 'yalla-drift'): Promise<RacingPage> {
    const catalog = await this.load();
    return mapPushRacingPage(catalog, path);
  }

  private async load(): Promise<PushCatalog> {
    const now = Date.now();
    if (this.cache && now - this.cache.at < CACHE_MS) {
      return this.cache.catalog;
    }
    const catalog = await fetchPushCatalog();
    this.cache = { at: now, catalog };
    return catalog;
  }
}
