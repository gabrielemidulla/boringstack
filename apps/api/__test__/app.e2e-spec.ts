import { afterEach, beforeEach, describe, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule, configureHttpApp } from '@boringstack/api';
import type { INestApplication } from '@nestjs/common';

type SupertestApp = Parameters<typeof request>[0];

describe('AppController (e2e)', () => {
  let app: INestApplication<SupertestApp>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication({
      bodyParser: false,
    });

    configureHttpApp(app);

    await app.init();
  });

  it('/api/v1/app/hello (GET)', () => {
    const server = app.getHttpServer();

    return request(server)
      .get('/api/v1/app/hello')
      .expect(200)
      .expect({ message: 'Hello World!' });
  });

  it('/api/auth/ok (GET)', () => {
    const server = app.getHttpServer();

    return request(server).get('/api/auth/ok').expect(200).expect({ ok: true });
  });

  afterEach(async () => {
    await app.close();
  });
});
