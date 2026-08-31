import { getDataSource, type DataSource } from '@/lib/env';

export function resolveDataSource(): DataSource {
  return getDataSource();
}

export function isPreviewData(): boolean {
  return resolveDataSource() === 'mock';
}
