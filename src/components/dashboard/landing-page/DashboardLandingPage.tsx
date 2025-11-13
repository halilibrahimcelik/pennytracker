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
import ExpenseIncomePieChart from './ExpenseIncomePieChart';
import ExpenseIncomeBarChart from './ExpenseIncomeBarChart';
import CategoryBarChart from './CategoryBarChart';

type Props = {
  summary: {
    totalIncome: number;
    totalExpense: number;
    net: number;
  };
  monthlyFlow: {
    month: string;
    totalIncome: number;
    totalExpense: number;
  }[];
  transactionByCategoryIncome: {
    category: string;
    total: number;
  }[];
  transactionByCategoryExpense: {
    category: string;
    total: number;
  }[];
  fromDate: Date;
  toDate: Date;
};
const DashboardLandingPageConent: React.FC<Props> = ({
  summary,
  monthlyFlow,
  transactionByCategoryIncome,
  transactionByCategoryExpense,
  fromDate,
  toDate,
}) => {
  const session = useSession();

  return (
    <Container className='my-20 px-20'>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mb-10'>
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
      <div className='grid grid-cols-1  gap-8 md:grid-cols-2 '>
        <ExpenseIncomePieChart
          summary={summary}
          fromDate={fromDate}
          toDate={toDate}
        />
        <ExpenseIncomeBarChart />
        <div className='col-span-1 md:col-span-2 '>
          <CategoryBarChart />
        </div>
      </div>
    </Container>
  );
};
export default DashboardLandingPageConent;
