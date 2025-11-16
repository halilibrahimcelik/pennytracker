import { AppRouter } from '@/server/routers/_app';
import { createTRPCReact } from '@trpc/react-query';
export const trpcClientRouter = createTRPCReact<AppRouter>();
