import { Platform } from 'react-native';

import type { AuthSession } from '@/data/types';

const KEY = 'voriix.session';

function webStore(): Storage | null {
  if (typeof globalThis.sessionStorage === 'undefined') {
    return null;
  }
  return globalThis.sessionStorage;
}

export async function readStoredSession(): Promise<AuthSession | null> {
  const raw = await readRaw();
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as AuthSession;
    if (!parsed?.user?.id) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function writeStoredSession(session: AuthSession): Promise<void> {
  await writeRaw(JSON.stringify(session));
}

export async function clearStoredSession(): Promise<void> {
  if (Platform.OS === 'web') {
    webStore()?.removeItem(KEY);
    return;
  }
  const SecureStore = await import('expo-secure-store');
  await SecureStore.deleteItemAsync(KEY);
}

async function readRaw(): Promise<string | null> {
  if (Platform.OS === 'web') {
    return webStore()?.getItem(KEY) ?? null;
  }
  const SecureStore = await import('expo-secure-store');
  return SecureStore.getItemAsync(KEY);
}

async function writeRaw(value: string): Promise<void> {
  if (Platform.OS === 'web') {
    webStore()?.setItem(KEY, value);
    return;
  }
  const SecureStore = await import('expo-secure-store');
  await SecureStore.setItemAsync(KEY, value);
}
