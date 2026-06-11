import api from '@boringstack/sdk';
import type { IConnection } from '@boringstack/sdk';

export const connection: IConnection = {
  host:
    (import.meta.env.PUBLIC_API_URL as string | undefined) ??
    'http://localhost:3000',
  options: {
    credentials: 'include',
  },
};

export { api };
