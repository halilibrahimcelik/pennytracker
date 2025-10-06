import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db'; // your drizzle instance
import { resend } from './resend';
import { schema } from '@/db/schema';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 120, // 12 hours
    sendVerificationEmail: async ({ user, url, token }, request) => {
      console.log('Sending verification email to:', user.email);
      console.log('Verification URL:', url);
      console.log('Verification Token:', token);
      const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: user.email!,
        subject: 'Verify your email',
        html: `
            <p>Hi ${user.name},</p>
            <p>Thanks for signing up! Please verify your email by clicking the link below:</p>
            <a href="${url}">Verify Email</a>
          `,
      });
      if (error) {
        console.error('Error sending verification email:', error);
      } else {
        console.log('Verification email sent successfully:', data);
      }
    },
  },
});
