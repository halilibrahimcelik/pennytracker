'use server';
import {
  emailSchema,
  passwordSchema,
  signInSchema,
  signUpSchema,
} from './auth.schema';
import { signUp } from '@/lib/auth/auth-client';
import { auth } from '@/lib/auth/auth';
import { headers } from 'next/headers';
import { APIError } from 'better-auth';
import { ROUTES } from '@/types';
import { db } from '@/db';
import { account,user } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const signInUser = async (initialData: unknown, formData: FormData) => {
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
        callbackURL: process.env.BASE_URL! + ROUTES.DASHBOARD,
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData: any,
  formData: FormData
) => {
  const validatedData = signUpSchema.safeParse({
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
      onSuccess:async (data) => {

        try {
         await db.update(account).set({
          userEmail: email,
        }).where(eq(account.userId, data.data.user.id));
       
        } catch (error) {
          if(error instanceof Error){
            console.error('Error updating user email in account table:', error.message);
          }
        }
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
    console.error('Error during sign-out:', error);
    return {
      success: false,
      error: 'Error signing out',
    };
  }
};

export const forgotPassword = async (
  initialData: unknown,
  formData: FormData
) => {
  const validatedData = emailSchema.safeParse({
    email: formData.get('email'),
  });
  if (!validatedData.success) {
    return {
      success: false,
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  const { email } = validatedData.data;
  
  try {

    const isRegisteredWithPassword=await isAccountRegisteredWithPassword(email);
    if(!isRegisteredWithPassword){
      return {
        success: false,
        errors: { email: ['This  email is used by OAuth provider. Please use the OAuth provider to sign in.'] },
      };
    }
  const res=  await auth.api.requestPasswordReset({
      body: {
        email, // required
        redirectTo: process.env.BASE_URL! + ROUTES.RESET_PASSWORD, // Use your base URL
      },
    });
    return { success: true, errors: { email: [] } };
  } catch (error) {
    console.error('Error during password reset:', error);
    if (error instanceof APIError) {
      return {
        success: false,
        errors: { email: [error.body?.message || 'Error sending reset email'] },
      };
    }
    // Handle non-APIError exceptions
    return {
      success: false,
      errors: { email: ['An unexpected error occurred. Please try again.'] },
    };
  }
};

export const resetPassword = async (
  initialData: unknown,
  formData: FormData
) => {
  const validatedData = passwordSchema.safeParse({
    newPassword: formData.get('newPassword'),
    confirmPassword: formData.get('confirmPassword'),
  });
  if (!validatedData.success) {
    return {
      success: false,
      errors: validatedData.error.flatten().fieldErrors,
    };
  }
  const token = formData.get('token') as string;
  const { newPassword } = validatedData.data;
  try {
    const data = await auth.api.resetPassword({
      body: {
        newPassword, // required
        token, // required
      },
    });

    if (data.status) {
      return { success: true, errors: { newPassword: [] } };
    }
  } catch (error) {
    console.error('Error during password reset:', error);
    if (error instanceof APIError) {
      return {
        success: false,
        errors: {
          newPassword: [error.body?.message || 'Error resetting password'],
        },
      };
    }
    return {
      success: false,
      errors: {
        newPassword: ['An unexpected error occurred. Please try again.'],
      },
    };
  }
};

const isAccountRegisteredWithPassword=async(email:string):Promise<boolean>=>{
  try {
    const data=await db.select().from(account).where(eq(account.userEmail,email));
    if(data.length===0){
      return false;
    }
    const acc=data[0];
    return acc.password !==null && acc.password !==undefined;
  } catch (error) {
    if(error instanceof Error){
      console.error('Error checking account registration method:', error.message);
    }
    return false;
  }
}