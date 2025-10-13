'use server';
import { success, z } from 'zod';
import { signIn, signUp } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { APIError, BetterAuthError } from 'better-auth';

const schema = z
  .object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    email: z.email({
      message: 'Invalid email address',
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    }),
    password: z
      .string()
      .min(4, { message: 'Password must be at least 4 characters long' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/, {
        message: 'Password must contain at least one letter and one number',
      }),
    confirmPassword: z
      .string()
      .min(4, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const signInSchema = z.object({
  email: z.email({
    message: 'Invalid email address',
  }),
  password: z
    .string()
    .min(4, { message: 'Password must be at least 4 characters long' })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/, {
      message: 'Password must contain at least one letter and one number',
    }),
});

export const signInUser = async (initialData: any, formData: FormData) => {
  const validatedData = signInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!validatedData.success) {
    return {
      success: false,
      errors: validatedData.error.flatten().fieldErrors,
    };
  }
  const { email, password } = validatedData.data;
  console.log('Signing in user with email:', email);
  console.log('Signing in user with password:', password);
  try {
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: process.env.BASE_URL! + '/dashboard',
      },
      headers: await headers(),
    });
    if (response.user) {
      return {
        success: true,
        user: response.user,
        errors: {
          email: [],
          password: [],
        },
      };
    }
  } catch (error) {
    console.error('Error during sign-in:', error);

    if (error instanceof APIError) {
      return {
        success: false,
        errors: {
          email: [error.body?.message || 'Invalid email or password'],
          password: [],
        },
      };
    }
  }
};

export const signUpCreateUser = async (
  initialData: any,
  formData: FormData
) => {
  const validatedData = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });
  if (!validatedData.success) {
    return {
      success: false,
      errors: validatedData.error.flatten().fieldErrors,
    };
  }
  const { email, password, name } = validatedData.data;

  const response = await signUp.email(
    {
      email,
      password,

      callbackURL: process.env.BASE_URL! + '/dashboard',
      name,
    },
    {
      onSuccess: (user) => {
        console.log('User signed up successfully:');
      },
      onError: (error) => {
        console.error('Error signing up user:', error);
      },
    }
  );
  if (response.error) {
    return {
      success: false,
      errors: {
        name: [],
        email: [response.error.message],
        password: [],
        confirmPassword: [],
      },
    };
  } else {
    return { success: true, user: validatedData.data };
  }
};

export const signOutUser = async () => {
  try {
    const response = await auth.api.signOut({
      headers: await headers(),
    });
    if (response) {
      return {
        success: response,
        error: 'No error',
      };
    }
  } catch (error) {
    return {
      success: false,
      error: 'Error signing out',
    };
  }
};
