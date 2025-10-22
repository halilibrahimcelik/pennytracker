import { signUpCreateUser } from '@/app/actions';
import { AuthForm } from '@/components/auth';
import Container from '@/components/ui/container';
import { NextPage } from 'next';
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Container>
        <div className=' my-10 md:my-20 lg:my-32  mx-auto w-fit '>
          {children}
        </div>
      </Container>
    </main>
  );
};

export default AuthLayout;
