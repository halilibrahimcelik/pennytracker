import { createAuthClient } from 'better-auth/react';
const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.BASE_URL,
});

export const { signIn, signOut, getSession, useSession, signUp } = authClient;
