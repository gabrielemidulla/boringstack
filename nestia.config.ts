import type { INestiaConfig } from '@nestia/sdk';
import { NestFactory } from '@nestjs/core';
import { AppModule, configureHttpApp } from '@boringstack/api';

const NESTIA_CONFIG: INestiaConfig = {
  input: async () => {
    const app = await NestFactory.create(AppModule, {
      bodyParser: false,
    });

    configureHttpApp(app);

    return app;
  },
  output: 'packages/sdk/src',
  clone: true,
  swagger: {
    openapi: '3.1',
    output: 'apps/api/openapi/nest.json',
    beautify: true,
    info: {
      title: 'boringstack API',
      description: 'NestJS API for boringstack',
      version: '1.0',
    },
  },
};

export default NESTIA_CONFIG;
