import type { AuthSession, HomeDashboard, RacingPage } from '@/data/types';

export type EmailLoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  displayName: string;
  email: string;
  password: string;
};

export type PhoneStartInput = {
  phone: string;
};

export type PhoneVerifyInput = {
  phone: string;
  code: string;
};

export type PasswordResetInput = {
  email: string;
};

export interface AuthAdapter {
  restore(): Promise<AuthSession | null>;
  loginWithEmail(input: EmailLoginInput): Promise<AuthSession>;
  register(input: RegisterInput): Promise<AuthSession>;
  startPhoneOtp(input: PhoneStartInput): Promise<{ challengeId: string }>;
  verifyPhoneOtp(input: PhoneVerifyInput): Promise<AuthSession>;
  signInWithApple(): Promise<AuthSession>;
  signInWithGoogle(): Promise<AuthSession>;
  requestPasswordReset(input: PasswordResetInput): Promise<void>;
  logout(): Promise<void>;
}

export interface HomeAdapter {
  getDashboard(userId: string): Promise<HomeDashboard>;
}

export interface RacingAdapter {
  getPage(): Promise<RacingPage>;
}

export type AppClient = {
  auth: AuthAdapter;
  home: HomeAdapter;
  racing: RacingAdapter;
};
