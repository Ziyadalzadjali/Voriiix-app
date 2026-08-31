import { AppError } from '@/lib/errors';
import type {
  AuthAdapter,
  EmailLoginInput,
  PasswordResetInput,
  PhoneStartInput,
  PhoneVerifyInput,
  RegisterInput,
} from '@/data/adapters/contracts';
import type { AuthSession, SessionUser } from '@/data/types';
import { clearStoredSession, readStoredSession, writeStoredSession } from '@/features/auth/session-storage';

const MOCK_OTP = '123456';

function customer(partial: Partial<SessionUser> & Pick<SessionUser, 'id' | 'displayName'>): SessionUser {
  return {
    email: null,
    phone: null,
    role: 'customer',
    ...partial,
  };
}

function sessionFor(user: SessionUser): AuthSession {
  return { user, issuedAt: new Date().toISOString() };
}

export class MockAuthAdapter implements AuthAdapter {
  async restore(): Promise<AuthSession | null> {
    return readStoredSession();
  }

  async loginWithEmail(input: EmailLoginInput): Promise<AuthSession> {
    const local = input.email.split('@')[0] ?? 'driver';
    const session = sessionFor(
      customer({
        id: `mock-user-${local.toLowerCase()}`,
        displayName: local.replace(/[._-]/g, ' '),
        email: input.email,
      }),
    );
    await writeStoredSession(session);
    return session;
  }

  async register(input: RegisterInput): Promise<AuthSession> {
    const session = sessionFor(
      customer({
        id: `mock-user-${input.email.toLowerCase()}`,
        displayName: input.displayName,
        email: input.email,
      }),
    );
    await writeStoredSession(session);
    return session;
  }

  async startPhoneOtp(_input: PhoneStartInput): Promise<{ challengeId: string }> {
    return { challengeId: 'mock-otp' };
  }

  async verifyPhoneOtp(input: PhoneVerifyInput): Promise<AuthSession> {
    if (input.code !== MOCK_OTP) {
      throw new AppError('That code is not valid.', { retryable: true });
    }
    const session = sessionFor(
      customer({
        id: `mock-user-${input.phone}`,
        displayName: 'Driver',
        phone: input.phone,
      }),
    );
    await writeStoredSession(session);
    return session;
  }

  async signInWithApple(): Promise<AuthSession> {
    const session = sessionFor(
      customer({ id: 'mock-user-apple', displayName: 'Apple Driver', email: 'apple@example.invalid' }),
    );
    await writeStoredSession(session);
    return session;
  }

  async signInWithGoogle(): Promise<AuthSession> {
    const session = sessionFor(
      customer({ id: 'mock-user-google', displayName: 'Google Driver', email: 'google@example.invalid' }),
    );
    await writeStoredSession(session);
    return session;
  }

  async requestPasswordReset(_input: PasswordResetInput): Promise<void> {
    return;
  }

  async logout(): Promise<void> {
    await clearStoredSession();
  }
}

export const MOCK_PHONE_OTP = MOCK_OTP;
