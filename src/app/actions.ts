'use server';

import { success, z } from 'zod';
import bcryptjs from 'bcryptjs';
import { db } from '@/db';
import { usersTable } from '@/db/schema';
const schema = z.object({
  email: z.email({
    message: 'Invalid email address',
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

export const signUpCreateUser = async (
  initialData: any,
  formData: FormData
) => {
  const validatedData = schema.safeParse({
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

  //inserting  a new user into the database
  // await db.insert(usersTable).values([
  //     { email, passwordHash: hashedPassword }
  //   ]);
};
