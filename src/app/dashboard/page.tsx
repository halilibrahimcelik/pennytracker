import DashboardLandingPageConent from '@/components/dashboard/landing-page/DashboardLandingPage';
import { trpcServer } from '@/lib/trpc/server';
import { Metadata, NextPage } from 'next';
export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'User Dashboard Page',
};

const DashboardPage: NextPage = async () => {
  const to = new Date();
  const from = new Date();
  from.setMonth(from.getMonth() - 5);
  const [summary, monthlyFlow, transactionByCategory] = await Promise.all([
    trpcServer.dashboard.summary({ from, to }),
    trpcServer.dashboard.montlyFlow({ months: 6, to }),
    trpcServer.dashboard.getTransactionByCategory({
      transactionType: 'income',
    }),
  ]);
  console.log({ summary, monthlyFlow, transactionByCategory });
  return (
    <>
      <DashboardLandingPageConent />
    </>
  );
};
export default DashboardPage;
