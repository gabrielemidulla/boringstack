<script lang="ts">
  import { goto } from '$app/navigation';
  import { toast } from 'svelte-sonner';
  import { signOut } from '$lib/auth-client';
  import { authSession, refetchSession } from '$lib/auth/session.svelte';
  import { SIGN_IN_PATH } from '$lib/auth/routes';
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';

  const session = $derived(authSession());
  const user = $derived(session.data?.user);

  let signingOut = $state(false);

  async function handleSignOut() {
    signingOut = true;

    try {
      const { error } = await signOut();

      if (error) {
        toast.error(error.message ?? 'Could not sign out.');
        return;
      }

      await refetchSession();
      toast.success('Signed out.');
      await goto(SIGN_IN_PATH);
    } catch {
      toast.error('Could not sign out. Please try again.');
    } finally {
      signingOut = false;
    }
  }
</script>

<svelte:head>
  <title>Private · boringstack</title>
</svelte:head>

<main class="grid min-h-screen place-items-center bg-background px-4 py-10">
  <Card.Root class="w-full max-w-lg">
    <Card.Header>
      <Card.Title>Private area</Card.Title>
      <Card.Description>Your authenticated session details.</Card.Description>
    </Card.Header>

    <Card.Content>
      {#if user}
        <dl class="grid gap-3 text-sm">
          <div class="grid gap-1">
            <dt class="text-muted-foreground">Name</dt>
            <dd class="font-medium text-foreground">{user.name}</dd>
          </div>
          <div class="grid gap-1">
            <dt class="text-muted-foreground">Email</dt>
            <dd class="font-medium text-foreground">{user.email}</dd>
          </div>
          <div class="grid gap-1">
            <dt class="text-muted-foreground">User ID</dt>
            <dd class="break-all font-mono text-xs text-foreground">{user.id}</dd>
          </div>
        </dl>
      {:else}
        <p class="text-sm text-muted-foreground">No user data available.</p>
      {/if}
    </Card.Content>

    <Card.Footer class="justify-end">
      <Button variant="outline" disabled={signingOut} onclick={handleSignOut}>
        {signingOut ? 'Signing out…' : 'Sign out'}
      </Button>
    </Card.Footer>
  </Card.Root>
</main>
