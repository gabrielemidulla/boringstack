<script lang="ts">
import { goto } from "$app/navigation";
import { isAuthenticated, isAuthReady } from "$lib/auth/session.svelte";
import { SIGN_IN_PATH } from "$lib/auth/routes";
import HomeNavbar from "$lib/components/home-navbar.svelte";
import SessionLoading from "$lib/components/session-loading.svelte";

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

<HomeNavbar />

{#if !ready}
  <SessionLoading />
{:else if signedIn}
  {@render children()}
{/if}
