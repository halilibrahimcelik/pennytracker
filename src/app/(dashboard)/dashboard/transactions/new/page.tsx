import { Card, CardTitle } from '@/components/ui/card';
import Typography from '@/components/ui/typogprahy';
import { NextPage } from 'next';

const NewTransactionPage: NextPage = () => {
  return (
    <div>
      <Card className='px-2'>
        <CardTitle>
          <Typography variant='h2' weight='bold'>
            New Transaction
          </Typography>
        </CardTitle>
      </Card>
    </div>
  );
};
export default NewTransactionPage;
