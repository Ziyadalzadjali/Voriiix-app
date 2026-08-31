import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  filterPushProducts,
  getPushOrigin,
  mapPushRacingPage,
  pathStep,
  pushAssetUrl,
} from '../src/data/push/catalog.ts';
import type { PushProduct } from '../src/data/push/types.ts';

function buildPushRacingPage(path: 'yalla-drift' | 'heros' | 'on-fire' = 'yalla-drift') {
  return mapPushRacingPage({ products: [], boards: {}, productsOk: true, boardsOk: true }, path);
}

const racing = (overrides: Partial<PushProduct>): PushProduct => ({
  id: overrides.id ?? 1,
  active: true,
  name: 'Practice SIM Drift',
  sku: 'Step 01',
  description: 'Lock in your line.',
  tags: [{ type: 'category', name: 'racing' }],
  ...overrides,
});

test('published /push copy has five yalla-drift fallback steps and empty boards', () => {
  const page = buildPushRacingPage('yalla-drift');
  assert.equal(page.pathSteps.length, 5);
  assert.equal(page.pathSteps[0]?.title, 'Practice SIM Drift');
  assert.equal(page.stepsSource, 'fallback');
  assert.equal(page.leaderboards.every((board) => board.entries.length === 0), true);
  assert.equal(page.faqs.length, 4);
});

test('push origin is locked to akacademy.online', () => {
  assert.equal(getPushOrigin(), 'https://akacademy.online');
  assert.equal(pushAssetUrl('/carx-tandem-hero.png'), 'https://akacademy.online/carx-tandem-hero.png');
  assert.equal(pushAssetUrl('https://evil.example/x.png'), undefined);
  assert.equal(
    pushAssetUrl('https://products.akacademy.online/storage/store-products/a.png'),
    'https://products.akacademy.online/storage/store-products/a.png',
  );
});

test('yalla-drift keeps racing steps and drops heros / on-fire', () => {
  const items = filterPushProducts(
    [
      racing({ id: 1, name: 'Practice SIM Drift', sku: 'Step 01' }),
      racing({ id: 2, name: 'Rise of Heros', sku: 'Hero 01' }),
      racing({ id: 3, name: 'On Fire Sessions', sku: 'Fire 01' }),
      racing({ id: 4, name: 'Shop merch', sku: 'MERCH', tags: [{ type: 'category', name: 'shop' }] }),
      racing({ id: 5, name: 'Inactive', sku: 'Step 09', active: false }),
    ],
    'yalla-drift',
  );
  assert.deepEqual(items.map((item) => item.id), [1]);
});

test('heros and on-fire paths match the site name/tag rules', () => {
  const heros = filterPushProducts(
    [racing({ id: 1, name: 'Rise of Heros', sku: 'H-1' }), racing({ id: 2, name: 'Practice SIM Drift', sku: 'Step 01' })],
    'heros',
  );
  const fire = filterPushProducts(
    [racing({ id: 3, name: 'On Fire Sessions', sku: 'F-1' }), racing({ id: 4, name: 'Practice SIM Drift', sku: 'Step 01' })],
    'on-fire',
  );
  assert.deepEqual(heros.map((item) => item.id), [1]);
  assert.deepEqual(fire.map((item) => item.id), [3]);
});

test('path step comes from SKU then path-step tag', () => {
  assert.equal(pathStep({ sku: 'step 02' }), 2);
  assert.equal(pathStep({ tags: [{ type: 'path-step', name: '4' }] }), 4);
  assert.equal(pathStep({ name: 'No step' }), 999);
});

test('live mapper uses catalog names and board scores without product prices', () => {
  const page = mapPushRacingPage(
    {
      productsOk: true,
      boardsOk: true,
      products: [
        racing({ id: 104, name: 'Practice SIM Drift', sku: 'Step 01', description: 'Build angle.' }),
        racing({ id: 105, name: 'Win SIM Battles', sku: 'step 02' }),
      ],
      boards: {
        legend: [{ id: 1, name: 'Demo Driver', banner: 850, coin: 324, rate: 2658 }],
        champ: [],
        rated: [{ id: 16, name: "110872's account", banner: 0, coin: 2521, rate: 5471101 }],
      },
    },
    'yalla-drift',
  );

  assert.equal(page.stepsSource, 'live');
  assert.equal(page.pathSteps[0]?.title, 'Practice SIM Drift');
  assert.equal(page.pathSteps[0]?.href, 'funDen');
  assert.equal(page.pathSteps[1]?.href, 'booking');
  assert.equal(page.leaderboards[0]?.entries[0]?.scoreLabel, '850');
  assert.equal(page.leaderboards[2]?.entries[0]?.scoreLabel, 'L5,471,101');
  assert.equal(JSON.stringify(page).includes('price'), false);
});
