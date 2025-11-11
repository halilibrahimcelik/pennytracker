import { protectedProcedure, router } from '../trpc';
import { and, eq, desc, gte, lte, sql } from 'drizzle-orm';
import { transaction, user } from '@/db/schema';
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
  montlyFlow: protectedProcedure
    .input(
      z.object({
        months: z.number().min(1).max(12).default(6),
        to: z.coerce.date().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id!;
      const toDate = input.to || new Date();
      const from = new Date(toDate);
      from.setMonth(from.getMonth() - (input?.months ?? 6) + 1);
      const where = and(
        eq(transaction.userId, userId),
        gte(transaction.transactionDate, from),
        lte(transaction.transactionDate, toDate)
      );
      const rows = await db
        .select({
          bucket: sql<string>`
        to_char(date_trunc('month', ${transaction.transactionDate}), 'YYYY-MM')`,
          totalIncome: sql<number>`
        coalesce(sum(CASE WHEN ${transaction.transactionType} = 'income'
          THEN (${transaction.amount})::numeric ELSE 0 END),0)`,
          totalExpense: sql<number>`
        coalesce(sum(CASE WHEN ${transaction.transactionType}= 'expense'
          THEN (${transaction.amount})::numeric ELSE 0 END),0
        )`,
        })
        .from(transaction)
        .where(where)
        .groupBy(sql`date_trunc('month',${transaction.transactionDate})`)
        .orderBy(sql`date_trunc('month',${transaction.transactionDate}) asc`);
      return rows.map((row) => ({
        month: row.bucket,
        totalIncome: parseFloat(Number(row.totalIncome).toFixed(2)),
        totalExpense: parseFloat(Number(row.totalExpense).toFixed(2)),
      }));
    }),
  getTransactionByCategory: protectedProcedure
    .input(
      z.object({
        from: z.coerce.date().optional(),
        to: z.coerce.date().optional(),
        transactionType: z.enum(['expense', 'income']),
      })
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id!;
      const transactionType = input.transactionType;
      const where = and(
        eq(transaction.userId, userId),
        eq(transaction.transactionType, transactionType),
        input?.from ? gte(transaction.transactionDate, input.from) : undefined,
        input?.to ? lte(transaction.transactionDate, input.to) : undefined
      );

      const rows = await db
        .select({
          category: transaction.category,
          total: sql<number>`coalesce(sum((${transaction.amount})::numeric),0) as total`,
        })
        .from(transaction)
        .where(where)
        .groupBy(transaction.category)
        .orderBy(sql`total desc`);
      return rows.map((row) => ({
        category: row.category,
        total: parseFloat(Number(row.total).toFixed(2)),
      }));
    }),
});
