import { HttpException } from '@nestjs/common';
import { fail, status, type ErrorCode } from '@boringstack/i18n/errors';

export class ApiErrorException extends HttpException {
  readonly code: ErrorCode;
  readonly params?: Record<string, string | number>;

  constructor(code: ErrorCode, params?: Record<string, string | number>) {
    super(fail(code, params), status(code));
    this.code = code;
    this.params = params;
  }
}

export function throwApiError(
  code: ErrorCode,
  params?: Record<string, string | number>,
): never {
  throw new ApiErrorException(code, params);
}
