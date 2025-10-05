'use server';

import { success, z } from 'zod';
import bcryptjs from 'bcryptjs';
import { db } from '@/db';
import { usersTable } from '@/db/schema';
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
  const mockPromise = new Promise((resolve) => setTimeout(resolve, 1000));
  await mockPromise;
  console.log(newUser);
  return { success: true, user: newUser };
  //inserting  a new user into the database
  // await db.insert(usersTable).values([
  //     { email, passwordHash: hashedPassword }
  //   ]);
};
