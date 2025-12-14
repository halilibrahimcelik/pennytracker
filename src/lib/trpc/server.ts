import { appRouter } from '@/server/routers/_app';
import { createServerContext } from '@/server/context';


export const trpcServer = appRouter.createCaller(createServerContext);
