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
import { IoLogoGithub } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';

const initialState = {
  success: false,
  errors: {},
};
import { toast } from 'sonner';
import { signIn } from '@/lib/auth-client';

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
  const handleSignUpWithGithub = async () => {
    try {
      signIn.social({
        provider: 'github',
        callbackURL: '/dashboard',
        loginHint: 'github',
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignUpWithGoogle = async () => {
    try {
      signIn.social({
        provider: 'google',
        callbackURL: '/dashboard',
      });
    } catch (error) {
      console.log(error);
    }
  };

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
      <div className='my-6 flex flex-col gap-2 '>
        <div className='flex items-center  justify-center  gap-5'>
          <hr className='w-full  ' />
          <p className='text-sm uppercase'>OR</p>
          <hr className='w-full' />
        </div>
        <div className='mx-auto flex flex-col gap-2 items-center'>
          <p className='text-muted-foreground text-sm '>
            {' '}
            You can sign up with
          </p>
          <div>
            <Button
              onClick={handleSignUpWithGithub}
              variant={'ghost'}
              size={'icon'}
              aria-label='Sign up with GitHub'
              title='Sign up with GitHub'
              className='h-10 w-10 rounded-full cursor-pointer'
            >
              <IoLogoGithub size={40} aria-label='Sign up with GitHub' />{' '}
            </Button>
            <Button
              onClick={handleSignUpWithGoogle}
              variant={'ghost'}
              size={'icon'}
              aria-label='Sign up with Google'
              title='Sign up with Google'
              className='h-10 w-10 rounded-full cursor-pointer'
            >
              <FcGoogle size={40} aria-label='Sign up with Google' />{' '}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
