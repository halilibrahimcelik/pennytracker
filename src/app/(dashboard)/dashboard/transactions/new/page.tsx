import TransactionForm from '@/components/transaction-form/TransactionForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Typography from '@/components/ui/typogprahy';
import { ROUTES } from '@/types';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const NewTransactionPage: NextPage = () => {
  return (
    <div>
      <div className='grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <Card className='px-2 col-span-1 md:col-span-1 lg:col-span-2'>
          <CardTitle>
            <Typography variant='h3' weight='bold'>
              New Transaction
            </Typography>
          </CardTitle>
          <CardContent className='p-0'>
            <TransactionForm />
          </CardContent>
        </Card>
        <div className='flex items-center  justify-center'>
          <Image
            alt='Transaction Illustration'
            width={400}
            height={100}
            src='/transaction.svg'
          />
        </div>
      </div>
    </div>
  );
};
export default NewTransactionPage;
