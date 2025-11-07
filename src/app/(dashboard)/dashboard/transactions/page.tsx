import { NextPage } from 'next';
import { TransactionColumns } from '@/components/dashboard/transactions-table/colums';
import TransactionTable from '@/components/dashboard/transactions-table/TransactionTable';
import TransactionTableSkeleton from '@/components/dashboard/transactions-table/TransactionTableSkeleton';
import { auth } from '@/lib/auth/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/types';
import { Suspense } from 'react';
import { trpcServer } from '@/lib/trpc/server';

const TransactionsContent = async ({ userId }: { userId: string }) => {
  const allTransactions = await trpcServer.transaction.list({
    page: 1,
    pageSize: 10,
  });
  console.log(allTransactions);
  return (
    <TransactionTable
      columns={TransactionColumns}
      data={allTransactions.transactions}
      count={allTransactions.count}
    />
  );
};

const TransactionsPage: NextPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    redirect(ROUTES.SIGN_IN);
  }

  return (
    <div>
      <Suspense fallback={<TransactionTableSkeleton />}>
        <TransactionsContent userId={session.user.id} />
      </Suspense>
    </div>
  );
};
export default TransactionsPage;
