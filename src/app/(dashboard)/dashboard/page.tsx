import { Metadata, NextPage } from 'next';
export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'User Dashboard Page',
};

const DashboardPage: NextPage = async () => {
  return <div>Dashboard Page</div>;
};
export default DashboardPage;
