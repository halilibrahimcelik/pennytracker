import { NextPage } from 'next';
import TransactionForm from '@/components/dashboard/transaction-form/TransactionForm';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Typography from '@/components/ui/typogprahy';
import Image from 'next/image';
import { ROUTES } from '@/types';
import { redirect } from 'next/navigation';
import { trpcServer } from '@/lib/trpc/server';

type TransactionDetailsPageProps = {
  params: Promise<{ slug: string }>;
};
const TransactionDetailsPage: NextPage<TransactionDetailsPageProps> = async ({
  params,
}) => {
  const { slug } = await params;
  if (!slug) {
    redirect(ROUTES.NEW_TRANSACTION);
  }
  const transactionData = await trpcServer.transaction.getById({ id: slug });
  console.log(transactionData);
  return (
    <div>
      <div className='grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <Card className='px-2 col-span-1 md:col-span-1 lg:col-span-2'>
          <CardTitle>
            <Typography variant='h3' weight='bold'>
              Update Transaction
            </Typography>
          </CardTitle>
          <CardContent className='p-0'>
            <TransactionForm transaction={transactionData} />
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

export default TransactionDetailsPage;
