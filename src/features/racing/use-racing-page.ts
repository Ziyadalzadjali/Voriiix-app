import { useCallback, useEffect, useState } from 'react';

import type { PushPath } from '@/data/push/types';
import type { RacingPage } from '@/data/types';
import { useAuth } from '@/features/auth/auth-context';
import { toUserMessage } from '@/lib/errors';
import type { QueryState } from '@/lib/query-state';

export function useRacingPage(path: PushPath) {
  const { client } = useAuth();
  const [data, setData] = useState<RacingPage | null>(null);
  const [state, setState] = useState<QueryState>({ kind: 'idle' });

  const load = useCallback(async () => {
    setState({ kind: 'loading' });
    setData((current) => (current?.selectedPath === path ? current : null));
    try {
      const page = await client.racing.getPage(path);
      setData(page);
      setState({ kind: 'success' });
    } catch (error) {
      setState({ kind: 'error', message: toUserMessage(error) });
    }
  }, [client, path]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, state, reload: load };
}
