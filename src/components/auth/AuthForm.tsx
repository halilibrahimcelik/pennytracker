'use client';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useActionState, useCallback, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
import { IoLogoGithub } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';

import { toast } from 'sonner';
import { signIn } from '@/lib/auth-client';
import { Card, CardContent, CardTitle } from '../ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/types';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

type Props = {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authMethod: (initialData: any, formData: FormData) => Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialState: any;
  authType: 'sign-in' | 'sign-up';
};
export const AuthForm: React.FC<Props> = ({
  title,
  authMethod,
  initialState,
  authType,
}) => {
  const [state, formAction, pending] = useActionState(authMethod, initialState);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const router = useRouter();
  // useEffect(() => {
  //   if (state.success) {
  //     if (authType === 'sign-in') {
  //       toast.success('You have successfully logged in', {});
  //       router.replace(ROUTES.DASHBOARD);
  //       router.refresh();
  //     } else {
  //       toast.success(
  //         'Your account has been Created. Please check your email to verify it.',
  //         {}
  //       );
  //     }
  //   }
  // }, [state]);
  const handleRouter = useCallback(() => {
    if (state?.success) {
      if (authType === 'sign-in') {
        toast.success('You have successfully logged in', {});
        router.replace(ROUTES.DASHBOARD);
        router.refresh();
      } else {
        toast.success(
          'Your account has been Created. Please check your email to verify it.',
          {}
        );
      }
    }
  }, [state?.success, authType, router]);

  useEffect(() => {
    handleRouter();
  }, [handleRouter]);
  const handleSignUpWithGithub = async () => {
    try {
      signIn.social({
        provider: 'github',
        callbackURL: ROUTES.DASHBOARD,
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
        callbackURL: ROUTES.DASHBOARD,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className=' px-4 py-8 justify-center w-full  '>
      <CardTitle className='text-center text-2xl uppercase md:text-3xl font-semibold mb-4'>
        {title}
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
                {authType === 'sign-up' && (
                  <Field>
                    <FieldLabel htmlFor='name'>Name</FieldLabel>
                    <Input
                      data-testid='name-input'
                      name='name'
                      id='name'
                      type='name'
                      placeholder='John Doe'
                    />
                    {!state.errors?.name && (
                      <FieldDescription>
                        Choose a name for your account.
                      </FieldDescription>
                    )}
                    <FieldError data-testid='name-error'>
                      {state.errors?.name && state.errors.name.join(', ')}
                    </FieldError>
                  </Field>
                )}
                <Field>
                  <FieldLabel htmlFor='email'>Email</FieldLabel>
                  <Input
                    data-testid='email-input'
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
                  <FieldError data-testid='email-error'>
                    {state.errors?.email && state.errors.email.join(', ')}
                  </FieldError>
                </Field>
                <Field className='relative'>
                  <FieldLabel htmlFor='password'>Password</FieldLabel>

                  <Input
                    data-testid='password-input'
                    name='password'
                    id='password'
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder='********'
                  />
                  <div className=''>
                    {passwordVisible ? (
                      <Button
                        title='hide password'
                        type='button'
                        className='absolute right-3 top-[32px] p-1! rounded-full cursor-pointer'
                        variant={'ghost'}
                        size={'icon'}
                        onClick={() => setPasswordVisible(false)}
                      >
                        <EyeOffIcon size={20} />
                      </Button>
                    ) : (
                      <Button
                        title='show password'
                        type='button'
                        className='absolute right-3 top-[32px]  p-1! rounded-full cursor-pointer'
                        variant={'ghost'}
                        size={'icon'}
                        onClick={() => setPasswordVisible(true)}
                      >
                        <EyeIcon size={20} />
                      </Button>
                    )}
                  </div>
                  {!state.errors?.password && (
                    <FieldDescription>
                      Must be at least 4 characters long.
                    </FieldDescription>
                  )}
                  <FieldError data-testid='password-error'>
                    {state.errors?.password && state.errors.password.join(', ')}
                  </FieldError>
                </Field>
                {authType === 'sign-up' && (
                  <Field className='relative'>
                    <FieldLabel htmlFor='confirmPassword'>
                      Confirm Password
                    </FieldLabel>
                    <Input
                      data-testid='confirm-password-input'
                      name='confirmPassword'
                      id='confirmPassword'
                      type={confirmPasswordVisible ? 'text' : 'password'}
                      placeholder='********'
                    />
                    <div className=''>
                      {confirmPasswordVisible ? (
                        <Button
                          title='hide password'
                          type='button'
                          className='absolute right-3 top-[32px] p-1! rounded-full cursor-pointer'
                          variant={'ghost'}
                          size={'icon'}
                          onClick={() => setConfirmPasswordVisible(false)}
                        >
                          <EyeOffIcon size={20} />
                        </Button>
                      ) : (
                        <Button
                          title='show password'
                          type='button'
                          className='absolute right-3 top-[32px]  p-1! rounded-full cursor-pointer'
                          variant={'ghost'}
                          size={'icon'}
                          onClick={() => setConfirmPasswordVisible(true)}
                        >
                          <EyeIcon size={20} />
                        </Button>
                      )}
                    </div>
                    <FieldError>
                      {state.errors?.confirmPassword &&
                        state.errors.confirmPassword.join(', ')}
                    </FieldError>
                  </Field>
                )}
              </FieldGroup>
              <Button
                data-testid='submit-button'
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
          {authType === 'sign-in' && (
            <p className='text-muted-foreground text-xs mt-4 cursor-pointer hover:underline'>
              <Link href={ROUTES.FORGOT_PASSWORD}>Forgot your password?</Link>
            </p>
          )}
          <div className='my-6 flex flex-col gap-2 '>
            <div className='flex items-center  justify-center  gap-5'>
              <hr className='w-full  ' />
              <p className='text-sm uppercase'>OR</p>
              <hr className='w-full' />
            </div>
            <div className='mx-auto flex flex-col gap-2 items-center'>
              <p className='text-muted-foreground text-sm '>
                {' '}
                {authType === 'sign-up' ? 'Sign up with' : 'Sign in with'}{' '}
              </p>
              <div>
                <Button
                  onClick={handleSignUpWithGithub}
                  variant={'ghost'}
                  size={'icon'}
                  aria-label={
                    authType === 'sign-up'
                      ? 'Sign up with GitHub'
                      : 'Sign in with GitHub'
                  }
                  title={
                    authType === 'sign-up'
                      ? 'Sign up with GitHub'
                      : 'Sign in with GitHub'
                  }
                  className='h-10 w-10 rounded-full cursor-pointer'
                >
                  <IoLogoGithub
                    size={40}
                    aria-label={
                      authType === 'sign-up'
                        ? 'Sign up with GitHub'
                        : 'Sign in with GitHub'
                    }
                  />{' '}
                </Button>
                <Button
                  onClick={handleSignUpWithGoogle}
                  variant={'ghost'}
                  size={'icon'}
                  aria-label={
                    authType === 'sign-up'
                      ? 'Sign up with Google'
                      : 'Sign in with Google'
                  }
                  title={
                    authType === 'sign-up'
                      ? 'Sign up with Google'
                      : 'Sign in with Google'
                  }
                  className='h-10 w-10 rounded-full cursor-pointer'
                >
                  <FcGoogle
                    size={40}
                    aria-label={
                      authType === 'sign-up'
                        ? 'Sign up with Google'
                        : 'Sign in with Google'
                    }
                  />{' '}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
