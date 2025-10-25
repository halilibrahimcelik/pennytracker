'use client';

import { ColumnDef } from '@tanstack/react-table';

interface Transaction {
  id: string;
  amount: string;
  transactionType: 'income' | 'expense';
  category: string;
}
export const columns: ColumnDef<Transaction>[] = [
  { accessorKey: 'amount', header: 'Amount' },
  { accessorKey: 'transactionType', header: 'Type' },
  { accessorKey: 'category', header: 'Category' },
];
