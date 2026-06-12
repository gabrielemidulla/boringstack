export type {
  ApiFailure,
  ApiResult,
  ApiSuccess,
  CatalogLeaf,
  DotKeys,
  ErrEntry,
  ExternalErrorKey,
  ExternalErrorLike,
  ExternalErrorSource,
  MsgEntry,
} from './core.js';
export {
  defineErrorCatalog,
  defineExternalErrorSource,
  defineMessageCatalog,
  err,
  msg,
  resolveExternalErrorCode,
  withExternalErrorAliases,
} from './core.js';
export {
  betterAuthErrorSource,
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
