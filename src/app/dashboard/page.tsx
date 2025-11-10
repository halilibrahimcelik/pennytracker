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
  // const [summary] = await Promise.all([
  //   trpcServer.transaction.summary({ from, to }),
  // ]);
  // console.log('Dashboard summary:', summary);
  const summary = await trpcServer.dashboard.summary({ from, to });
  console.log('Dashboard summary:', summary);
  return (
    <>
      <DashboardLandingPageConent />
    </>
  );
};
export default DashboardPage;
