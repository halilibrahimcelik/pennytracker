import { AuthForm } from '@/components/auth';
import { Card } from '@/components/ui/card';
import Container from '@/components/ui/container';
import { NextPage } from 'next';
import Image from 'next/image';

const SignUpPage: NextPage = () => {
  return (
    <main>
      <Container>
        <div className=' my-10 md:my-20 lg:my-32  mx-auto w-fit '>
          <Card className='flex  flex-col lg:flex-row items-center  p-4 justify-center w-full  '>
            <Image
              className='bg-transparent'
              src='auth-logo.svg'
              alt='Sign Up'
              height={200}
              width={400}
              sizes='( max-width: 768px ) 100vw, ( max-width: 1200px ) 50vw, 33vw'
            />
            <AuthForm />
          </Card>
        </div>
      </Container>
    </main>
  );
};
export default SignUpPage;
