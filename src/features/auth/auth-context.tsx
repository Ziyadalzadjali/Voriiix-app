import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { createAppClient } from '@/data/adapters/create-client';
import type { AppClient } from '@/data/adapters/contracts';
import type { AuthSession } from '@/data/types';
import { toUserMessage } from '@/lib/errors';
import type { QueryState } from '@/lib/query-state';

type AuthContextValue = {
  ready: boolean;
  session: AuthSession | null;
  status: QueryState;
  client: AppClient;
  clearStatus: () => void;
  setSession: (session: AuthSession | null) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const client = useMemo(() => createAppClient(), []);
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [status, setStatus] = useState<QueryState>({ kind: 'idle' });

  useEffect(() => {
    let cancelled = false;
    client.auth
      .restore()
      .then((restored) => {
        if (!cancelled) setSession(restored);
      })
      .catch(() => {
        if (!cancelled) setSession(null);
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, [client]);

  const logout = useCallback(async () => {
    setStatus({ kind: 'loading' });
    try {
      await client.auth.logout();
      setSession(null);
      setStatus({ kind: 'success' });
    } catch (error) {
      setStatus({ kind: 'error', message: toUserMessage(error) });
    }
  }, [client]);

  const value = useMemo<AuthContextValue>(
    () => ({
      ready,
      session,
      status,
      client,
      clearStatus: () => setStatus({ kind: 'idle' }),
      setSession,
      logout,
    }),
    [ready, session, status, client, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return value;
}
