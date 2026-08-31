import { BackendUnavailableError } from '@/lib/errors';
import type { RacingAdapter } from '@/data/adapters/contracts';
import type { RacingPage } from '@/data/types';

export class LiveRacingAdapter implements RacingAdapter {
  async getPage(): Promise<RacingPage> {
    throw new BackendUnavailableError('Live racing content requires the Phase 3 API.');
  }
}
