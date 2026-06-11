import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createEnv } from '@t3-oss/env-core';
import { config } from 'dotenv';
import { z } from 'zod';

const envPath = findEnvPath();

if (envPath) {
  config({ path: envPath, quiet: true });
}

export const dbEnv = createEnv({
  server: {
    MARIADB_HOST: z.string().min(1),
    MARIADB_PORT: z.coerce.number().int().positive().default(3306),
    MARIADB_USER: z.string().min(1),
    MARIADB_PASSWORD: z.string().min(1),
    MARIADB_DATABASE: z.string().min(1),
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
