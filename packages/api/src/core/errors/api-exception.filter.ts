import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { fail } from '@boringstack/i18n/errors';
import { ApiErrorException } from './api-error.exception.js';

type HttpResponse = {
  status: (statusCode: number) => HttpResponse;
  json: (body: unknown) => void;
};

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<HttpResponse>();

    if (exception instanceof ApiErrorException) {
      response
        .status(exception.getStatus())
        .json(fail(exception.code, exception.params));
      return;
    }

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const body = exception.getResponse();

      if (
        typeof body === 'object' &&
        body !== null &&
        'success' in body &&
        body.success === false &&
        'error' in body &&
        typeof body.error === 'string'
      ) {
        response.status(statusCode).json(body);
        return;
      }

      response.status(statusCode).json(fail('app.internal'));
      return;
    }

    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(fail('app.internal'));
  }
}
