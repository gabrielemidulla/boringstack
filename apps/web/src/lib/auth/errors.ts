import {
  betterAuthErrorSource,
  resolveExternalErrorCode,
} from '@boringstack/i18n/errors';
import type { MessageCode } from '@boringstack/i18n/messages';
import { error, m } from '$lib/i18n';

type AuthClientError = {
  code?: string | number;
  message?: string;
};

export function translateAuthError(
  authError: AuthClientError | null | undefined,
  fallback: MessageCode,
): string {
  const code = resolveExternalErrorCode(betterAuthErrorSource, authError);

  if (code) {
    return error(code);
  }

  return m(fallback);
}
