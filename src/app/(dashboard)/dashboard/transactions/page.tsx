import { NextPage } from 'next';
import { TransactionColumns } from '@/components/dashboard/transactions-table/colums';
import TransactionTable from '@/components/dashboard/transactions-table/TransactionTable';
import TransactionTableSkeleton from '@/components/dashboard/transactions-table/TransactionTableSkeleton';
import { db } from '@/db';
import { transaction } from '@/db/schema';
import { auth } from '@/lib/auth';
import { desc, eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/types';
import { Suspense } from 'react';
const getTransactions = async (userId: string) => {
  try {
    const result = await db
      .select()
      .from(transaction)

      .where(eq(transaction.userId, userId))
      .orderBy(desc(transaction.createdAt))
      .limit(10);
    return result;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
};
const TransactionsContent = async ({ userId }: { userId: string }) => {
  const allTransactions = await getTransactions(userId);
  return (
    <TransactionTable columns={TransactionColumns} data={allTransactions} />
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
