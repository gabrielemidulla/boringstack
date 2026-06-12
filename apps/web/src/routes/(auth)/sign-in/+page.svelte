<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { toast } from 'svelte-sonner';
  import { signIn } from '$lib/auth-client';
  import { PRIVATE_PATH, SIGN_UP_PATH, safeRedirectPath } from '$lib/auth/routes';
  import { refetchSession } from '$lib/auth/session.svelte';
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { translateAuthError } from '$lib/auth/errors';
  import { m } from '$lib/i18n';

  let email = $state('');
  let password = $state('');
  let loading = $state(false);
  const redirectPath = $derived(
    safeRedirectPath(page.url.searchParams.get('next')) ?? PRIVATE_PATH,
  );

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    loading = true;

    try {
      const { error } = await signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(translateAuthError(error, 'auth.signIn.toastError'));
        return;
      }

      await refetchSession();
      toast.success(m('auth.signIn.toastSuccess'));
      await goto(redirectPath);
    } catch {
      toast.error(m('auth.signIn.toastErrorRetry'));
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>{m('auth.signIn.pageTitle')}</title>
</svelte:head>

<main class="grid min-h-screen place-items-center bg-background px-4 py-10">
  <Card.Root class="w-full max-w-sm">
    <Card.Header>
      <Card.Title>{m('nav.signIn')}</Card.Title>
      <Card.Description>{m('auth.signIn.description')}</Card.Description>
    </Card.Header>

    <Card.Content>
      <form class="grid gap-4" onsubmit={handleSubmit}>
        <div class="grid gap-2">
          <Label for="email">{m('form.email')}</Label>
          <Input
            id="email"
            type="email"
            autocomplete="email"
            placeholder={m('form.emailPlaceholder')}
            bind:value={email}
            required
          />
        </div>

        <div class="grid gap-2">
          <Label for="password">{m('form.password')}</Label>
          <Input
            id="password"
            type="password"
            autocomplete="current-password"
            placeholder={m('form.passwordPlaceholder')}
            bind:value={password}
            required
          />
        </div>

        <Button type="submit" class="w-full" size="lg" disabled={loading}>
          {loading ? m('auth.signIn.submitting') : m('nav.signIn')}
        </Button>
      </form>
    </Card.Content>

    <Card.Footer class="justify-center">
      <p class="text-sm text-muted-foreground">
        {m('auth.signIn.noAccount')}
        <Button href={SIGN_UP_PATH} variant="link" class="h-auto p-0">
          {m('nav.signUp')}
        </Button>
      </p>
    </Card.Footer>
  </Card.Root>
</main>
