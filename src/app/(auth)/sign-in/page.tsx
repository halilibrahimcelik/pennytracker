import { signInUser } from '@/app/actions';
import { AuthForm } from '@/components/auth';
import { NextPage } from 'next';

const SignInPage: NextPage = () => {
  const initialState = {
    success: false,
    errors: {},
  };
  return (
    <AuthForm
      initialState={initialState}
      authMethod={signInUser}
      title='Log in to your account'
      authType='sign-in'
    />
  );
};
export default SignInPage;
