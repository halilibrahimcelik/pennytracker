import { NextPage } from 'next';
import { TransactionColumns } from '@/components/dashboard/transactions-table/colums';
import TransactionTable from '@/components/dashboard/transactions-table/TransactionTable';
import { db } from '@/db';
import { transaction } from '@/db/schema';
import { auth } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/types';
const getTransactions = async (userId: string) => {
  try {
    const result = await db
      .select()
      .from(transaction)
      .where(eq(transaction.userId, userId));
    return result;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
};
const TransactionsPage: NextPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    redirect(ROUTES.SIGN_IN);
  }
  const allTransactions = await getTransactions(session?.user.id);
  return (
    <div>
      <TransactionTable columns={TransactionColumns} data={allTransactions} />
    </div>
  );
};
export default TransactionsPage;
