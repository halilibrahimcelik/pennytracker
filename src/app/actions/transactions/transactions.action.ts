'use server';
import { auth } from '@/lib/auth';
import { transactionSchema } from './transactions.schema';
import { headers } from 'next/headers';
import { db } from '@/db';
import { transaction } from '@/db/schema';

const addNewTransaction = async (initialData: any, formData: FormData) => {
  const validatedData = transactionSchema.safeParse({
    transactionType: formData.get('transactionType'),
    category: formData.get('category'),
    amount: Number(formData.get('amount')),
    description: formData.get('description'),
    date: formData.get('date'),
  });

  if (!validatedData.success) {
    return {
      success: false,
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  const { transactionType, category, amount, description, date } =
    validatedData.data;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const response = {
    success: true,
    transactionType,
    category,
    amount,
    description,
    date,
  };
  if (!session?.user) {
    throw new Error('User not authenticated');
  }
  console.log('Transaction added successfully:', response);
  await db.insert(transaction).values({
    userId: session!.user.id,
    transactionType,
    category,
    amount: amount.toString(),
    description,
    createdAt: date,
  });
  return response;
};

export { addNewTransaction };
