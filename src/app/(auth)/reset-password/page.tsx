import { ResetPasswordForm } from '@/components/auth';
import { ROUTES } from '@/types';
import { NextPage } from 'next';
import { redirect } from 'next/navigation';

type Props = {
  searchParams: Promise<{ token: string | undefined }>;
};
const ResetPasswordPage: NextPage<Props> = async ({ searchParams }) => {
  const { token } = await searchParams;
  if (!token) {
    redirect(ROUTES.SIGN_IN);
  }
  return <ResetPasswordForm token={token} />;
};
export default ResetPasswordPage;
