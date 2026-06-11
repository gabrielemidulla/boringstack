import { Controller, Get, Inject } from '@nestjs/common';
import { TypedException } from '@nestia/core';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { throwApiError } from '../errors/api-error.exception.js';
import type { ApiFailure } from '../errors/api-failure.js';
import { AppService } from './app.service.js';

@AllowAnonymous()
@Controller('app')
export class AppController {
  constructor(@Inject(AppService) private readonly appService: AppService) {}

  /** @operationId v1.app.hello */
  @Get('hello')
  getHello() {
    return this.appService.getHello();
  }

  /** @operationId v1.app.demoError */
  @TypedException<ApiFailure>({ status: 503 })
  @Get('demo-error')
  demoError(): never {
    throwApiError('app.demo.unavailable');
  }
}
