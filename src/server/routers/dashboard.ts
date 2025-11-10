import { protectedProcedure, router } from '../trpc';
import { and, eq, desc, gte, lte, sql } from 'drizzle-orm';
import { transaction } from '@/db/schema';
import { db } from '@/db';

import { z } from 'zod';
export const dashboardRouter = router({
  summary: protectedProcedure
    .input(
      z.object({
        from: z.coerce.date().optional(),
        to: z.coerce.date().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id!;
      const where = and(
        eq(transaction.userId, userId),
        input?.from ? gte(transaction.transactionDate, input.from) : undefined,
        input?.to ? lte(transaction.transactionDate, input.to) : undefined
      );
      const [row] = await db
        .select({
          totalIncome: sql<number>`
            coalesce(sum(CASE WHEN ${transaction.transactionType} = 'income'
              THEN (${transaction.amount})::numeric ELSE 0 END), 0)
          `,
          totalExpense: sql<number>`
            coalesce(sum(CASE WHEN ${transaction.transactionType} = 'expense'
              THEN (${transaction.amount})::numeric ELSE 0 END), 0)
          `,
        })
        .from(transaction)
        .where(where);
      const net = Number(row.totalIncome) - Number(row.totalExpense);
      return {
        totalIncome: parseFloat(Number(row.totalIncome).toFixed(2)),
        totalExpense: parseFloat(Number(row.totalExpense).toFixed(2)),
        net: parseFloat(net.toFixed(2)),
      };
    }),
});
