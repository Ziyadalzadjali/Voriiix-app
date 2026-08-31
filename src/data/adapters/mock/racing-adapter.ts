import type { RacingAdapter } from '@/data/adapters/contracts';
import { mapPushRacingPage } from '@/data/push/catalog';
import type { PushPath } from '@/data/push/types';
import type { RacingPage } from '@/data/types';

/** Published /push copy only — no live catalog or standings. */
export function buildPushRacingPage(path: PushPath = 'yalla-drift'): RacingPage {
  return mapPushRacingPage(
    { products: [], boards: {}, productsOk: true, boardsOk: true },
    path,
  );
}

export class MockRacingAdapter implements RacingAdapter {
  async getPage(path: PushPath = 'yalla-drift'): Promise<RacingPage> {
    return buildPushRacingPage(path);
  }
}
