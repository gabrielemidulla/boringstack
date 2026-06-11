export type {
  ApiFailure,
  ApiResult,
  ApiSuccess,
  CatalogLeaf,
  DotKeys,
  ErrEntry,
  MsgEntry,
} from './core.js';
export { defineErrorCatalog, defineMessageCatalog, err, msg } from './core.js';
export {
  errorCatalog,
  errorCodeSchema,
  errorCodes,
  fail,
  status,
  tError,
  type ErrorCode,
} from './catalogs/errors.js';
export {
  messageCatalog,
  messageCodes,
  t as tMessage,
  type MessageCode,
} from './catalogs/messages.js';
export { defaultLocale, isLocale, locales, type Locale } from './locales.js';
