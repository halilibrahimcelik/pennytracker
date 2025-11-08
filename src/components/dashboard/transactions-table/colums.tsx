'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import { format } from 'date-fns';

export type Transaction = {
  id: string;
  description: string;
  amount: string;
  transactionType: 'income' | 'expense';
  category: string;
};
type TransactionColumn = {
  transactions: Transaction;
  count: number;
};

export const TransactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'id',
    header: '#',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'transactionDate',
    header: ({ column }) => {
      return (
        <Button
          title='Sort by Date'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Transaction Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },

    cell: ({ row }) => {
      format(new Date(row.getValue('transactionDate')), 'dd/MM/yyyy');
      return (
        <div>
          {format(new Date(row.getValue('transactionDate')), 'dd/MM/yyyy')}
        </div>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button
          title='Sort by Amount'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Amount
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'GBP',
      }).format(amount);
      return <div>{formatted}</div>;
    },
  },
  { accessorKey: 'transactionType', header: 'Type' },
  { accessorKey: 'category', header: 'Category' },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem className='w-full'>Details </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                    }}
                    title='Delete'
                    variant='destructive'
                  >
                    <MdOutlineDeleteSweep className='text-danger' />
                    Delete
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                  <DialogHeader>
                    <DialogTitle>
                      Delete Transaction #{row.index + 1}{' '}
                    </DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this transaction? This
                      action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant='outline'>Cancel</Button>
                    </DialogClose>
                    <Button type='submit'>Yes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
