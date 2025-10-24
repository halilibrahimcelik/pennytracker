import TransactionForm from '@/components/transaction-form/TransactionForm';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Typography from '@/components/ui/typogprahy';
import { NextPage } from 'next';

const NewTransactionPage: NextPage = () => {
  return (
    <div>
      <Card className='px-2 max-w-3xl'>
        <CardTitle>
          <Typography variant='h3' weight='bold'>
            New Transaction
          </Typography>
        </CardTitle>
        <CardContent className='p-0'>
          <TransactionForm />
        </CardContent>
      </Card>
    </div>
  );
};
export default NewTransactionPage;
