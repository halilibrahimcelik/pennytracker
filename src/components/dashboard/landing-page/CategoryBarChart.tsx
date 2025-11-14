'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Label, XAxis, YAxis } from 'recharts';

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
    <Card className='max-h-[600px]'>
      <CardHeader className='flex items-center justify-between gap-2 flex-wrap'>
        <CardTitle>
          {`Transaction by Category - ${
            toggleTransactionType === 'income' ? 'Income' : 'Expense'
          }`}
        </CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
        <Switch
          className='cursor-pointer'
          title='Toggle Transaction Type'
          checked={toggleTransactionType === 'expense'}
          onCheckedChange={(e) =>
            setToggleTransactionType(e ? 'expense' : 'income')
          }
        />{' '}
      </CardHeader>
      <CardContent>
        <ChartContainer
          data-testid='category-bar-chart'
          className='aspect-auto h-[350px] w-full '
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
          <BarChart
            margin={{
              bottom: 50,
              top: 20,
            }}
            accessibilityLayer
            data={chartData}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='category'
              className='mb-20'
              tickLine={false}
              tickMargin={40}
              angle={-90}
              axisLine={true}
              tickFormatter={(value) => value.slice(0)}
            />
            <YAxis>
              <Label
                angle={0}
                position='insideTop'
                offset={-20}
                dx={22}
                style={{
                  textAnchor: 'start',
                  fontSize: '130%',
                }}
                value={'£'}
              />
            </YAxis>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey='GBP' fill='var(--color-category)' radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='text-muted-foreground leading-none'>
          This chart shows your entire {toggleTransactionType} by category
        </div>
      </CardFooter>
    </Card>
  );
};

export default CategoryBarChart;
