import { defineErrorCatalog, err } from '../core.js';

export const {
  catalog: errorCatalog,
  codes: errorCodes,
  errorCodeSchema,
  fail,
  status,
  t: tError,
} = defineErrorCatalog({
  app: {
    demo: {
      unavailable: err(503, {
        en: 'This demo endpoint is intentionally unavailable.',
        it: 'Questo endpoint demo non è disponibile intenzionalmente.',
        de: 'Dieser Demo-Endpunkt ist absichtlich nicht verfügbar.',
        es: 'Este endpoint de demostración no está disponible intencionalmente.',
        fr: 'Ce point de terminaison de démonstration est volontairement indisponible.',
      }),
    },
    internal: err(500, {
      en: 'Something went wrong.',
      it: 'Qualcosa è andato storto.',
      de: 'Etwas ist schiefgelaufen.',
      es: 'Algo salió mal.',
      fr: 'Une erreur est survenue.',
    }),
  },
} as const);

export type ErrorCode = (typeof errorCodes)[number];
