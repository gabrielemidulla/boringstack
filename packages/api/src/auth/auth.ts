import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { account, db, session, user, verification } from '@boringstack/db';
import { betterAuth } from 'better-auth';
import { openAPI } from 'better-auth/plugins';
import { apiEnv } from '../env.js';

export const auth = betterAuth({
  appName: 'boringstack',
  secret: apiEnv.BETTER_AUTH_SECRET,
  baseURL: apiEnv.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: 'mysql',
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: apiEnv.BETTER_AUTH_TRUSTED_ORIGINS,
  plugins: [openAPI()],
});
