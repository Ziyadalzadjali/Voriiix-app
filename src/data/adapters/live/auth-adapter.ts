import { BackendUnavailableError } from '@/lib/errors';
import type { AuthAdapter } from '@/data/adapters/contracts';
import type { AuthSession } from '@/data/types';

function unavailable(): never {
  throw new BackendUnavailableError('Live auth requires Phase 2 Supabase credentials.');
}

export class LiveAuthAdapter implements AuthAdapter {
  async restore(): Promise<AuthSession | null> {
    return unavailable();
  }
  async loginWithEmail(): Promise<AuthSession> {
    return unavailable();
  }
  async register(): Promise<AuthSession> {
    return unavailable();
  }
  async startPhoneOtp(): Promise<{ challengeId: string }> {
    return unavailable();
  }
  async verifyPhoneOtp(): Promise<AuthSession> {
    return unavailable();
  }
  async signInWithApple(): Promise<AuthSession> {
    return unavailable();
  }
  async signInWithGoogle(): Promise<AuthSession> {
    return unavailable();
  }
  async requestPasswordReset(): Promise<void> {
    return unavailable();
  }
  async logout(): Promise<void> {
    return unavailable();
  }
}
