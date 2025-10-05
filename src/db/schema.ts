import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: text('created_at').notNull().default(new Date().toISOString()),
  updatedAt: text('updated_at')
    .notNull()
    .default(new Date().toISOString())
    .$onUpdate(() => new Date().toISOString()),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelecTUser = typeof usersTable.$inferSelect;
