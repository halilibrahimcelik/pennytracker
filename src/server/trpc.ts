import { initTRPC, TRPCError } from '@trpc/server';
import { auth } from '@/lib/auth/auth';
import { headers } from 'next/headers';
const t = initTRPC.create();

const isAuthenticated = t.middleware(async ({ next }) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User not authenticated',
    });
  }
  return next({
    ctx: { userId: session.user.id },
  });
});
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);
