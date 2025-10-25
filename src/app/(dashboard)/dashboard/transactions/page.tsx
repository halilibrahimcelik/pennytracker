import { NextPage } from 'next';
import { columns } from '@/components/dashboard/transactions-table/colums';
import TransactionTable from '@/components/dashboard/transactions-table/TransactionTable';
import { db } from '@/db';
import { transaction } from '@/db/schema';
import { auth } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
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
  console.log('Session Data:', session);
  if (!session?.user.id) {
    return <div>Please log in to view your dashboard.</div>;
  }
  const transactions = await getTransactions(session?.user.id);
  console.log('Transactions:', transactions);
  return (
    <div>
      <TransactionTable columns={columns} data={transactions} />
    </div>
  );
};
export default TransactionsPage;
