<script lang="ts">
  import { PRIVATE_PATH, SIGN_IN_PATH, SIGN_UP_PATH } from '$lib/auth/routes';
  import { isAuthenticated } from '$lib/auth/session.svelte';
  import { Button } from '$lib/components/ui/button';
  import { m } from '$lib/i18n';

  const signedIn = $derived(isAuthenticated());
</script>

<header
  class="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 sm:px-8"
>
  <a href="/" class="inline-flex shrink-0 items-center">
    <img src="/logo.webp" alt={m('app.title')} class="h-5 w-auto" />
  </a>

  <div class="flex items-center gap-2">
    {#if signedIn}
      <Button href={PRIVATE_PATH}>{m('nav.dashboard')}</Button>
    {:else}
      <Button href={SIGN_IN_PATH} variant="outline">{m('nav.signIn')}</Button>
      <Button href={SIGN_UP_PATH}>{m('nav.signUp')}</Button>
    {/if}
  </div>
</header>
