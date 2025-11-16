import { signUpCreateUser } from '@/app/actions/auth/auth.actions';
import { AuthForm } from '@/components/auth';
import { NextPage } from 'next';

const SignUpPage: NextPage = () => {
  const initialState = {
    success: false,
    errors: {},
  };
  return (
    <AuthForm
      initialState={initialState}
      authMethod={signUpCreateUser}
      title='Create your account'
      authType='sign-up'
    />
  );
};
export default SignUpPage;
