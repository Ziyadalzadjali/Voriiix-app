import type { AppClient } from '@/data/adapters/contracts';
import { LiveAuthAdapter } from '@/data/adapters/live/auth-adapter';
import { LiveHomeAdapter } from '@/data/adapters/live/home-adapter';
import { LiveRacingAdapter } from '@/data/adapters/live/racing-adapter';
import { MockAuthAdapter } from '@/data/adapters/mock/auth-adapter';
import { MockHomeAdapter } from '@/data/adapters/mock/home-adapter';
import { resolveDataSource } from '@/data/source';

export function createAppClient(): AppClient {
  const racing = new LiveRacingAdapter();

  if (resolveDataSource() === 'live') {
    return {
      auth: new LiveAuthAdapter(),
      home: new LiveHomeAdapter(),
      racing,
    };
  }

  return {
    auth: new MockAuthAdapter(),
    home: new MockHomeAdapter(),
    racing,
  };
}
