import { Metadata, NextPage } from 'next';
export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'User Dashboard Page',
};

const DashboardPage: NextPage = async () => {
  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
    </div>
  );
};
export default DashboardPage;
