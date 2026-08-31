import assert from 'node:assert/strict';
import { test } from 'node:test';

import { getDataSource } from '../src/lib/env.ts';

test('defaults to the isolated mock adapter', () => {
  delete process.env.EXPO_PUBLIC_DATA_SOURCE;
  assert.equal(getDataSource(), 'mock');
});

test('live is opt-in', () => {
  process.env.EXPO_PUBLIC_DATA_SOURCE = 'live';
  assert.equal(getDataSource(), 'live');
  delete process.env.EXPO_PUBLIC_DATA_SOURCE;
});
