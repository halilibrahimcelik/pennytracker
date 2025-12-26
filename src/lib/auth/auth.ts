/* eslint-disable @typescript-eslint/no-unused-vars */

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import { resend } from "../resend";
import { schema } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema,
  }),
  plugins: [nextCookies()],
  session: {
    expiresIn: 60 * 60 * 24 * 2, // 2 days,
  },
  trustedOrigins: [
    process.env.BASE_URL!,
    process.env.PROD_BASE_URL!,
    process.env.PROD_BASE_SECOND_URL!,
    process.env.PROD_BASE_THIRD_URL!,
  ],

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 4,
    sendResetPassword: async ({ user, url }, _request) => {
      await resend.emails.send({
        to: user.email!,
        subject: "Reset your password",
        from: "Finance-Tracker <noreply@pennytracker.xyz>",
        html: `
          <p>Click the link below to reset your password:</p>
          <a href="${url}">Reset Password</a>
        `,
      });
    },
    onPasswordReset: async ({ user }, _request) => {
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`);
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId:
        process.env.NODE_ENV === "development"
          ? (process.env.GOOGLE_CLIENT_ID as string)
          : (process.env.PROD_GOOGLE_CLIENT_ID as string),
      clientSecret:
        process.env.NODE_ENV === "development"
          ? (process.env.GOOGLE_CLIENT_SECRET as string)
          : (process.env.PROD_GOOGLE_ClIENT_SECRET as string),
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 180, // 3 hours
    sendVerificationEmail: async ({ user, url, token }, _request) => {
      console.log("Sending verification email to:", user.email);
      console.log("Verification URL:", url);
      console.log("Verification Token:", token);
      const { data, error } = await resend.emails.send({
        from: "Finance-Tracker <noreply@pennytracker.xyz>",
        to: user.email!,
        subject: "Verify your email",
        html: `
            <p>Hi ${user.name},</p>
            <p>Thanks for signing up! Please verify your email by clicking the link below:</p>
            <a href="${url}">Verify Email</a>
          `,
      });
      if (error) {
        console.error("Error sending verification email:", error);
      } else {
        console.log("Verification email sent successfully:", data);
      }
    },
  },
});
