import { signUpCreateUser } from '@/app/actions';
import { AuthForm } from '@/components/auth';
import Container from '@/components/ui/container';
import { NextPage } from 'next';

const SignUpPage: NextPage = () => {
  const initialState = {
    success: false,
    errors: {},
  };
  return (
    <main>
      <Container>
        <div className=' my-10 md:my-20 lg:my-32  mx-auto w-fit '>
          <AuthForm
            initialState={initialState}
            authMethod={signUpCreateUser}
            title='Create your account'
            authType='sign-up'
          />
        </div>
      </Container>
    </main>
  );
};
export default SignUpPage;
