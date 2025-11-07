import { Table } from '@tanstack/react-table';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMemo, useState } from 'react';
import { set } from 'zod';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  count: number;
}

const DataTablePagination = <TData,>({
  table,
  count,
}: DataTablePaginationProps<TData>) => {
  const [pageIndex, setPageIndex] = useState(1);

  const [pageSize, setPageSize] = useState(10);
  const pageCount = useMemo(
    () => Math.ceil(count / pageSize),
    [count, table.getState().pagination.pageSize]
  );
  return (
    <div className='flex items-center justify-between px-2 py-2'>
      <div className='text-muted-foreground flex-1 text-sm'></div>
      <div className='flex items-center space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <p className='text-sm font-medium'>Rows per page</p>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              const newSize = Number(value);
              table.setPageSize(newSize);
              setPageSize(newSize);
              setPageIndex(0);
            }}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
          Page {pageIndex + 1} of {pageCount}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            size='icon'
            className='hidden size-8 lg:flex'
            onClick={() => {
              table.setPageIndex(0);
              setPageIndex(0);
            }}
            disabled={pageIndex === 0}
          >
            <span className='sr-only'>Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='size-8'
            onClick={() => setPageIndex((old) => old - 1)}
            disabled={pageIndex === 0}
          >
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='size-8'
            onClick={() => setPageIndex((old) => old + 1)}
            disabled={pageIndex === pageCount - 1}
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='hidden size-8 lg:flex'
            onClick={() => setPageIndex(pageCount - 1)}
            disabled={!pageCount || pageIndex === pageCount - 1}
          >
            <span className='sr-only'>Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTablePagination;
