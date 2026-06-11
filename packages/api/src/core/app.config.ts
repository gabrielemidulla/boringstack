import type { INestApplication } from '@nestjs/common';
import { ApiExceptionFilter } from './errors/api-exception.filter.js';

export const API_PREFIX = 'api/v1';

export function configureHttpApp(app: INestApplication): void {
  app.setGlobalPrefix(API_PREFIX);
  app.useGlobalFilters(new ApiExceptionFilter());
}
