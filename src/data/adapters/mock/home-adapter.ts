import type { HomeAdapter } from '@/data/adapters/contracts';
import type { HomeDashboard } from '@/data/types';

/**
 * Isolated development preview only. These numbers are not live balances,
 * prices, or availability. The live adapter never returns this payload.
 */
export function buildPreviewDashboard(greetingName: string): HomeDashboard {
  const start = new Date();
  start.setHours(start.getHours() + 5, 0, 0, 0);

  return {
    greetingName,
    wallet: { BXP: 1240, SXP: 340, GXP: 12 },
    upcomingBooking: {
      id: 'bkg_preview_001',
      gameName: 'Assetto Corsa',
      modeName: 'Practice',
      rigName: 'Rig 03',
      startsAt: start.toISOString(),
      durationMinutes: 30,
      status: 'confirmed',
    },
    events: [
      { id: 'evt_preview_1', title: 'Thursday Tandem Night', startsAt: start.toISOString(), kind: 'Tandem' },
      { id: 'evt_preview_2', title: '1v1 Battle Cup', startsAt: start.toISOString(), kind: '1v1' },
    ],
    academy: { programName: 'Drift Academy', levelName: 'SR Star', percent: 62 },
    rewards: [
      { id: 'rwd_preview_1', title: 'Free 15 min warm-up', locked: false },
      { id: 'rwd_preview_2', title: 'Real car experience', locked: true },
    ],
    achievements: [
      { id: 'ach_preview_1', title: 'First QR scan', unlocked: true },
      { id: 'ach_preview_2', title: 'Podium finish', unlocked: false },
    ],
  };
}

export class MockHomeAdapter implements HomeAdapter {
  async getDashboard(userId: string): Promise<HomeDashboard> {
    const name = userId.replace(/^mock-user-/, '').replace(/[._-]/g, ' ') || 'Driver';
    return buildPreviewDashboard(name);
  }
}
