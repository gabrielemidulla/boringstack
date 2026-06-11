import { Controller, Get, Inject } from '@nestjs/common';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { DatabaseService } from '../database/database.service.js';
import type { HealthCheckResponse } from '../types.js';

@AllowAnonymous()
@Controller('health')
export class HealthController {
  constructor(
    @Inject(DatabaseService) private readonly databaseService: DatabaseService,
  ) {}

  /** @operationId v1.health.check */
  @Get()
  async check(): Promise<HealthCheckResponse> {
    await this.databaseService.ping();

    return { status: 'ok' };
  }
}
