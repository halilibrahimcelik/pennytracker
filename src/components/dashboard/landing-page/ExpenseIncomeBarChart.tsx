'use client';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { format } from 'date-fns';
import { useMemo } from 'react';

export const description = 'A multiple bar chart';

// const chartData = [
//   { month: 'January', desktop: 186, mobile: 80 },
//   { month: 'February', desktop: 305, mobile: 200 },
//   { month: 'March', desktop: 237, mobile: 120 },
//   { month: 'April', desktop: 73, mobile: 190 },
//   { month: 'May', desktop: 209, mobile: 130 },
//   { month: 'June', desktop: 214, mobile: 140 },
//   { month: 'July', desktop: 240, mobile: 150 },
//   { month: 'August', desktop: 220, mobile: 160 },
//   { month: 'September', desktop: 250, mobile: 170 },
//   { month: 'October', desktop: 260, mobile: 180 },

//   { month: 'November', desktop: 270, mobile: 190 },
//   { month: 'December', desktop: 300, mobile: 200 },
// ];

type Props = {
  monthlyFlow: {
    month: string;
    totalIncome: number;
    totalExpense: number;
  }[];
  toDate: Date;
};
const ExpenseIncomeBarChart: React.FC<Props> = ({ monthlyFlow, toDate }) => {
  const chartData = useMemo(() => {
    const monthsArray: string[] = [];
    const date = new Date(toDate);
    date.setMonth(date.getMonth() - 11);
    for (let i = 0; i < 12; i++) {
      const monthStr = format(date, 'MMM yy');
      monthsArray.push(monthStr);
      date.setMonth(date.getMonth() + 1);
    }

    const array: { month: string; income: number; expense: number }[] = [];
    monthsArray.forEach((month) => {
      const dataForMonth = monthlyFlow.find((data) => data.month === month);
      array.push({
        month: month,
        income: dataForMonth ? dataForMonth.totalIncome : 0,
        expense: dataForMonth ? dataForMonth.totalExpense : 0,
      });
    });
    return array;
  }, [monthlyFlow, toDate]);

  return (
    <Card>
      <CardHeader>
        <CardTitle> Expense - Income Flow for last 12 months</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          data-testid='expense-income-bar-chart'
          className='aspect-auto h-[250px] w-full'
          config={{
            income: {
              label: 'Income',
              color: 'var(--chart-1)',
            },
            expense: {
              label: 'Expense',
              color: 'var(--chart-2)',
            },
          }}
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='dashed' />}
            />
            <Bar dataKey='income' fill='var(--color-income)' radius={4} />
            <Bar dataKey='expense' fill='var(--color-expense)' radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 leading-none font-medium'>
          Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
        </div>
        <div className='text-muted-foreground leading-none'>
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
};

export default ExpenseIncomeBarChart;
