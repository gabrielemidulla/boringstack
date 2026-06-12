<script lang="ts">
  import { PRIVATE_PATH, SIGN_IN_PATH, SIGN_UP_PATH } from '$lib/auth/routes';
  import { isAuthenticated, isAuthReady } from '$lib/auth/session.svelte';
  import LocaleSwitcher from '$lib/components/locale-switcher.svelte';
  import { Button } from '$lib/components/ui/button';
  import { Skeleton } from '$lib/components/ui/skeleton';
  import { m } from '$lib/i18n';

  const ready = $derived(isAuthReady());
  const signedIn = $derived(isAuthenticated());
</script>

<header
  class="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 sm:px-8"
>
  <a href="/" class="inline-flex shrink-0 items-center">
    <img src="/logo.webp" alt={m('app.title')} class="h-5 w-auto" />
  </a>

  <div class="flex items-center gap-2">
    <LocaleSwitcher />
    {#if !ready}
      <div class="flex items-center gap-2" role="status">
        <span class="sr-only">{m('common.loading')}</span>
        <div class="relative inline-flex" aria-hidden="true">
          <Button variant="outline" class="invisible pointer-events-none" tabindex={-1}
            >{m('nav.signIn')}</Button
          >
          <Skeleton class="absolute inset-0 rounded-lg" />
        </div>
        <div class="relative inline-flex" aria-hidden="true">
          <Button class="invisible pointer-events-none" tabindex={-1}>{m('nav.signUp')}</Button>
          <Skeleton class="absolute inset-0 rounded-lg" />
        </div>
      </div>
    {:else if signedIn}
      <Button href={PRIVATE_PATH}>{m('nav.dashboard')}</Button>
    {:else}
      <Button href={SIGN_IN_PATH} variant="outline">{m('nav.signIn')}</Button>
      <Button href={SIGN_UP_PATH}>{m('nav.signUp')}</Button>
    {/if}
  </div>
</header>
