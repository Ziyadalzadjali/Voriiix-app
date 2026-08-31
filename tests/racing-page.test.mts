import assert from 'node:assert/strict';
import { test } from 'node:test';

import { buildPushRacingPage } from '../src/data/adapters/mock/racing-adapter.ts';

test('push racing page has four path steps and empty boards', () => {
  const page = buildPushRacingPage();
  assert.equal(page.pathSteps.length, 4);
  assert.equal(page.pathSteps[0]?.title, 'Practice');
  assert.equal(page.leaderboards.every((board) => board.entries.length === 0), true);
  assert.equal(page.faqs.length, 4);
});
