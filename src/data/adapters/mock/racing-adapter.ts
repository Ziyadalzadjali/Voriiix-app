import type { RacingAdapter } from '@/data/adapters/contracts';
import type { RacingPage } from '@/data/types';

/**
 * Editorial copy from https://akacademy.online/push (Champ Drifter Path).
 * Not live standings, prices, or XP. Leaderboards stay empty until the API returns them.
 */
export function buildPushRacingPage(): RacingPage {
  return {
    kicker: 'Journey',
    title: 'Champ',
    titleAccent: 'Drifter Path',
    subtitle: 'Practice angle. Win battles. Climb events and academy. Enter championships — and take the crown.',
    tags: ['Yalla Drift', 'Heros', 'On Fire'],
    pathSteps: [
      { id: 'practice', order: 1, title: 'Practice', summary: 'Lock in your drift basics.', href: 'booking' },
      { id: 'battle', order: 2, title: 'Battle', summary: 'Win tandem and 1v1 fights.', href: 'booking' },
      { id: 'events', order: 3, title: 'Events', summary: 'Show up at joint drift nights.', href: 'events' },
      { id: 'crown', order: 4, title: 'Crown', summary: 'Championships. Champ status.', href: 'academy' },
    ],
    pillarsKicker: 'Our pillars',
    pillarsTitle: 'Race · Drift · Build · Win',
    pillars: [
      { id: 'race', title: 'Race', summary: 'Every session tracked' },
      { id: 'drift', title: 'Drift', summary: 'Angle, entry, transition' },
      { id: 'build', title: 'Build', summary: 'Bay to street to track' },
      { id: 'win', title: 'Win', summary: 'SR Coin, gear, prize pools' },
    ],
    leaderboards: [
      { id: 'legends', title: 'Top Banner Legends', emptyLabel: 'No legends yet.', entries: [] },
      { id: 'champs', title: 'Top Star Champs', emptyLabel: 'No champs yet.', entries: [] },
      { id: 'rated', title: 'Top Rated', emptyLabel: 'No rated accounts yet.', entries: [] },
    ],
    faqs: [
      {
        id: 'car',
        question: 'Do I need my own car?',
        answer: 'Not for sim or academy. Bring your own for garage / drift nights.',
      },
      {
        id: 'sr',
        question: 'How is SR Coin earned?',
        answer: 'By completing sim sessions, academy tiers, and events. SR Coin is redeemable across the market and shop.',
      },
      {
        id: 'bid',
        question: 'Can I bid on podium slots?',
        answer: 'Yes. Any user with sufficient SR Coin or Rial can bid on live podium slots. Availability and bids are confirmed by the server.',
      },
      {
        id: 'walkin',
        question: 'Is there a walk-in option?',
        answer: 'Yes. Walk-ins are welcome if slots are open, but signing in ahead reserves your bid privileges.',
      },
    ],
    welcomeLine: 'Create your account, get 100 SR Token (SRT) on the house, and pick your first session.',
  };
}

export class MockRacingAdapter implements RacingAdapter {
  async getPage(): Promise<RacingPage> {
    return buildPushRacingPage();
  }
}
