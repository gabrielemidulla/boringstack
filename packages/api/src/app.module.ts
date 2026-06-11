import { Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { AppController } from './app/app.controller.js';
import { AppService } from './app/app.service.js';
import { auth } from './auth/auth.js';
import { DatabaseService } from './database/database.service.js';
import { HealthController } from './health/health.controller.js';
import { MeController } from './me/me.controller.js';

@Module({
  imports: [AuthModule.forRoot({ auth })],
  controllers: [AppController, HealthController, MeController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
