import { auth } from '../auth/auth.js';
import { mergeOpenApiDocuments } from './openapi-merge.js';

type OpenApiDocument = Record<string, unknown>;

export async function createMergedOpenApiDocument(
  nestDocument: OpenApiDocument,
): Promise<{ authDocument: OpenApiDocument; mergedDocument: OpenApiDocument }> {
  const authDocument =
    (await auth.api.generateOpenAPISchema()) as OpenApiDocument;
  const mergedDocument = mergeOpenApiDocuments(nestDocument, authDocument);

  return { authDocument, mergedDocument };
}
