<script lang="ts">
  import { goto } from '$app/navigation';
  import { PRIVATE_PATH } from '$lib/auth/routes';
  import { isAuthenticated, isAuthReady } from '$lib/auth/session.svelte';
  import HomeNavbar from '$lib/components/home-navbar.svelte';

  let { children } = $props();

  const ready = $derived(isAuthReady());
  const signedIn = $derived(isAuthenticated());

  $effect(() => {
    if (!ready || !signedIn) {
      return;
    }

    void goto(PRIVATE_PATH, { replaceState: true });
  });
</script>

<HomeNavbar />

{#if !ready}
  <div class="grid min-h-screen place-items-center bg-background px-4">
    <p class="text-sm text-muted-foreground">Checking session…</p>
  </div>
{:else if !signedIn}
  {@render children()}
{/if}
