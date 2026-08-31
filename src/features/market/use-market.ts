import { useCallback, useEffect, useMemo, useState } from 'react';

import { fetchAkProducts } from '@/data/ak/products';
import { countActiveBids, countTradeProducts, filterMarketProducts, type MarketSection } from '@/data/market/filter';
import type { PushProduct } from '@/data/push/types';
import { toUserMessage } from '@/lib/errors';
import type { QueryState } from '@/lib/query-state';

export function useMarket(section: MarketSection) {
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

  const listings = useMemo(() => filterMarketProducts(products, section), [products, section]);

  return {
    listings,
    itemsListed: countTradeProducts(products),
    activeBids: countActiveBids(products),
    ok,
    state,
    reload: load,
  };
}
