<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { toast } from 'svelte-sonner';
  import { signUp } from '$lib/auth-client';
  import { PRIVATE_PATH, SIGN_IN_PATH, safeRedirectPath } from '$lib/auth/routes';
  import { refetchSession } from '$lib/auth/session.svelte';
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { translateAuthError } from '$lib/auth/errors';
  import { m } from '$lib/i18n';

  let name = $state('');
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
      const { error } = await signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        toast.error(translateAuthError(error, 'auth.signUp.toastError'));
        return;
      }

      await refetchSession();
      toast.success(m('auth.signUp.toastSuccess'));
      await goto(redirectPath);
    } catch {
      toast.error(m('auth.signUp.toastErrorRetry'));
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>{m('auth.signUp.pageTitle')}</title>
</svelte:head>

<main class="grid min-h-screen place-items-center bg-background px-4 py-10">
  <Card.Root class="w-full max-w-sm">
    <Card.Header>
      <Card.Title>{m('nav.signUp')}</Card.Title>
      <Card.Description>{m('auth.signUp.description')}</Card.Description>
    </Card.Header>

    <Card.Content>
      <form class="grid gap-4" onsubmit={handleSubmit}>
        <div class="grid gap-2">
          <Label for="name">{m('form.name')}</Label>
          <Input
            id="name"
            type="text"
            autocomplete="name"
            placeholder={m('form.namePlaceholder')}
            bind:value={name}
            required
          />
        </div>

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
            autocomplete="new-password"
            placeholder={m('form.passwordPlaceholder')}
            bind:value={password}
            minlength={8}
            required
          />
        </div>

        <Button type="submit" class="w-full" size="lg" disabled={loading}>
          {loading ? m('auth.signUp.submitting') : m('nav.signUp')}
        </Button>
      </form>
    </Card.Content>

    <Card.Footer class="justify-center">
      <p class="text-sm text-muted-foreground">
        {m('auth.signUp.hasAccount')}
        <Button href={SIGN_IN_PATH} variant="link" class="h-auto p-0">
          {m('nav.signIn')}
        </Button>
      </p>
    </Card.Footer>
  </Card.Root>
</main>
