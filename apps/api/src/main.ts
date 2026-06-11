import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, type OpenAPIObject } from '@nestjs/swagger';
import { apiEnv, AppModule, configureHttpApp } from '@boringstack/api';

const openapiPath = join(
  dirname(fileURLToPath(import.meta.url)),
  '../openapi/openapi.json',
);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  const port = Number(process.env.PORT ?? 3000);

  configureHttpApp(app);

  app.enableCors({
    origin:
      apiEnv.BETTER_AUTH_TRUSTED_ORIGINS.length > 0
        ? apiEnv.BETTER_AUTH_TRUSTED_ORIGINS
        : true,
    credentials: true,
  });

  if (existsSync(openapiPath)) {
    const document = JSON.parse(
      readFileSync(openapiPath, 'utf-8'),
    ) as OpenAPIObject;
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(port);
}

void bootstrap();
