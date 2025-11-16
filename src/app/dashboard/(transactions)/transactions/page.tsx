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

type Props = {
  searchParams: Promise<TransactionsContentProps>;
};
type TransactionsContentProps = {
  page: string | null | undefined;
  pageSize: string | null | undefined;
};
const TransactionsContent = async ({
  page,
  pageSize,
}: TransactionsContentProps) => {
  const allTransactions = await trpcServer.transaction.list({
    page: page ? Number(page) : 1,
    pageSize: pageSize ? Number(pageSize) : 10,
  });
  return (
    <TransactionTable
      pagination={{ page: Number(page) || 1, pageSize: Number(pageSize) || 10 }}
      columns={TransactionColumns}
      data={allTransactions.transactions}
      count={allTransactions.count}
    />
  );
};

const TransactionsPage: NextPage<Props> = async ({ searchParams }) => {
  const { page, pageSize } = await searchParams;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    redirect(ROUTES.SIGN_IN);
  }

  return (
    <div>
      <Suspense fallback={<TransactionTableSkeleton />}>
        <TransactionsContent page={page} pageSize={pageSize} />
      </Suspense>
    </div>
  );
};
export default TransactionsPage;
