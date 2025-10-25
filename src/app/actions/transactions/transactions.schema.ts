import { CATEGORIES } from '@/constants';
import z from 'zod';

const transactionSchema = z.object({
  transactionType: z.enum(['income', 'expense']),
  category: z.enum(CATEGORIES, { message: 'Please select a valid category' }),
  amount: z
    .number({ message: 'You must provide a valid amount' })
    .min(0.01, { message: 'Please enter an amount for the transaction' }),
  description: z
    .string({ message: 'Please write down a little bit about detail' })
    .min(2, { message: 'Description must be at least 2 characters long' })
    .max(255, { message: 'Description must be at most 255 characters long' })
    .nonempty({ message: 'Description cannot be empty' }),
  date: z.coerce.date({ message: 'Please provide a valid date' }), // ← Automatically converts string to Date
});

export { transactionSchema };
