<script lang="ts">
  import { goto } from '$app/navigation';
  import { toast } from 'svelte-sonner';
  import { signOut } from '$lib/auth-client';
  import { authSession, refetchSession } from '$lib/auth/session.svelte';
  import { SIGN_IN_PATH } from '$lib/auth/routes';
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { translateAuthError } from '$lib/auth/errors';
  import { m } from '$lib/i18n';

  const session = $derived(authSession());
  const user = $derived(session.data?.user);

  let signingOut = $state(false);

  async function handleSignOut() {
    signingOut = true;

    try {
      const { error } = await signOut();

      if (error) {
        toast.error(translateAuthError(error, 'auth.private.toastSignOutError'));
        return;
      }

      await refetchSession();
      toast.success(m('auth.private.toastSignOutSuccess'));
      await goto(SIGN_IN_PATH);
    } catch {
      toast.error(m('auth.private.toastSignOutErrorRetry'));
    } finally {
      signingOut = false;
    }
  }
</script>

<svelte:head>
  <title>{m('auth.private.pageTitle')}</title>
</svelte:head>

<main class="grid min-h-screen place-items-center bg-background px-4 py-10">
  <Card.Root class="w-full max-w-lg">
    <Card.Header>
      <Card.Title>{m('auth.private.title')}</Card.Title>
      <Card.Description>{m('auth.private.description')}</Card.Description>
    </Card.Header>

    <Card.Content>
      {#if user}
        <dl class="grid gap-3 text-sm">
          <div class="grid gap-1">
            <dt class="text-muted-foreground">{m('form.name')}</dt>
            <dd class="font-medium text-foreground">{user.name}</dd>
          </div>
          <div class="grid gap-1">
            <dt class="text-muted-foreground">{m('form.email')}</dt>
            <dd class="font-medium text-foreground">{user.email}</dd>
          </div>
          <div class="grid gap-1">
            <dt class="text-muted-foreground">{m('auth.private.userId')}</dt>
            <dd class="break-all font-mono text-xs text-foreground">{user.id}</dd>
          </div>
        </dl>
      {:else}
        <p class="text-sm text-muted-foreground">{m('auth.private.noUserData')}</p>
      {/if}
    </Card.Content>

    <Card.Footer class="justify-end">
      <Button variant="outline" disabled={signingOut} onclick={handleSignOut}>
        {signingOut ? m('auth.private.signingOut') : m('auth.private.signOut')}
      </Button>
    </Card.Footer>
  </Card.Root>
</main>
