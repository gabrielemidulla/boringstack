import { Injectable } from '@nestjs/common';
import type { HelloResponse } from '../types.js';

@Injectable()
export class AppService {
  getHello(): HelloResponse {
    return { message: 'Hello World!' };
  }
}
