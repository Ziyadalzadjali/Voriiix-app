import assert from 'node:assert/strict';
import { test } from 'node:test';

import { filterFunDenProducts, isFunDenProduct } from '../src/data/fun-den/rooms.ts';
import { countActiveBids, filterMarketProducts, isTradeProduct } from '../src/data/market/filter.ts';
import type { PushProduct } from '../src/data/push/types.ts';

const product = (overrides: Partial<PushProduct>): PushProduct => ({
  id: overrides.id ?? 1,
  active: true,
  name: '1 Hour Sim',
  sku: '1H-SIM',
  tags: [{ type: 'trade', name: 'fun den' }],
  ...overrides,
});

test('trade hub keeps trade rows and splits exchange', () => {
  const rows = [
    product({ id: 1, tags: [{ type: 'trade', name: 'fun den' }] }),
    product({ id: 2, name: '100 SR Tokens', tags: [{ type: 'trade', name: 'exchange' }, { type: 'category', name: 'EXCHANGE' }] }),
    product({ id: 3, name: 'Shop hat', active: true, tags: [{ type: 'category', name: 'shop' }] }),
    product({ id: 4, active: false, tags: [{ type: 'trade', name: 'bid' }] }),
  ];
  assert.equal(isTradeProduct(rows[0]!), true);
  assert.deepEqual(filterMarketProducts(rows, 'trade').map((item) => item.id), [1]);
  assert.deepEqual(filterMarketProducts(rows, 'exchange').map((item) => item.id), [2]);
  assert.deepEqual(filterMarketProducts(rows, 'store').map((item) => item.id), [3]);
  assert.equal(countActiveBids(rows), 0);
});

test('fun den rooms match the site tag rules', () => {
  const rows = [
    product({ id: 1, name: '1 Hour Sim', tags: [{ type: 'trade', name: 'fun den' }, { type: 'sim', name: 'car' }] }),
    product({ id: 2, name: '1 Hour PS5', tags: [{ type: 'fun den', name: 'ps5' }, { type: 'trade', name: 'fun den' }] }),
    product({ id: 3, name: '1h VIP room', tags: [{ type: 'fun den', name: 'viproom' }, { type: 'trade', name: 'fun den' }] }),
    product({ id: 4, name: 'Rise of Heros', tags: [{ type: 'trade', name: 'fun den' }] }),
    product({ id: 5, name: 'Shop merch', tags: [{ type: 'category', name: 'shop' }] }),
  ];
  assert.equal(isFunDenProduct(rows[0]!), true);
  assert.equal(isFunDenProduct(rows[4]!), false);
  assert.deepEqual(filterFunDenProducts(rows, 'car-simulator').map((item) => item.id), [1]);
  assert.deepEqual(filterFunDenProducts(rows, 'ps5').map((item) => item.id), [2]);
  assert.deepEqual(filterFunDenProducts(rows, 'vip-room').map((item) => item.id), [3]);
  assert.deepEqual(filterFunDenProducts(rows, 'heros').map((item) => item.id), [4]);
  assert.equal(filterFunDenProducts(rows, 'on-fire').length, 4);
});
