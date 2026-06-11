import { createAuthClient } from 'better-auth/svelte';

const apiBaseUrl =
  (import.meta.env.PUBLIC_API_URL as string | undefined) ??
  'http://localhost:3000';

export const authClient = createAuthClient({
  baseURL: apiBaseUrl,
});

export const { signIn, signOut, signUp, useSession } = authClient;
