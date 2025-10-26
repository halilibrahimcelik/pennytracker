import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@/server/routers/_app';

export const trpcServeR = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_APP_URL}/api/trpc`,
    }),
  ],
});
