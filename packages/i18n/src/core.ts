import { z } from 'zod';
import type { Locale } from './locales.js';

export type ErrEntry = {
  readonly _tag: 'err';
  readonly status: number;
  readonly text: Record<Locale, string>;
  readonly params?: readonly string[];
  readonly external?: ExternalErrorAliases;
};

export type MsgEntry = {
  readonly _tag: 'msg';
  readonly text: Record<Locale, string>;
  readonly params?: readonly string[];
};

export type CatalogLeaf = ErrEntry | MsgEntry;

export type ExternalErrorKey = string | number;

export type ExternalErrorAliasSet = {
  readonly codes?: readonly ExternalErrorKey[];
  readonly messages?: true | readonly string[];
};

export type ExternalErrorAliases = Readonly<
  Record<string, ExternalErrorAliasSet>
>;

export type ExternalErrorLike = {
  readonly code?: ExternalErrorKey | null;
  readonly message?: string | null;
};

export type ExternalErrorSource<Code extends string = string> = {
  readonly codes: Readonly<Record<string, Code>>;
  readonly messages: Readonly<Record<string, Code>>;
};

export type ApiFailure<C extends string = string> = {
  success: false;
  error: C;
  params?: Record<string, string | number>;
};

export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiResult<T, C extends string = string> =
  | ApiSuccess<T>
  | ApiFailure<C>;

type Join<Prefix extends string, Key extends string> = Prefix extends ''
  ? Key
  : `${Prefix}.${Key}`;

export type DotKeys<T, Prefix extends string = ''> = T extends CatalogLeaf
  ? Prefix
  : T extends Record<string, unknown>
    ? {
        [K in keyof T & string]: DotKeys<T[K], Join<Prefix, K>>;
      }[keyof T & string]
    : never;

export function err<const P extends readonly string[] = []>(
  status: number,
  text: Record<Locale, string>,
  params?: P,
): ErrEntry & { params?: P } {
  return { _tag: 'err', status, text, params };
}

export function msg<const P extends readonly string[] = []>(
  text: Record<Locale, string>,
  params?: P,
): MsgEntry & { params?: P } {
  return { _tag: 'msg', text, params };
}

export function withExternalErrorAliases<
  const Leaf extends ErrEntry,
  const Aliases extends ExternalErrorAliases,
>(leaf: Leaf, external: Aliases): Leaf & { readonly external: Aliases } {
  return { ...leaf, external };
}

export function interpolate(
  template: string,
  params?: Record<string, string | number>,
): string {
  if (!params) {
    return template;
  }

  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in params ? String(params[key]) : `{${key}}`,
  );
}

export function flattenCatalog(
  tree: Record<string, unknown>,
  prefix = '',
): Record<string, CatalogLeaf> {
  const result: Record<string, CatalogLeaf> = {};

  for (const [key, value] of Object.entries(tree)) {
    const path = prefix ? `${prefix}.${key}` : key;

    if (isCatalogLeaf(value)) {
      result[path] = value;
      continue;
    }

    if (value && typeof value === 'object') {
      Object.assign(
        result,
        flattenCatalog(value as Record<string, unknown>, path),
      );
    }
  }

  return result;
}

function isCatalogLeaf(value: unknown): value is CatalogLeaf {
  return (
    typeof value === 'object' &&
    value !== null &&
    '_tag' in value &&
    (value._tag === 'err' || value._tag === 'msg')
  );
}

function translateLeaf(
  leaf: CatalogLeaf,
  locale: Locale,
  params?: Record<string, string | number>,
): string {
  return interpolate(leaf.text[locale], params);
}

export function defineExternalErrorSource<
  const T extends Record<string, unknown>,
