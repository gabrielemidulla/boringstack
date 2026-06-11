import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createEnv } from '@t3-oss/env-core';
import { config } from 'dotenv';
import { z } from 'zod';

const envPath = findEnvPath();

if (envPath) {
  config({ path: envPath, quiet: true });
}

export const apiEnv = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.string().url(),
    BETTER_AUTH_TRUSTED_ORIGINS: z.preprocess(
      (value) =>
        typeof value === 'string'
          ? value
              .split(',')
              .map((origin) => origin.trim())
              .filter(Boolean)
          : value,
      z.array(z.string().url()).default([]),
    ),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});

function findEnvPath(): string | undefined {
  let directory = process.cwd();

  while (true) {
    const candidate = join(directory, '.env');

    if (existsSync(candidate)) {
      return candidate;
    }

    const parent = dirname(directory);

    if (parent === directory) {
      return undefined;
    }

    directory = parent;
  }
}
