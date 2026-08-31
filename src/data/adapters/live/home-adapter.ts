import { BackendUnavailableError } from '@/lib/errors';
import type { HomeAdapter } from '@/data/adapters/contracts';
import type { HomeDashboard } from '@/data/types';

export class LiveHomeAdapter implements HomeAdapter {
  async getDashboard(_userId: string): Promise<HomeDashboard> {
    throw new BackendUnavailableError('Live home data requires the Phase 2 API.');
  }
}
