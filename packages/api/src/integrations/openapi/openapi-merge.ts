const AUTH_BASE_PATH = '/api/auth';

type OpenApiDocument = Record<string, unknown>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function prefixAuthPaths(
  authDocument: Record<string, unknown>,
): Record<string, unknown> {
  const paths = isRecord(authDocument.paths) ? authDocument.paths : {};

  return Object.fromEntries(
    Object.entries(paths).map(([path, operations]) => {
      const fullPath = path.startsWith(AUTH_BASE_PATH)
        ? path
        : `${AUTH_BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`;

      return [fullPath, operations];
    }),
  );
}

function toCamelCase(segment: string): string {
  return segment.replace(/-([a-z])/g, (_, character: string) =>
    character.toUpperCase(),
  );
}

function authOperationId(path: string, method: string): string {
  const relativePath = path.startsWith(AUTH_BASE_PATH)
    ? path.slice(AUTH_BASE_PATH.length)
    : path;

  const segments = relativePath
    .split('/')
    .filter(Boolean)
    .map((segment) => toCamelCase(segment.replace(/[{}]/g, '')));

  return ['auth', ...segments, method.toLowerCase()].join('.');
}

function normalizeAuthOperationIds(
  paths: Record<string, unknown>,
): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(paths).map(([path, pathItem]) => {
      if (!isRecord(pathItem)) {
        return [path, pathItem];
      }

      const operations = Object.fromEntries(
        Object.entries(pathItem).map(([method, operation]) => {
          if (!isRecord(operation)) {
            return [method, operation];
          }

          return [
            method,
            {
              ...operation,
              operationId: authOperationId(path, method),
            },
          ];
        }),
      );

      return [path, operations];
    }),
  );
}

function tagList(value: unknown): Record<string, unknown>[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isRecord);
}

function mergeComponents(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
): void {
  const targetComponents = isRecord(target.components)
    ? { ...target.components }
    : {};
  const sourceComponents = isRecord(source.components) ? source.components : {};

  for (const section of ['schemas', 'securitySchemes', 'responses'] as const) {
    const existing = isRecord(targetComponents[section])
      ? targetComponents[section]
      : {};
    const incoming = isRecord(sourceComponents[section])
      ? sourceComponents[section]
      : {};

    targetComponents[section] = {
      ...existing,
      ...incoming,
    };
  }

  target.components = targetComponents;
}

export function mergeOpenApiDocuments(
  nestDocument: OpenApiDocument,
  authDocument: Record<string, unknown>,
): OpenApiDocument {
  const authPaths = normalizeAuthOperationIds(prefixAuthPaths(authDocument));

  const merged: OpenApiDocument = {
    ...nestDocument,
    openapi: '3.1.0',
    paths: {
      ...(isRecord(nestDocument.paths) ? nestDocument.paths : {}),
      ...authPaths,
    },
    tags: [...tagList(nestDocument.tags), ...tagList(authDocument.tags)],
  };

  mergeComponents(merged, authDocument);

  return merged;
}
