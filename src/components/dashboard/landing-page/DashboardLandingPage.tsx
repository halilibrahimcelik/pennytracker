'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Container from '@/components/ui/container';
import { useSession } from '@/lib/auth/auth-client';
import { ROUTES } from '@/types';
import Link from 'next/link';

const DashboardLandingPageConent: React.FC = () => {
  const session = useSession();

  return (
    <Container className='my-20'>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        <Card className='col-span-1 md:col-span-2 '>
          <CardHeader>
            <CardTitle>Welcome back, {session?.data?.user.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Here is an overview of your dashboard.
            </CardDescription>
          </CardContent>
        </Card>
        <div className=''>
          <div className='px-2 w-full h-full flex items-center justify-center'>
            <Button
              className='cursor-pointer w-full'
              asChild
              variant={'default'}
            >
              <Link href={ROUTES.NEW_TRANSACTION}>New Transaction</Link>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default DashboardLandingPageConent;
