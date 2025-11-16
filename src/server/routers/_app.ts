import { router } from '../trpc';
import { transactionRouter } from './transaction';
import { dashboardRouter } from './dashboard';
export const appRouter = router({
  transaction: transactionRouter,
  dashboard: dashboardRouter,
});

export type AppRouter = typeof appRouter;
