import { Metadata, NextPage } from 'next';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'User Dashboard Page',
};

const DashboardPage: NextPage = async () => {
  return <div>Dashboard Page</div>;
};
export default DashboardPage;
