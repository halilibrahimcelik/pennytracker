'use client';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import DatePicker from '../features/DatePicker';
import { Textarea } from '../ui/textarea';

const categories = [
  'Leisure',
  'Food',
  'Transport',
  'Utilities',
  'Health',
  'Salary',
  'Freelance',
  'Investments',
  'Others',
];
const TransactionForm: React.FC = () => {
  return (
    <div>
      <form>
        <FieldSet>
          <FieldGroup>
            <div className='flex flex-col sm:flex-row gap-2 md:gap-4 '>
              <Field>
                <FieldLabel htmlFor='email'>Transaction Type</FieldLabel>
                <RadioGroup
                  name='transactionType'
                  className='flex'
                  defaultValue='expense'
                >
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='expense' id='expense' />
                    <Label htmlFor='expense'>Expense</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='income' id='income' />
                    <Label htmlFor='income'>Income</Label>
                  </div>
                </RadioGroup>
                <FieldDescription>Choose your transaction</FieldDescription>
                <FieldError data-testid='email-error'></FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor='category'>Category</FieldLabel>
                <Select name='category'>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Select a category' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FieldError data-testid='category-error'></FieldError>
              </Field>
            </div>
            <div className='flex flex-col sm:flex-row gap-2 md:gap4 '>
              <Field>
                <FieldLabel htmlFor='date'>Transaction Date</FieldLabel>
                <DatePicker />
              </Field>
              <Field>
                <FieldLabel htmlFor='amount'>Amount</FieldLabel>
                <Input
                  type='number'
                  name='amount'
                  id='amount'
                  placeholder='Enter amount'
                />

                <FieldDescription>Enter transaction amount</FieldDescription>
                <FieldError data-testid='amount-error'></FieldError>
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor='description'>Description</FieldLabel>
              <Textarea
                cols={3}
                name='description'
                id='description'
                placeholder='Enter description'
              />
              <FieldDescription>Enter transaction description</FieldDescription>
              <FieldError data-testid='description-error'></FieldError>
            </Field>
          </FieldGroup>

          <Button
            data-testid='submit-button'
            size='sm'
            variant='outline'
            type='submit'
          >
            Submit
          </Button>
        </FieldSet>
      </form>
    </div>
  );
};
export default TransactionForm;
