import { trpcClientRouter } from '@/lib/trpc/client';
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
