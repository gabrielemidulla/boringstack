import { fromStore } from 'svelte/store';
import { useSession } from '$lib/auth-client';

const sessionAtom = useSession();
const session = fromStore(sessionAtom);

export function authSession() {
  return session.current;
}

export function isAuthReady() {
  return !session.current.isPending;
}

export function isAuthenticated() {
  return Boolean(session.current.data?.user);
}

export async function refetchSession() {
  await sessionAtom.get().refetch();
}
