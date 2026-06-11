import { errorCodes } from '@boringstack/i18n/errors';

export interface ApiFailure {
  success: false;
  error: (typeof errorCodes)[number];
  params?: Record<string, string | number>;
}
