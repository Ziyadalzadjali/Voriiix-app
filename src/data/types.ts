import type { PushPath } from './push/types';

export type Role =
  | 'customer'
  | 'staff'
  | 'rig_operator'
  | 'academy_coach'
  | 'branch_manager'
  | 'admin'
  | 'super_admin';

export type XpKind = 'BXP' | 'SXP' | 'GXP';

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed'
  | 'expired'
  | 'no_show';

export type SessionUser = {
  id: string;
  displayName: string;
  email: string | null;
  phone: string | null;
  role: Role;
};

export type AuthSession = {
  user: SessionUser;
  issuedAt: string;
};

export type WalletBalances = {
  BXP: number;
  SXP: number;
  GXP: number;
};

export type UpcomingBooking = {
  id: string;
  gameName: string;
  modeName: string;
  rigName: string;
  startsAt: string;
  durationMinutes: number;
  status: BookingStatus;
};

export type HomeEvent = {
  id: string;
  title: string;
  startsAt: string;
  kind: string;
};

export type AcademyProgress = {
  programName: string;
  levelName: string;
  percent: number;
};

export type HomeReward = {
  id: string;
  title: string;
  locked: boolean;
};

export type HomeAchievement = {
  id: string;
  title: string;
  unlocked: boolean;
};

export type HomeDashboard = {
  greetingName: string;
  wallet: WalletBalances;
  upcomingBooking: UpcomingBooking | null;
  events: HomeEvent[];
  academy: AcademyProgress | null;
  rewards: HomeReward[];
  achievements: HomeAchievement[];
};

export type RacingPathHref = 'booking' | 'events' | 'academy' | 'funDen';

export type RacingPathStep = {
  id: string;
  order: number;
  title: string;
  summary: string;
  imageUrl?: string;
  href: RacingPathHref | null;
  source: 'live' | 'fallback';
};

export type RacingPillar = {
  id: string;
  title: string;
  summary: string;
};

export type RacingFaq = {
  id: string;
  question: string;
  answer: string;
};

export type RacingLeaderboard = {
  id: string;
  title: string;
  emptyLabel: string;
  entries: { id: string; name: string; rank: number; scoreLabel?: string }[];
};

export type RacingPage = {
  kicker: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  tags: string[];
  selectedPath: PushPath;
  stepsSource: 'live' | 'fallback';
  syncWarning?: string;
  pathSteps: RacingPathStep[];
  pillarsKicker: string;
  pillarsTitle: string;
  pillars: RacingPillar[];
  leaderboards: RacingLeaderboard[];
  faqs: RacingFaq[];
  welcomeLine: string;
};
