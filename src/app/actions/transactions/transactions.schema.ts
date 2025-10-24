import { CATEGORIES } from '@/constants';
import z from 'zod';

const transactionSchema = z.object({
  transactionType: z.enum(['income', 'expense']),
  category: z.enum(CATEGORIES),
  amount: z.number({ message: 'You must provide a valid amount' }).min(0),
  description: z
    .string({ message: 'Please write down a little bit about detail' })
    .min(2)
    .max(255)
    .nonempty(),
  date: z.coerce.date(), // ← Automatically converts string to Date
});

export { transactionSchema };
