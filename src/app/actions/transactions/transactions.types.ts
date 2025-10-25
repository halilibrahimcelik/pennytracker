export type TransactionFormState = {
  success: boolean;
  transactionType: 'income' | 'expense';
  category: string | null;
  amount: number;
  description: string | null;
  date: Date | null;
  errors: {
    transactionType?: string[];
    category?: string[];
    amount?: string[];
    description?: string[];
    date?: string[];
  };
};
