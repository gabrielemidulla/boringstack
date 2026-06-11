import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { dbEnv } from './env.js';
import * as schema from './schema.js';

export const pool = mysql.createPool({
  host: dbEnv.MARIADB_HOST,
  port: dbEnv.MARIADB_PORT,
  user: dbEnv.MARIADB_USER,
  password: dbEnv.MARIADB_PASSWORD,
  database: dbEnv.MARIADB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
});

export const db = drizzle(pool, { schema, mode: 'default' });

export { dbEnv };
export * from './schema.js';
