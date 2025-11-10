import DashboardLandingPageConent from '@/components/dashboard/landing-page/DashboardLandingPage';
import { Metadata, NextPage } from 'next';
export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'User Dashboard Page',
};

const DashboardPage: NextPage = async () => {
  return (
    <>
      <DashboardLandingPageConent />
    </>
  );
};
export default DashboardPage;
