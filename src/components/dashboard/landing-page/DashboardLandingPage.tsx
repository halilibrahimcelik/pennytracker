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
import { TbTransactionPound, TbTableDashed } from 'react-icons/tb';

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
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-10'>
        <Card className='m-0 p-0 border-0 gap-0 shadow-none bg-transparent'>
          <CardHeader className='m-0 p-0'>
            <CardTitle>Welcome back, {session?.data?.user.name}</CardTitle>
          </CardHeader>
          <CardContent className='m-0 p-0'>
            <CardDescription>
              Here is an overview of your dashboard.
            </CardDescription>
          </CardContent>
        </Card>
        <div className='col-span-1'>
          <div className='  h-full grid sm:grid-cols-2  gap-2 sm:justify-center'>
            <Button
              className='cursor-pointer  group h-full w-full'
              asChild
              variant={'default'}
            >
              <div>
                <TbTransactionPound className='group-hover:scale-120 transition-transform ease-in' />
                <Link href={ROUTES.NEW_TRANSACTION}>New Transaction</Link>
              </div>
            </Button>
            <Button
              className='cursor-pointer group   h-full w-full'
              asChild
              variant={'default'}
            >
              <div>
                <TbTableDashed className='group-hover:scale-120 transition-transform ease-in' />
                <Link href={ROUTES.TRANSACTIONS}>All Transaction</Link>
              </div>
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
        <CategoryBarChart
          transactionByCategoryIncome={transactionByCategoryIncome}
          transactionByCategoryExpense={transactionByCategoryExpense}
        />
        <div className='col-span-1 md:col-span-2 '>
          <ExpenseIncomeBarChart monthlyFlow={monthlyFlow} toDate={toDate} />
        </div>
      </div>
    </Container>
  );
};
export default DashboardLandingPageConent;
