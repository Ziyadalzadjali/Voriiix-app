import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  normalizePhone,
  validateEmail,
  validateOtp,
  validatePassword,
  validatePhone,
} from '../src/features/auth/validation.ts';

test('rejects empty email', () => {
  assert.equal(validateEmail(''), 'Enter your email.');
});

test('accepts a normal email', () => {
  assert.equal(validateEmail('driver@voriix.test'), null);
});

test('requires an 8 character password', () => {
  assert.equal(validatePassword('short'), 'Password must be at least 8 characters.');
  assert.equal(validatePassword('longenough'), null);
});

test('accepts oman and e164 phones', () => {
  assert.equal(validatePhone('+96890000001'), null);
  assert.equal(validatePhone('+447700900123'), null);
  assert.notEqual(validatePhone('90000001'), null);
});

test('otp must be 6 digits', () => {
  assert.equal(validateOtp('123456'), null);
  assert.notEqual(validateOtp('12'), null);
});

test('strips spaces from phone', () => {
  assert.equal(normalizePhone('+968 9000 0001'), '+96890000001');
});
