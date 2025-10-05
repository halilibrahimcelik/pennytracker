'use server';

import { success, z } from 'zod';
import bcryptjs from 'bcryptjs';
import { db } from '@/db';
import { signUp } from '@/lib/auth-client';
const schema = z
  .object({
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
  const { email, password } = validatedData.data;
  const hashedPassword = await bcryptjs.hash(
    password,
    process.env.BCRYPT_SALT_ROUNDS
      ? parseInt(process.env.BCRYPT_SALT_ROUNDS)
      : 4
  );

  const newUser = { email, passwordHash: hashedPassword };
  console.log(newUser);
  await signUp.email(
    {
      email: newUser.email,
      password: hashedPassword,

      callbackURL: process.env.BASE_URL!,
      name: 'New User',
    },
    {
      onSuccess: (user) => {
        console.log('User signed up successfully:');
      },
      onError: (error) => console.error('Error signing up user:', error),
    }
  );
  return { success: true, user: newUser };

  //inserting  a new user into the database
  // await db.insert(usersTable).values([
  //     { email, passwordHash: hashedPassword }
  //   ]);
};
