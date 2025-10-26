import { auth } from '@/lib/auth/auth';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
export const createContext = async (opts: FetchCreateContextFnOptions) => {
  // const headers = new Headers();
  // Object.entries(opts.req.headers).forEach(([key, value]) => {
  //   if (value) {
  //     headers.set(key, Array.isArray(value) ? value[0] : value);
  //   }
  // });
  const session = await auth.api.getSession({ headers: opts.req.headers });

  return {
    session,
  };
};
export type Context = Awaited<ReturnType<typeof createContext>>;
