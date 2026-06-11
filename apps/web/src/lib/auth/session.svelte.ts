import { browser } from '$app/environment';
import { fromStore } from 'svelte/store';
import { useSession } from '$lib/auth-client';

const sessionAtom = browser ? useSession() : undefined;
const session = sessionAtom ? fromStore(sessionAtom) : undefined;

export function authSession() {
  return (
    session?.current ?? {
      data: null,
      error: null,
      isPending: false,
    }
  );
}

export function isAuthReady() {
  return !authSession().isPending;
}

export function isAuthenticated() {
  return Boolean(authSession().data?.user);
}

export async function refetchSession() {
  if (!sessionAtom) {
    return;
  }

  await sessionAtom.get().refetch();
}
