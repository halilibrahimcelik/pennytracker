'use server';
import { transactionSchema } from './transactions.schema';
import { getSession } from '@/lib/auth-client';

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
  const session = await getSession();
  const userId = session?.data?.user.id;
  console.log('Adding transaction for user ID:', userId);
  const response = {
    success: true,
    transactionType: formData.get('transactionType'),
    category: formData.get('category'),
    amount: Number(formData.get('amount')),
    description: formData.get('description'),
    date: formData.get('date'),
  };
  console.log('Transaction added successfully:', response);
  return response;
};

export { addNewTransaction };
