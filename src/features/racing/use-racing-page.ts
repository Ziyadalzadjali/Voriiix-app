import { useCallback, useEffect, useState } from 'react';

import type { RacingPage } from '@/data/types';
import { useAuth } from '@/features/auth/auth-context';
import { toUserMessage } from '@/lib/errors';
import type { QueryState } from '@/lib/query-state';

export function useRacingPage() {
  const { client } = useAuth();
  const [data, setData] = useState<RacingPage | null>(null);
  const [state, setState] = useState<QueryState>({ kind: 'idle' });

  const load = useCallback(async () => {
    setState({ kind: 'loading' });
    try {
      const page = await client.racing.getPage();
      setData(page);
      setState({ kind: 'success' });
    } catch (error) {
      setState({ kind: 'error', message: toUserMessage(error) });
    }
  }, [client]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, state, reload: load };
}
