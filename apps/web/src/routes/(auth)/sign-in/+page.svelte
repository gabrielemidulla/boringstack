<script lang="ts">
  import { goto } from '$app/navigation';
  import { toast } from 'svelte-sonner';
  import { signIn } from '$lib/auth-client';
  import { PRIVATE_PATH, SIGN_UP_PATH } from '$lib/auth/routes';
  import { refetchSession } from '$lib/auth/session.svelte';
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';

  let email = $state('');
  let password = $state('');
  let loading = $state(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    loading = true;

    try {
      const { error } = await signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message ?? 'Could not sign in.');
        return;
      }

      await refetchSession();
      toast.success('Signed in successfully.');
      await goto(PRIVATE_PATH);
    } catch {
      toast.error('Could not sign in. Please try again.');
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Sign in · boringstack</title>
</svelte:head>

<main class="grid min-h-screen place-items-center bg-background px-4 py-10">
  <Card.Root class="w-full max-w-sm">
    <Card.Header>
      <Card.Title>Sign in</Card.Title>
      <Card.Description>Enter your email and password to continue.</Card.Description>
    </Card.Header>

    <Card.Content>
      <form class="grid gap-4" onsubmit={handleSubmit}>
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            autocomplete="email"
            placeholder="you@example.com"
            bind:value={email}
            required
          />
        </div>

        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            type="password"
            autocomplete="current-password"
            placeholder="••••••••"
            bind:value={password}
            required
          />
        </div>

        <Button type="submit" class="w-full" size="lg" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </Card.Content>

    <Card.Footer class="justify-center">
      <p class="text-sm text-muted-foreground">
        Don&apos;t have an account?
        <Button href={SIGN_UP_PATH} variant="link" class="h-auto p-0">
          Sign up
        </Button>
      </p>
    </Card.Footer>
  </Card.Root>
</main>
