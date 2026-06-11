import { Controller, Get } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { auth } from '../auth/auth.js';
import type { MeResponse } from '../types.js';

@Controller('me')
export class MeController {
  /** @operationId v1.me.get */
  @Get()
  getMe(@Session() session: UserSession<typeof auth>): MeResponse {
    return {
      user: session.user,
      session: session.session,
    };
  }
}