>(catalog: T, source: string): ExternalErrorSource<DotKeys<T>> {
  type Code = DotKeys<T>;
  const flat = flattenCatalog(catalog);
  const codes: Record<string, Code> = {};
  const messages: Record<string, Code> = {};

  for (const [path, leaf] of Object.entries(flat)) {
    if (leaf._tag !== 'err') {
      continue;
    }

    const aliases = leaf.external?.[source];

    if (!aliases) {
      continue;
    }

    for (const code of aliases.codes ?? []) {
      assignExternalAlias(codes, normalizeExternalErrorKey(code), path as Code);
    }

    if (aliases.messages === true) {
      assignExternalAlias(
        messages,
        normalizeExternalErrorMessage(leaf.text.en),
        path as Code,
      );
      continue;
    }

    for (const message of aliases.messages ?? []) {
      assignExternalAlias(
        messages,
        normalizeExternalErrorMessage(message),
        path as Code,
      );
    }
  }

  return { codes, messages };
}

export function resolveExternalErrorCode<Code extends string>(
  source: ExternalErrorSource<Code>,
  error: ExternalErrorLike | null | undefined,
): Code | undefined {
  if (!error) {
    return undefined;
  }

  if (error.code !== undefined && error.code !== null) {
    const code = source.codes[normalizeExternalErrorKey(error.code)];

    if (code) {
      return code;
    }
  }

  if (error.message) {
    return source.messages[normalizeExternalErrorMessage(error.message)];
  }

  return undefined;
}

function normalizeExternalErrorKey(code: ExternalErrorKey): string {
  return String(code);
}

function normalizeExternalErrorMessage(message: string): string {
  return message.trim().toLowerCase();
}

function assignExternalAlias<Code extends string>(
  aliases: Record<string, Code>,
  alias: string,
  code: Code,
): void {
  const existing = aliases[alias];

  if (existing && existing !== code) {
    throw new Error(
      `External error alias "${alias}" maps to both "${existing}" and "${code}".`,
    );
  }

  aliases[alias] = code;
}

export function defineErrorCatalog<const T extends Record<string, unknown>>(
  catalog: T,
) {
  type Code = DotKeys<T>;
  const flat = flattenCatalog(catalog);
  const codes = Object.keys(flat) as Code[];

  if (codes.length === 0) {
    throw new Error('Error catalog must contain at least one entry.');
  }

  for (const [path, leaf] of Object.entries(flat)) {
    if (leaf._tag !== 'err') {
      throw new Error(
        `Error catalog entry "${path}" must be created with err().`,
      );
    }
  }

  const errorCodeSchema = z.enum(codes as [Code, ...Code[]]);

  return {
    catalog,
    codes,
    errorCodeSchema,
    fail: (
      code: Code,
      params?: Record<string, string | number>,
    ): ApiFailure<Code> => ({
      success: false,
      error: code,
      ...(params ? { params } : {}),
    }),
    status: (code: Code): number => {
      const leaf = flat[code as string];

      if (!leaf || leaf._tag !== 'err') {
        throw new Error(`Unknown error code: ${String(code)}`);
      }

      return leaf.status;
    },
    t: (
      code: Code,
      locale: Locale,
      params?: Record<string, string | number>,
    ): string => {
      const leaf = flat[code as string];

      if (!leaf) {
        throw new Error(`Unknown error code: ${String(code)}`);
      }

      return translateLeaf(leaf, locale, params);
    },
  };
}

export function defineMessageCatalog<const T extends Record<string, unknown>>(
  catalog: T,
) {
  type Code = DotKeys<T>;
  const flat = flattenCatalog(catalog);
  const codes = Object.keys(flat) as Code[];

  if (codes.length === 0) {
    throw new Error('Message catalog must contain at least one entry.');
  }

  for (const [path, leaf] of Object.entries(flat)) {
    if (leaf._tag !== 'msg') {
      throw new Error(
        `Message catalog entry "${path}" must be created with msg().`,
      );
    }
  }

  return {
    catalog,
    codes,
    t: (
      code: Code,
      locale: Locale,
      params?: Record<string, string | number>,
    ): string => {
      const leaf = flat[code as string];

      if (!leaf) {
        throw new Error(`Unknown message code: ${String(code)}`);
      }

      return translateLeaf(leaf, locale, params);
    },
  };
}
