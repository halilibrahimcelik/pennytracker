import { router, protectedProcedure } from '../trpc';
import { db } from '@/db';
import { transaction } from '@/db/schema';

import { z } from 'zod';

import { eq, desc, sql, and } from 'drizzle-orm';

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
        .where(eq(transaction.userId, ctx.session?.user?.id ?? ''))
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
        transactionDate: z.coerce.date({
          message: 'Please provide a valid date',
        }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) throw new Error('Unauthorized');
      await db.insert(transaction).values({
        userId,
        ...input,
        amount: input.amount.toString(),
      });
      return { success: true, message: 'Transaction created successfully' };
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
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
        transactionDate: z.coerce.date({
          message: 'Please provide a valid date',
        }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) throw new Error('Unauthorized');
      const where = and(
        eq(transaction.id, input.id!),
        eq(transaction.userId, userId)
      );
      await db
        .update(transaction)
        .set({
          transactionType: input.transactionType,
          category: input.category,
          amount: input.amount.toString(),
          description: input.description,
          transactionDate: input.transactionDate,
        })
        .where(where);
      return { success: true, message: 'Transaction updated successfully' };
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const result = await db
        .select()
        .from(transaction)
        .where(eq(transaction.id, input.id));
      return result[0];
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) throw new Error('Unauthorized');
      const where = and(
        eq(transaction.id, input.id),
        eq(transaction.userId, userId)
      );
      await db.delete(transaction).where(where);
      return { success: true, message: 'Transaction deleted successfully' };
    }),
});
