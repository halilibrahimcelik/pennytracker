import z from 'zod';

const signUpSchema = z
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
const emailSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});
const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(4, { message: 'Password must be at least 4 characters long' })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/, {
        message: 'Password must contain at least one letter and one number',
      }),
    confirmPassword: z
      .string()
      .min(4, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
export { signUpSchema, signInSchema, emailSchema, passwordSchema };
