<script lang="ts">
  import { goto } from '$app/navigation';
  import { isAuthenticated, isAuthReady } from '$lib/auth/session.svelte';
  import { SIGN_IN_PATH } from '$lib/auth/routes';

  let { children } = $props();

  const ready = $derived(isAuthReady());
  const signedIn = $derived(isAuthenticated());

  $effect(() => {
    if (!ready || signedIn) {
      return;
    }

    void goto(SIGN_IN_PATH, { replaceState: true });
  });
</script>

{#if !ready}
  <div class="grid min-h-screen place-items-center bg-background px-4">
    <p class="text-sm text-muted-foreground">Checking session…</p>
  </div>
{:else if signedIn}
  {@render children()}
{/if}
