import { defineMessageCatalog, msg } from '../core.js';

export const {
  catalog: messageCatalog,
  codes: messageCodes,
  t,
} = defineMessageCatalog({
  app: {
    badge: msg({
      en: "not the shiny stack you'd expect, boring asf, yet working egregiously",
      it: 'non lo stack scintillante che ti aspetteresti, noioso da morire, ma funziona in modo egregio',
      de: 'ein langweiliger stack',
      es: 'no es el stack brillante que esperarías, aburrido como poco, pero funciona egregiamente',
      fr: 'pas la stack brillante à laquelle vous vous attendriez, ennuyeuse à souhait, mais fonctionne remarquablement',
    }),
    title: msg({
      en: 'boringstack',
      it: 'boringstack',
      de: 'boringstack',
      es: 'boringstack',
      fr: 'boringstack',
    }),
    description: msg({
      en: 'A small pnpm workspace with NestJS, SvelteKit CSR, MariaDB, Drizzle, and Docker already sitting at the same table.',
      it: 'Un piccolo workspace pnpm con NestJS, SvelteKit CSR, MariaDB, Drizzle e Docker già seduti allo stesso tavolo.',
      de: 'Ein kleines pnpm-Workspace mit NestJS, SvelteKit CSR, MariaDB, Drizzle und Docker am selben Tisch.',
      es: 'Un pequeño workspace de pnpm con NestJS, SvelteKit CSR, MariaDB, Drizzle y Docker ya sentados en la misma mesa.',
      fr: 'Un petit workspace pnpm avec NestJS, SvelteKit CSR, MariaDB, Drizzle et Docker déjà à la même table.',
    }),
    apiClientTitle: msg({
      en: 'Type-safe API client',
      it: 'Client API type-safe',
      de: 'Typsicherer API-Client',
      es: 'Cliente API con tipos seguros',
      fr: 'Client API typé',
    }),
    apiChecking: msg({
      en: 'Checking API…',
      it: 'Verifica API in corso…',
      de: 'API wird geprüft…',
      es: 'Comprobando la API…',
      fr: "Vérification de l'API…",
    }),
    apiUnreachable: msg({
      en: 'Could not reach the API. Start it with pnpm dev:api.',
      it: "Impossibile raggiungere l'API. Avviala con pnpm dev:api.",
      de: 'API nicht erreichbar. Starte sie mit pnpm dev:api.',
      es: 'No se pudo conectar con la API. Iníciala con pnpm dev:api.',
      fr: "Impossible de joindre l'API. Démarrez-la avec pnpm dev:api.",
    }),
  },
  nav: {
    openWeb: msg({
      en: 'Open web',
      it: 'Apri web',
      de: 'Web öffnen',
      es: 'Abrir web',
      fr: 'Ouvrir le web',
    }),
    openApiDocs: msg({
      en: 'Open API docs',
      it: 'Apri documentazione API',
      de: 'API-Dokumentation öffnen',
      es: 'Abrir documentación de la API',
      fr: 'Ouvrir la documentation API',
    }),
    signIn: msg({
      en: 'Sign in',
      it: 'Accedi',
      de: 'Anmelden',
      es: 'Iniciar sesión',
      fr: 'Se connecter',
    }),
    signUp: msg({
      en: 'Sign up',
      it: 'Registrati',
      de: 'Registrieren',
      es: 'Registrarse',
      fr: "S'inscrire",
    }),
    dashboard: msg({
      en: 'Dashboard',
      it: 'Dashboard',
      de: 'Dashboard',
      es: 'Panel',
      fr: 'Tableau de bord',
    }),
  },
} as const);

export type MessageCode = (typeof messageCodes)[number];
