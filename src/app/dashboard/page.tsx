import DashboardLandingPageConent from '@/components/dashboard/landing-page/DashboardLandingPage';
import { auth } from '@/lib/auth/auth';
import { trpcServer } from '@/lib/trpc/server';
import { ROUTES } from '@/types';
import { Metadata, NextPage } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'User Dashboard Page',
};

const DashboardPage: NextPage = async () => {
  const to = new Date();
  const from = new Date();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    redirect(ROUTES.SIGN_IN);
  }
  from.setMonth(from.getMonth() - 5);
  const [
    summary,
    monthlyFlow,
    transactionByCategoryIncome,
    transactionByCategoryExpense,
  ] = await Promise.all([
    trpcServer.dashboard.summary({ from }),
    trpcServer.dashboard.montlyFlow({ months: 12 }),
    trpcServer.dashboard.getTransactionByCategory({
      transactionType: 'income',
    }),
    trpcServer.dashboard.getTransactionByCategory({
      transactionType: 'expense',
    }),
  ]);
  return (
    <>
      <DashboardLandingPageConent
        fromDate={from}
        toDate={
          (summary.latestTransactionDate &&
            new Date(summary.latestTransactionDate)) ||
          to
        }
        summary={summary}
        monthlyFlow={monthlyFlow}
        transactionByCategoryIncome={transactionByCategoryIncome}
        transactionByCategoryExpense={transactionByCategoryExpense}
      />
    </>
  );
};
export default DashboardPage;
