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
import { useActionState, useEffect } from 'react';
import { resetPassword } from '@/app/actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/types';

const initialState = {
  success: false,
  errors: {
    newPassword: [],
  },
};
type Props = {
  token: string;
};
export const ResetPasswordForm: React.FC<Props> = ({ token }) => {
  const [state, formAction, pending] = useActionState(
    resetPassword,
    initialState
  );
  const router = useRouter();
  useEffect(() => {
    if (state?.success) {
      toast.success(
        'Password has been reset successfully. You can now log in with your new password.'
      );
      router.push(ROUTES.SIGN_IN);
    }
  }, [state]);
  return (
    <Card className=' px-4 py-8 justify-center w-full  '>
      <CardTitle className='text-center text-2xl uppercase md:text-3xl font-semibold mb-4'>
        Reset your password
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
                  <FieldLabel htmlFor='newPassword'>New Password</FieldLabel>
                  <Input
                    name='newPassword'
                    id='newPassword'
                    type='password'
                    placeholder='Enter your new password'
                  />
                  {!state?.errors.newPassword && (
                    <FieldDescription>
                      Enter your new password.
                    </FieldDescription>
                  )}
                  <FieldError>
                    {state?.errors && state?.errors.newPassword?.join(', ')}
                  </FieldError>
                </Field>
                <input type='hidden' name='token' value={token} />
                <Field>
                  <FieldLabel htmlFor='confirmPassword'>
                    Confirm New Password
                  </FieldLabel>
                  <Input
                    name='confirmPassword'
                    id='confirmPassword'
                    type='password'
                    placeholder='Confirm your new password'
                  />

                  {!state?.errors.confirmPassword && (
                    <FieldDescription>
                      Confirm your new password.
                    </FieldDescription>
                  )}
                  <FieldError>
                    {state?.errors && state?.errors.confirmPassword?.join(', ')}
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
