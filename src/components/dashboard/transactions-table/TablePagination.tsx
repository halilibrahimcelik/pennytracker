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
import { useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { create } from 'domain';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  count: number;
  pagination: {
    page: number;
    pageSize: number;
  };
}

const DataTablePagination = <TData,>({
  table,
  count,
  pagination,
}: DataTablePaginationProps<TData>) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(pagination.page - 1);

  const [pageSize, setPageSize] = useState(pagination.pageSize);
  const pageCount = useMemo(
    () => Math.ceil(count / pageSize),
    [count, pageSize]
  );
  const createQueryString = useCallback(
    (names: string[], values: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      names.forEach((name, index) => {
        if (params.has(name)) {
          params.set(name, values[index]);
        } else {
          params.append(name, values[index]);
        }
      });
      return params.toString();
    },
    [searchParams]
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
              createQueryString(['pageSize'], [value]);

              router.push(
                `?${createQueryString(['pageSize', 'page'], [value, '1'])}`
              );
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
              router.push(`?${createQueryString(['page'], ['1'])}`);
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
            onClick={() => {
              setPageIndex((old) => old - 1);
              router.push(
                `?${createQueryString(['page'], [pageIndex.toString()])}`
              );
            }}
            disabled={pageIndex === 0}
          >
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='size-8'
            onClick={() => {
              setPageIndex((old) => old + 1);
              const pageParam = searchParams.get('page') ?? '1';
              router.push(
                `?${createQueryString(
                  ['page'],
                  [(Number(pageParam) + 1).toString()]
                )}`
              );
            }}
            disabled={pageIndex === pageCount - 1}
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='hidden size-8 lg:flex'
            onClick={() => {
              setPageIndex(pageCount - 1);
              router.push(
                `?${createQueryString(['page'], [pageCount.toString()])}`
              );
            }}
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
