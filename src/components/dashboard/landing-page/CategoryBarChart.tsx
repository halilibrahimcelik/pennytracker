'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

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
import { useMemo, useState } from 'react';
import { Switch } from '@/components/ui/switch';

export const description = 'A bar chart';

const chartConfig = {
  category: {
    label: 'Desktop',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

type Props = {
  transactionByCategoryIncome: {
    category: string;
    total: number;
  }[];
  transactionByCategoryExpense: {
    category: string;
    total: number;
  }[];
};
const CategoryBarChart: React.FC<Props> = ({
  transactionByCategoryIncome,
  transactionByCategoryExpense,
}) => {
  console.log(transactionByCategoryIncome, 'transactionByCategoryIncome');
  console.log(transactionByCategoryExpense, 'transactionByCategoryExpense');
  const [toggleTransactionType, setToggleTransactionType] = useState<
    'income' | 'expense'
  >('income');
  const chartData = useMemo(() => {
    if (toggleTransactionType === 'income') {
      return transactionByCategoryIncome.map((item) => ({
        category: item.category,
        GBP: item.total,
      }));
    } else {
      return transactionByCategoryExpense.map((item) => ({
        category: item.category,
        GBP: item.total,
      }));
    }
  }, [
    toggleTransactionType,
    transactionByCategoryIncome,
    transactionByCategoryExpense,
  ]);
  return (
    <Card className='max-h-[500px]'>
      <CardHeader className='flex items-center justify-between gap-2 flex-wrap'>
        <CardTitle>
          {`Transaction by Category - ${
            toggleTransactionType === 'income' ? 'Income' : 'Expense'
          }`}
        </CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
        <Switch
          title='Toggle Transaction Type'
          checked={toggleTransactionType === 'expense'}
          onCheckedChange={(e) =>
            setToggleTransactionType(e ? 'expense' : 'income')
          }
        />{' '}
      </CardHeader>
      <CardContent>
        <ChartContainer
          className='aspect-auto h-[250px] w-full'
          config={{
            category: {
              label: 'Category',
              color:
                toggleTransactionType === 'income'
                  ? 'var(--chart-1)'
                  : 'var(--chart-2)',
            },
          }}
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='category'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey='GBP' fill='var(--color-category)' radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 leading-none font-medium'>
          Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
        </div>
        <div className='text-muted-foreground leading-none'>
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};

export default CategoryBarChart;
