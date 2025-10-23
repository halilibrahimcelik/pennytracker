import Container from '@/components/ui/container';

import CustomBreadCrumb from '@/components/features/CustomBreadCrumb';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container className='mt-10'>
      <CustomBreadCrumb />

      {children}
    </Container>
  );
};
export default DashboardLayout;
