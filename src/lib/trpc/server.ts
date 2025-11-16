import { appRouter } from '@/server/routers/_app';
import { createServerContext } from '@/server/context';

// export const trpcServer = createTRPCClient<AppRouter>({
//   links: [
//     httpBatchLink({
//       url: `${process.env.NEXT_PUBLIC_APP_URL}/api/trpc`,
//       headers: async () => {
//         const headersList = await headers();
//         // Forward cookies from the original request
//         return {
//           cookie: headersList.get('cookie') ?? '',
//         };
//       },
//     }),
//   ],
// });
export const trpcServer = appRouter.createCaller(createServerContext);
