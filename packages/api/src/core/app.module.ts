import { Module } from '@nestjs/common';
import { AppHttpModule } from '../http/app/app.module.js';
import { HealthHttpModule } from '../http/health/health.module.js';
import { MeHttpModule } from '../http/me/me.module.js';
import { AuthIntegrationModule } from '../integrations/auth/auth.module.js';

@Module({
  imports: [
    AuthIntegrationModule,
    AppHttpModule,
    HealthHttpModule,
    MeHttpModule,
  ],
})
export class AppModule {}
