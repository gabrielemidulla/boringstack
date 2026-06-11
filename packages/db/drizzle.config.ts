import { defineConfig } from 'drizzle-kit';
import { dbEnv } from './src/env.js';

export default defineConfig({
  schema: './src/schema.ts',
  out: './drizzle',
  dialect: 'mysql',
  dbCredentials: {
    host: dbEnv.MARIADB_HOST,
    port: dbEnv.MARIADB_PORT,
    user: dbEnv.MARIADB_USER,
    password: dbEnv.MARIADB_PASSWORD,
    database: dbEnv.MARIADB_DATABASE,
  },
});
