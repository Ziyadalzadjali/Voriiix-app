export type AppEnv = 'development' | 'production';
export type DataSource = 'mock' | 'live';

function read(name: string): string {
  const value = process.env[name];
  return typeof value === 'string' ? value.trim() : '';
}

export function getAppEnv(): AppEnv {
  return read('EXPO_PUBLIC_APP_ENV') === 'production' ? 'production' : 'development';
}

export function getDataSource(): DataSource {
  return read('EXPO_PUBLIC_DATA_SOURCE') === 'live' ? 'live' : 'mock';
}

export function getApiUrl(): string {
  return read('EXPO_PUBLIC_API_URL');
}
