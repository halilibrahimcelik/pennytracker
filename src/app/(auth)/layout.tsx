import Container from '@/components/ui/container';
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
