"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import DatePicker from "../../features/DatePicker";
import { Textarea } from "../../ui/textarea";
import { Spinner } from "../../ui/spinner";
import { CATEGORIES } from "@/constants";
import { SelectTransaction } from "@/db/schema";
import { useTransactionMutation } from "@/hooks";
type FieldErrors = {
  transactionType?: string[];
  category?: string[];
  amount?: string[];
  description?: string[];
  date?: string[];
};
type TransactionFormProps = {
  transaction?: SelectTransaction;
};

const TransactionForm: React.FC<TransactionFormProps> = ({ transaction }) => {
  const isEditMode = !!transaction;
  const { mutate, isPending, error } = useTransactionMutation(
    isEditMode ? "update" : "create"
  );
  // Extract Zod field errors
  const fieldErrors = error?.data?.zodError as FieldErrors | undefined;
  const getFieldError = (fieldName: keyof FieldErrors): string | undefined => {
    return fieldErrors?.[fieldName]?.[0];
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget; // Store reference before async operation
    const formData = new FormData(form);
    const input = {
      ...(isEditMode && { id: transaction!.id }),
      transactionType: formData.get("transactionType") as "income" | "expense",
      category: formData.get("category") as string,
      amount: Number(formData.get("amount")),
      description: formData.get("description") as string,
      transactionDate: new Date(formData.get("date") as string),
    };

    mutate(input, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <div>
      <form data-testid="transaction-form" onSubmit={handleSubmit}>
        <FieldSet>
          <FieldGroup>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-4 ">
              <Field>
                <FieldLabel htmlFor="email">Transaction Type</FieldLabel>
                <RadioGroup
                  data-testid="Transaction Type"
                  name="transactionType"
                  className="flex"
                  defaultValue={
                    transaction ? transaction.transactionType : "expense"
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="expense"
                      id="expense"
                      aria-label="Expense"
                    />
                    <Label htmlFor="expense">Expense</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="income"
                      id="income"
                      aria-label="Income"
                    />
                    <Label htmlFor="income">Income</Label>
                  </div>
                </RadioGroup>
                <FieldDescription>Choose your transaction</FieldDescription>
                {getFieldError("transactionType") && (
                  <FieldError data-testid="transactionType-error">
                    {getFieldError("transactionType")}
                  </FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <Select
                  defaultValue={transaction ? transaction.category : ""}
                  name="category"
                >
                  <SelectTrigger
                    aria-label="Category"
                    defaultValue={transaction ? transaction.category : ""}
                    className="w-[180px]"
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {CATEGORIES.map((category) => (
                        <SelectItem
                          key={category}
                          className="capitalize"
                          value={category}
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {getFieldError("category") && (
                  <FieldError data-testid="category-error">
                    {getFieldError("category")}
                  </FieldError>
                )}
              </Field>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 md:gap4 ">
              <Field>
                <FieldLabel htmlFor="date">Transaction Date</FieldLabel>
                <DatePicker
                  defaultValue={
                    transaction ? transaction.transactionDate : undefined
                  }
                />
                {getFieldError("date") && (
                  <FieldError data-testid="date-error">
                    {getFieldError("date")}
                  </FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="amount">Amount</FieldLabel>
                <Input
                  defaultValue={transaction ? transaction.amount : ""}
                  type="number"
                  step="0.01"
                  name="amount"
                  aria-label="Amount"
                  id="amount"
                  placeholder="Enter amount"
                />
                <FieldDescription>Enter transaction amount</FieldDescription>
                {getFieldError("amount") && (
                  <FieldError data-testid="amount-error">
                    {getFieldError("amount")}
                  </FieldError>
                )}
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                defaultValue={transaction ? transaction.description : ""}
                cols={3}
                aria-label="Description"
                name="description"
                id="description"
                placeholder="Enter description"
              />
              <FieldDescription>Enter transaction description</FieldDescription>
              {getFieldError("description") && (
                <FieldError data-testid="description-error">
                  {getFieldError("description")}
                </FieldError>
              )}
            </Field>
          </FieldGroup>

          <Button
            data-testid="submit-button"
            size="sm"
            variant="outline"
            type="submit"
            disabled={isPending}
          >
            {isPending ? <Spinner /> : "Submit"}
          </Button>
        </FieldSet>
      </form>
    </div>
  );
};
export default TransactionForm;
