'use client';
import { signUpCreateUser } from '@/app/actions';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useActionState } from 'react';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
const initialState = {
  success: false,
  errors: {},
};
export const AuthForm: React.FC = () => {
  const [state, formAction, pending] = useActionState(
    signUpCreateUser,
    initialState
  );
  console.log('State:', state);

  return (
    <div className='flex-1 min-w-full lg:min-w-md  '>
      <form action={formAction} className='space-y-6'>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='email'>Email</FieldLabel>
              <Input id='email' type='email' placeholder='you@example.com' />
              <FieldDescription>
                Choose an email for your account.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor='password'>Password</FieldLabel>
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
              <Input id='password' type='password' placeholder='********' />
            </Field>
          </FieldGroup>
          <Button size='sm' variant='outline' type='submit' disabled={pending}>
            {pending && <Spinner />}
            Submit
          </Button>
        </FieldSet>
      </form>
    </div>
  );
};
