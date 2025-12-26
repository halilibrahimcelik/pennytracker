import Container from "@/components/ui/container";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Container>
        <div className=" py-44  mx-auto w-fit ">{children}</div>
      </Container>
    </main>
  );
};

export default AuthLayout;
