'use client';

import { TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import React, { useEffect, useMemo } from 'react';
import DatePicker from '@/components/features/DatePicker';
import { format } from 'date-fns';
import { trpcClientRouter } from '@/lib/trpc/client';
import Typography from '@/components/ui/typogprahy';
import { PiCloudWarningDuotone } from 'react-icons/pi';

export const description = 'A simple pie chart';

// const chartData = [
//   { transactionType: 'chrome', amount: 275, fill: 'var(--color-chrome)' },
//   { transactionType: 'safari', amount: 200, fill: 'var(--color-safari)' },
//   // { transactionType: 'firefox', amount: 187, fill: 'var(--color-firefox)' },
//   // { transactionType: 'edge', amount: 173, fill: 'var(--color-edge)' },
//   // { transactionType: 'other', amount: 90, fill: 'var(--color-other)' },
// ];

const chartConfig = {
  visitors: {
    label: 'Amount',
  },
  income: {
    label: 'Income',
    color: 'var(--chart-1)',
  },

  expense: {
    label: 'Expense',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

type Props = {
  summary: {
    totalIncome: number;
    totalExpense: number;
    net: number;
  };
  fromDate: Date;
  toDate: Date;
};
const ExpenseIncomePieChart: React.FC<Props> = ({
  summary,
  fromDate,
  toDate,
}) => {
  const [summerData, setSummerData] = React.useState(summary);

  const isBudgetBalanced = useMemo(() => summerData.net >= 0, [summerData.net]);

  const [fromStateDate, setFromDate] = React.useState<Date>(fromDate);
  const [toStateDate, setToDate] = React.useState<Date>(toDate);
  const { data, isLoading, error } =
    trpcClientRouter.dashboard.summary.useQuery({
      from: fromStateDate,
      to: toStateDate,
    });
  const monthsDiff = useMemo(() => {
    const diff =
      toStateDate.getMonth() -
      fromStateDate.getMonth() +
      12 * (toStateDate.getFullYear() - fromStateDate.getFullYear());
    return diff + 1;
  }, [fromStateDate, toStateDate]);
  useEffect(() => {
    if (data) {
      setSummerData(data);
    }
  }, [data]);
  const chartData = useMemo(() => {
    return [
      {
        transactionType: 'Income',
        amount: summerData.totalIncome,
        fill: 'var(--chart-1)',
      },
      {
        transactionType: 'Expense',
        amount: summerData.totalExpense,
        fill: 'var(--chart-2)',
      },
    ];
  }, [summerData.totalIncome, summerData.totalExpense]);

  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Expense - Income Overview</CardTitle>
        <CardDescription className='flex flex-wrap gap-2 justify-between items-center'>
          <div>
            {format(fromStateDate, 'MMMM yyyy')} -{' '}
            {format(toStateDate, 'MMMM yyyy')}
          </div>
          <div className='flex gap-2 justify-center'>
            <DatePicker
              label='from'
              onDateChange={setFromDate}
              defaultValue={fromDate}
            />
            <DatePicker
              label='to'
              onDateChange={setToDate}
              defaultValue={toDate}
            />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        {data?.totalExpense === 0 && data?.totalIncome === 0 ? (
          <div className='flex flex-col h-full w-full items-center justify-center text-muted-foreground'>
            <PiCloudWarningDuotone size={50} />

            <Typography variant='p'>
              No data to display, please change the date range
            </Typography>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className='mx-auto aspect-square max-h-[250px]'
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey='amount'
                nameKey='transactionType'
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 leading-none font-medium'>
          {data?.net}
          {' GBP'}
          {isBudgetBalanced ? (
            <TrendingUp className='h-4 w-4' />
          ) : (
            <TrendingUp className='h-4 w-4 rotate-180' />
          )}
        </div>
        <div className='text-muted-foreground leading-none'>
          Showing total balance for the last {monthsDiff} months
        </div>
      </CardFooter>
    </Card>
  );
};
export default ExpenseIncomePieChart;
