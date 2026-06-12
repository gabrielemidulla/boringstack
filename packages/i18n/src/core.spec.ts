import { describe, expect, it } from '@jest/globals';
import {
  defineErrorCatalog,
  defineExternalErrorSource,
  defineMessageCatalog,
  err,
  msg,
  resolveExternalErrorCode,
  withExternalErrorAliases,
} from './core.js';

const allLocales = {
  en: 'English',
  it: 'Italiano',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
} as const;

describe('defineErrorCatalog', () => {
  const { fail, status, t, codes } = defineErrorCatalog({
    user: {
      notFound: err(404, {
        ...allLocales,
        en: 'User not found.',
        de: 'Benutzer nicht gefunden.',
      }),
    },
    shopping: {
      cart: {
        full: err(
          400,
          {
            ...allLocales,
            en: 'Cart full ({max}).',
            de: 'Warenkorb voll ({max}).',
          },
          ['max'],
        ),
      },
    },
  } as const);

  it('derives dot-notation codes', () => {
    expect(codes).toEqual(['user.notFound', 'shopping.cart.full']);
  });

  it('builds typed API failures', () => {
    expect(fail('user.notFound')).toEqual({
      success: false,
      error: 'user.notFound',
    });
    expect(fail('shopping.cart.full', { max: 5 })).toEqual({
      success: false,
      error: 'shopping.cart.full',
      params: { max: 5 },
    });
  });

  it('resolves HTTP status and translations', () => {
    expect(status('user.notFound')).toBe(404);
    expect(t('shopping.cart.full', 'en', { max: 3 })).toBe('Cart full (3).');
    expect(t('shopping.cart.full', 'de', { max: 3 })).toBe(
      'Warenkorb voll (3).',
    );
  });
});

describe('defineMessageCatalog', () => {
  const { t } = defineMessageCatalog({
    app: {
      title: msg({
        ...allLocales,
        en: 'Hello',
        de: 'Hallo',
      }),
    },
  } as const);

  it('translates UI messages', () => {
    expect(t('app.title', 'en')).toBe('Hello');
    expect(t('app.title', 'de')).toBe('Hallo');
  });
});

describe('external error sources', () => {
  const catalog = {
    payment: {
      declined: withExternalErrorAliases(
        err(402, {
          ...allLocales,
          en: 'Card declined.',
        }),
        {
          gateway: {
            codes: ['card_declined', 402],
            messages: true,
          },
        },
      ),
      unavailable: withExternalErrorAliases(
        err(503, {
          ...allLocales,
          en: 'Payment service unavailable.',
        }),
        {
          gateway: {
            codes: ['E_UNAVAILABLE'],
            messages: ['Issuer unavailable'],
          },
        },
      ),
    },
  } as const;

  const source = defineExternalErrorSource(catalog, 'gateway');

  it('maps string and number provider codes to internal error codes', () => {
    expect(resolveExternalErrorCode(source, { code: 'card_declined' })).toBe(
      'payment.declined',
    );
    expect(resolveExternalErrorCode(source, { code: 402 })).toBe(
      'payment.declined',
    );
  });

  it('maps provider messages when no known code is present', () => {
    expect(
      resolveExternalErrorCode(source, {
        message: '  CARD DECLINED. ',
      }),
    ).toBe('payment.declined');
    expect(
      resolveExternalErrorCode(source, {
        message: 'Issuer unavailable',
      }),
    ).toBe('payment.unavailable');
  });

  it('returns undefined for unknown provider errors', () => {
    expect(resolveExternalErrorCode(source, { code: 'missing' })).toBe(
      undefined,
    );
  });
});
