export enum ROUTES {
  HOME = '/',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  FORGOT_PASSWORD = '/forgot-password',
  RESET_PASSWORD = '/reset-password',
  DASHBOARD = '/dashboard',
  TRANSACTIONS = '/dashboard/transactions',
  NEW_TRANSACTION = '/dashboard/transactions/new',
}


export type Transaction = {
  id: string;
  description: string;
  amount: string;
  transactionType: 'income' | 'expense';
  category: string;
};