export class AppError extends Error {
  readonly userMessage: string;
  readonly retryable: boolean;

  constructor(userMessage: string, options?: { retryable?: boolean; cause?: unknown }) {
    super(userMessage, options?.cause ? { cause: options.cause } : undefined);
    this.name = 'AppError';
    this.userMessage = userMessage;
    this.retryable = options?.retryable ?? true;
  }
}

export class BackendUnavailableError extends AppError {
  constructor(detail: string) {
    super('This feature is not connected to the server yet.', { retryable: false });
    this.name = 'BackendUnavailableError';
    this.cause = detail;
  }
}

export function toUserMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.userMessage;
  }
  return 'Something went wrong. Please try again.';
}
