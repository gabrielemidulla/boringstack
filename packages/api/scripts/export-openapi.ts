import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module.js';
import { createMergedOpenApiDocument } from '../src/openapi/create-merged-openapi.js';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '../../..');
const outputDir = join(repoRoot, 'apps/api/openapi');
const nestDocumentPath = join(outputDir, 'nest.json');

function writeJson(path: string, value: unknown) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

async function exportOpenApi() {
  const nestDocument = JSON.parse(
    readFileSync(nestDocumentPath, 'utf-8'),
  ) as Record<string, unknown>;

  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  const { authDocument, mergedDocument } =
    await createMergedOpenApiDocument(nestDocument);

  mkdirSync(outputDir, { recursive: true });
  writeJson(join(outputDir, 'auth.json'), authDocument);
  writeJson(join(outputDir, 'openapi.json'), mergedDocument);

  await app.close();
}

void exportOpenApi();
