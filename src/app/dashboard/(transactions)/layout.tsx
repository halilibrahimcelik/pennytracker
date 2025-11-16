import Container from '@/components/ui/container';

import CustomBreadCrumb from '@/components/features/CustomBreadCrumb';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container className='mt-10 '>
      <CustomBreadCrumb />

      <div className='my-5'>{children}</div>
    </Container>
  );
};
export default DashboardLayout;
