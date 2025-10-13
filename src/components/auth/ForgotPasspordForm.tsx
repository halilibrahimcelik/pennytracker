'use client';
import Image from 'next/image';
import { Card, CardContent, CardTitle } from '../ui/card';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '../ui/field';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
import { useActionState } from 'react';
import { forgotPassword, resetPassword } from '@/app/actions';

const initialState = {
  success: false,
  errors: {
    email: [],
  },
};
export const ForgotPasswordForm: React.FC = () => {
  const [state, formAction, pending] = useActionState(
    forgotPassword,
    initialState
  );

  return (
    <Card className=' px-4 py-8 justify-center w-full  '>
      <CardTitle className='text-center text-2xl uppercase md:text-3xl font-semibold mb-4'>
        Forgot your password
      </CardTitle>
      <CardContent className='flex  flex-col lg:flex-row items-center  gap-2'>
        <Image
          className='bg-transparent'
          src='auth-logo.svg'
          alt='Sign Up'
          height={200}
          width={400}
          sizes='( max-width: 768px ) 100vw, ( max-width: 1200px ) 50vw, 33vw'
        />
        <div className='flex-1 min-w-full lg:min-w-md  '>
          <form action={formAction} className='space-y-6'>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor='email'>Email</FieldLabel>
                  <Input
                    name='email'
                    id='email'
                    type='email'
                    placeholder='you@example.com'
                  />
                  {!state?.errors.email && (
                    <FieldDescription>
                      Choose an email for your account.sdsd
                    </FieldDescription>
                  )}
                  <FieldError>
                    {state?.errors && state?.errors.email?.join(', ')}
                  </FieldError>
                </Field>
              </FieldGroup>
              <Button
                size='sm'
                variant='outline'
                type='submit'
                disabled={pending}
              >
                {pending && <Spinner />}
                Submit
              </Button>
            </FieldSet>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};
