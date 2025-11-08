'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DataTablePagination from './TablePagination';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  count: number;
  pagination: {
    page: number;
    pageSize: number;
  };
}

const TransactionTable = <TData, TValue>({
  columns,
  data,
  count,
  pagination: { page, pageSize },
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      pagination: pagination,
    },
  });
  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className={`${
                      header.column.id === 'transactionDate' ||
                      header.column.id === 'amount' ||
                      header.column.id === 'transactionType'
                        ? 'text-center'
                        : ''
                    }`}
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => {
                  if (cell.column.id === 'transactionType') {
                    const value = String(cell.getValue());
                    const capitalizedValue =
                      value.charAt(0).toUpperCase() + value.slice(1);
                    return (
                      <TableCell
                        className='flex  items-center justify-center'
                        key={cell.id}
                      >
                        <Badge
                          variant={
                            value === 'income' ? 'success' : 'destructive'
                          }
                        >
                          {value}
                        </Badge>
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell
                      className={`${
                        cell.column.id === 'transactionDate' ||
                        cell.column.id === 'amount'
                          ? 'text-center'
                          : ''
                      }`}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <hr />
      <DataTablePagination
        table={table}
        count={count}
        pagination={{ page, pageSize }}
      />
    </div>
  );
};

export default TransactionTable;
