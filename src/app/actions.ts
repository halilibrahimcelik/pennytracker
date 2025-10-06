'use server';

import { z } from 'zod';
import bcryptjs from 'bcryptjs';
import { signUp } from '@/lib/auth-client';
const schema = z
  .object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    email: z.email({
      message: 'Invalid email address',
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    }),
    password: z
      .string()
      .min(4, { message: 'Password must be at least 4 characters long' }),
    confirmPassword: z
      .string()
      .min(4, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

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
  console.log(formData, 'formData');
  if (!validatedData.success) {
    return {
      success: false,
      errors: validatedData.error.flatten().fieldErrors,
    };
  }
  const { email, password, name } = validatedData.data;
  const hashedPassword = await bcryptjs.hash(
    password,
    process.env.BCRYPT_SALT_ROUNDS
      ? parseInt(process.env.BCRYPT_SALT_ROUNDS)
      : 12
  );
  await signUp.email(
    {
      email,
      password: hashedPassword,

      callbackURL: process.env.BASE_URL! + '/dashboard',
      name,
    },
    {
      onSuccess: (user) => {
        console.log('User signed up successfully:');
      },
      onError: (error) => console.error('Error signing up user:', error),
    }
  );
  return { success: true, user: validatedData.data };

  //inserting  a new user into the database
  // await db.insert(usersTable).values([
  //     { email, passwordHash: hashedPassword }
  //   ]);
};
