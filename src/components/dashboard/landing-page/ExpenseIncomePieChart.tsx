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
import React, { useMemo } from 'react';

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
  chrome: {
    label: 'Income',
    color: 'var(--chart-1)',
  },

  safari: {
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
};
const ExpenseIncomePieChart: React.FC<Props> = ({ summary }) => {
  const isBudgetBalanced = summary.net >= 0;
  const chartData = useMemo(() => {
    return [
      {
        transactionType: 'Income',
        amount: summary.totalIncome,
        fill: 'var(--chart-3)',
      },
      {
        transactionType: 'Expense',
        amount: summary.totalExpense,
        fill: 'var(--chart-2)',
      },
    ];
  }, [summary.totalIncome, summary.totalExpense]);
  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Expense - Income Overview</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[250px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey='amount' nameKey='transactionType' />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 leading-none font-medium'>
          {summary.net}
          {' GBP'}
          {isBudgetBalanced ? (
            <TrendingUp className='h-4 w-4' />
          ) : (
            <TrendingUp className='h-4 w-4 rotate-180' />
          )}
        </div>
        <div className='text-muted-foreground leading-none'>
          Showing total balance for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};
export default ExpenseIncomePieChart;
