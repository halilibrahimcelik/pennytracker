import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@/server/routers/_app';
import { headers } from 'next/headers';

export const trpcServer = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_APP_URL}/api/trpc`,
      headers: async () => {
        const headersList = await headers();
        // Forward cookies from the original request
        return {
          cookie: headersList.get('cookie') ?? '',
        };
      },
    }),
  ],
});
