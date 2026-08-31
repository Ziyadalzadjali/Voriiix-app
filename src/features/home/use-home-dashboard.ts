import { useCallback, useEffect, useState } from 'react';

import type { HomeDashboard } from '@/data/types';
import { useAuth } from '@/features/auth/auth-context';
import { toUserMessage } from '@/lib/errors';
import type { QueryState } from '@/lib/query-state';

export function useHomeDashboard() {
  const { client, session } = useAuth();
  const [data, setData] = useState<HomeDashboard | null>(null);
  const [state, setState] = useState<QueryState>({ kind: 'idle' });

  const load = useCallback(async () => {
    if (!session) {
      setData(null);
      setState({ kind: 'idle' });
      return;
    }
    setState({ kind: 'loading' });
    try {
      const dashboard = await client.home.getDashboard(session.user.id);
      setData({
        ...dashboard,
        greetingName: session.user.displayName || dashboard.greetingName,
      });
      setState({ kind: 'success' });
    } catch (error) {
      setState({ kind: 'error', message: toUserMessage(error) });
    }
  }, [client, session]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, state, reload: load };
}
