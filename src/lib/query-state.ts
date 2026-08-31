export type QueryState =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'success' }
  | { kind: 'error'; message: string };

export function isRetryable(state: QueryState): boolean {
  return state.kind === 'error';
}
