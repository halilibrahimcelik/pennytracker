import { NextPage } from 'next';
import { TransactionColumns } from '@/components/dashboard/transactions-table/colums';
import TransactionTable from '@/components/dashboard/transactions-table/TransactionTable';
import TransactionTableSkeleton from '@/components/dashboard/transactions-table/TransactionTableSkeleton';
import { db } from '@/db';
import { transaction } from '@/db/schema';
import { auth } from '@/lib/auth/auth';
import { desc, eq, sql } from 'drizzle-orm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/types';
import { Suspense } from 'react';
import { trpcServer } from '@/lib/trpc/server';
const getTransactions = async (
  userId: string,
  page: number,
  pageSize: number
) => {
  try {
    const result = await db
      .select({
        transactions: transaction,
        count: sql<number>`count(*) over()`.as('total_count'),
      })
      .from(transaction)

      .where(eq(transaction.userId, userId))
      .orderBy(desc(transaction.createdAt))
      .limit(pageSize)
      .offset((page - 1) * pageSize);
    const newShape = {
      transactions: result.map((r) => r.transactions),
      count: result[0]?.count ?? 0,
    };
    return newShape;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return { transactions: [], count: 0 };
  }
};
const TransactionsContent = async ({ userId }: { userId: string }) => {
  // const allTransactions = await getTransactions(userId, 1, 10);
  const allTransactions = await trpcServer.transaction.list.query({
    page: 1,
    pageSize: 10,
  });

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
