import { describe, expect, it } from '@jest/globals';
import { mergeOpenApiDocuments } from './openapi-merge.js';

describe('mergeOpenApiDocuments', () => {
  it('prefixes Better Auth paths and normalizes operation IDs', () => {
    const merged = mergeOpenApiDocuments(
      {
        openapi: '3.1.0',
        paths: {
          '/api/v1/health': {
            get: {
              operationId: 'v1.health.check',
            },
          },
        },
      },
      {
        paths: {
          '/sign-in/email': {
            post: {
              operationId: 'unused',
            },
          },
          '/api/auth/get-session': {
            get: {},
          },
        },
      },
    );

    expect(merged.paths).toEqual({
      '/api/v1/health': {
        get: {
          operationId: 'v1.health.check',
        },
      },
      '/api/auth/sign-in/email': {
        post: {
          operationId: 'auth.signIn.email.post',
        },
      },
      '/api/auth/get-session': {
        get: {
          operationId: 'auth.getSession.get',
        },
      },
    });
  });

  it('merges supported component sections without dropping Nest components', () => {
    const merged = mergeOpenApiDocuments(
      {
        components: {
          schemas: {
            HealthCheckResponse: { type: 'object' },
          },
          responses: {
            InternalError: { description: 'Internal error' },
          },
        },
      },
      {
        components: {
          schemas: {
            AuthSession: { type: 'object' },
          },
          securitySchemes: {
            cookieAuth: { type: 'apiKey', in: 'cookie', name: 'session' },
          },
        },
      },
    );

    expect(merged.components).toEqual({
      schemas: {
        HealthCheckResponse: { type: 'object' },
        AuthSession: { type: 'object' },
      },
      responses: {
        InternalError: { description: 'Internal error' },
      },
      securitySchemes: {
        cookieAuth: { type: 'apiKey', in: 'cookie', name: 'session' },
      },
    });
  });

  it('concatenates valid tag entries and ignores malformed tag values', () => {
    const merged = mergeOpenApiDocuments(
      {
        tags: [{ name: 'App' }, 'not-a-tag'],
      },
      {
        tags: [{ name: 'Auth' }, null],
      },
    );

    expect(merged.tags).toEqual([{ name: 'App' }, { name: 'Auth' }]);
  });
});
