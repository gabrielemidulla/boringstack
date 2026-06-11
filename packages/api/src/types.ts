import type { UserSession } from '@thallesp/nestjs-better-auth';
import type { auth } from './auth/auth.js';

export interface HelloResponse {
  message: string;
}

export interface HealthCheckResponse {
  status: 'ok';
}

export type MeResponse = Pick<UserSession<typeof auth>, 'user' | 'session'>;
