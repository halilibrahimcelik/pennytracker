import { auth } from '@/lib/auth/auth';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { headers } from 'next/headers';
import { cache } from 'react';

// For API routes (client-side calls)
export const createContext = async (opts: FetchCreateContextFnOptions) => {
  const session = await auth.api.getSession({ headers: opts.req.headers });

  return {
    session,
  };
};
// For Server Components (server-side calls)
export const createServerContext = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return { session };
});
export type Context = Awaited<ReturnType<typeof createContext>>;

// The Two Contexts Explained
// createContext - Used by fetchRequestHandler in your API route when clients make HTTP calls
// createServerContext - Used by Server Components to call tRPC directly without HTTP
