export const SIGN_IN_PATH = '/sign-in';
export const SIGN_UP_PATH = '/sign-up';
export const PRIVATE_PATH = '/private';

export function safeRedirectPath(path: string | null): string | undefined {
  if (!path || !path.startsWith('/') || path.startsWith('//')) {
    return undefined;
  }

  return path;
}
