import { router, protectedProcedure } from '../trpc';
import { db } from '@/db';
import { transaction } from '@/db/schema';

import { z } from 'zod';

import { eq, desc, sql } from 'drizzle-orm';

export const transactionRouter = router({
  list: protectedProcedure
    .input(
      z.object({
        page: z.number().default(1),
        pageSize: z.number().default(10),
      })
    )
    .query(async ({ input, ctx }) => {
      const result = await db
        .select({
          transactions: transaction,
          count: sql<number>`count(*) over()`.as('total_count'),
        })
        .from(transaction)
        .where(eq(transaction.userId, ctx.userId))
        .orderBy(desc(transaction.createdAt))
        .limit(input.pageSize)
        .offset((input.page - 1) * input.pageSize);
      const newShape = {
        transactions: result.map((r) => r.transactions),
        count: result[0]?.count ?? 0,
      };
      return newShape;
    }),
  create: protectedProcedure
    .input(
      z.object({
        transactionType: z.enum(['income', 'expense'], {
          message: 'Transaction type is required',
        }),
        category: z
          .string({ message: 'Category is required' })
          .nonempty('Please select a category'),
        amount: z
          .number({ message: 'Amount is required' })
          .min(0.01, { message: 'Please write a valid amount' }),
        description: z
          .string({ message: 'Please write a valid description' })
          .max(255)
          .nonempty('Description cannot be empty'),
        date: z.coerce.date({ message: 'Please provide a valid date' }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await db.insert(transaction).values({
        userId: ctx.userId,
        ...input,
        amount: input.amount.toString(),
      });
      return { success: true, message: 'Transaction created successfully' };
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await db.delete(transaction).where(eq(transaction.id, input.id));
      return { success: true, message: 'Transaction deleted successfully' };
    }),
});
