import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  async ping(): Promise<void> {
    const { pool } = await import('@boringstack/db');

    await pool.query('select 1');
  }
}
