import { defaultLocale, isLocale, type Locale } from './locales';

function readInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return defaultLocale;
  }

  const stored = window.localStorage.getItem('locale');

  if (stored && isLocale(stored)) {
    return stored;
  }

  const browserLocale = window.navigator.language.slice(0, 2);

  if (isLocale(browserLocale)) {
    return browserLocale;
  }

  return defaultLocale;
}

let locale = $state<Locale>(readInitialLocale());

export function getLocale(): Locale {
  return locale;
}

export function setLocale(next: Locale): void {
  locale = next;

  if (typeof window !== 'undefined') {
    window.localStorage.setItem('locale', next);
  }
}
