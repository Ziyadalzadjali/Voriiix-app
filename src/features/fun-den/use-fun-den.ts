import { useCallback, useEffect, useMemo, useState } from 'react';

import { fetchAkProducts } from '@/data/ak/products';
import { filterFunDenProducts, type FunDenRoom } from '@/data/fun-den/rooms';
import type { PushProduct } from '@/data/push/types';
import { toUserMessage } from '@/lib/errors';
import type { QueryState } from '@/lib/query-state';

export function useFunDen(room: FunDenRoom) {
  const [products, setProducts] = useState<PushProduct[]>([]);
  const [ok, setOk] = useState(false);
  const [state, setState] = useState<QueryState>({ kind: 'loading' });

  const load = useCallback(async () => {
    setState({ kind: 'loading' });
    try {
      const result = await fetchAkProducts();
      setProducts(result.products);
      setOk(result.ok);
      setState({ kind: 'success' });
    } catch (error) {
      setState({ kind: 'error', message: toUserMessage(error) });
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const listings = useMemo(() => filterFunDenProducts(products, room), [products, room]);

  return { listings, ok, state, reload: load };
}
