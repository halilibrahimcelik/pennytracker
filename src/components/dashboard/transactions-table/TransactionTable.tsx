'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
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
import { ChangeEvent, useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDebounce } from '@/hooks';

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
    const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 400);
  const [pagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      pagination: pagination,
    },
  });

  // Update filter when debounced value changes
  useEffect(() => {
    table.getColumn("description")?.setFilterValue(debouncedSearchValue || undefined);
  }, [debouncedSearchValue, table]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

console.log( table.getRowModel().rows)
  return (
    <div>
      <div className='flex justify-end mb-4'>
    <Input 
    aria-label='search transactions'
    id="search" placeholder="Search.."
    value={searchValue}
    onChange={handleOnChange}
 className='w-full lg:max-w-md py-2 px-4' />    
      </div>
      <Table data-testid='transactions-table'>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className={`${
                      header.column.id === 'transactionDate' ||
                      header.column.id === 'amount' ||
                      header.column.id === 'transactionType' ||
                      header.column.id === 'id'
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
            table.getRowModel().rows.map((row, index) => (
              <TableRow
               data-testid={`transaction-row-${row.id}`}
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => {
                  if (cell.column.id === 'transactionType') {
                    const value = String(cell.getValue());

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
                  if (cell.column.id === 'id') {
                    return (
                      <TableCell
                        className='flex  items-center justify-center'
                        key={cell.id}
                      >
                        {index + 1}
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
