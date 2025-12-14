import { trpcClientRouter } from '@/lib/trpc/client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type MutationMode = 'create' | 'update';

export const useTransactionMutation = (mode: MutationMode) => {
  const mutation =
    mode === 'create'
      ? trpcClientRouter.transaction.create.useMutation({
          onSuccess: (data) => {
            toast.success(data.message);
          },
          onError: (error) => {
            console.log(error);
          },
        })
      : trpcClientRouter.transaction.update.useMutation({
          onSuccess: (data) => {
            toast.success(data.message);
          },
          onError: (error) => {
            console.log(error);
          },
        });

  return mutation;
};


export const  useDebounce=<T extends string | number | boolean>(value: T, delay: number = 500):T =>{
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue; 
  }