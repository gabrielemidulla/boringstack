import type { ApiFailure } from '@boringstack/i18n';
import {
  errorCodeSchema,
  tError,
  type ErrorCode,
} from '@boringstack/i18n/errors';
import { t as tMessage, type MessageCode } from '@boringstack/i18n/messages';
import { getLocale } from './locale.svelte';

export function error(
  code: ErrorCode,
  params?: Record<string, string | number>,
): string {
  return tError(code, getLocale(), params);
}

export function m(
  code: MessageCode,
  params?: Record<string, string | number>,
): string {
  return tMessage(code, getLocale(), params);
}

export function isErrorCode(code: string): code is ErrorCode {
  return errorCodeSchema.safeParse(code).success;
}

export function isApiFailure(value: unknown): value is ApiFailure<ErrorCode> {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  if (!('success' in value) || value.success !== false) {
    return false;
  }

  if (!('error' in value) || typeof value.error !== 'string') {
    return false;
  }

  return errorCodeSchema.safeParse(value.error).success;
}
