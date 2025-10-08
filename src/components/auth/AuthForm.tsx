'use client';
import { signUpCreateUser } from '@/app/actions';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useActionState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
const initialState = {
  success: false,
  errors: {},
};
import { toast } from 'sonner';

export const AuthForm: React.FC = () => {
  const [state, formAction, pending] = useActionState(
    signUpCreateUser,
    initialState
  );
  useEffect(() => {
    if (state.success) {
      toast.success(
        'Your account has been Created. Please check your email to verify it.',
        {}
      );
    }
  }, [state]);

  return (
    <div className='flex-1 min-w-full lg:min-w-md  '>
      <form action={formAction} className='space-y-6'>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='name'>Name</FieldLabel>
              <Input name='name' id='name' type='name' placeholder='John Doe' />
              {!state.errors?.name && (
                <FieldDescription>
                  Choose a name for your account.
                </FieldDescription>
              )}
              <FieldError>
                {state.errors?.name && state.errors.name.join(', ')}
              </FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor='email'>Email</FieldLabel>
              <Input
                name='email'
                id='email'
                type='email'
                placeholder='you@example.com'
              />
              {!state.errors?.email && (
                <FieldDescription>
                  Choose an email for your account.
                </FieldDescription>
              )}
              <FieldError>
                {state.errors?.email && state.errors.email.join(', ')}
              </FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor='password'>Password</FieldLabel>

              <Input
                name='password'
                id='password'
                type='password'
                placeholder='********'
              />
              {!state.errors?.password && (
                <FieldDescription>
                  Must be at least 4 characters long.
                </FieldDescription>
              )}
              <FieldError>
                {state.errors?.password && state.errors.password.join(', ')}
              </FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor='confirmPassword'>
                Confirm Password
              </FieldLabel>
              <Input
                name='confirmPassword'
                id='confirmPassword'
                type='password'
                placeholder='********'
              />
              <FieldError>
                {state.errors?.confirmPassword &&
                  state.errors.confirmPassword.join(', ')}
              </FieldError>
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
