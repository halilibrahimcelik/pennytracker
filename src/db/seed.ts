import { faker } from '@faker-js/faker';

import { transaction } from './schema';
import { db } from '.';
import { CATEGORIES } from '@/constants';
import { create } from 'domain';
export async function seedTransactions(userId: string, count: number) {
  const transactions = Array.from({ length: count }, () => ({
    userId,
    transactionType: faker.helpers.arrayElement(['income', 'expense']),
    category: faker.helpers.arrayElement(CATEGORIES),
    amount: faker.number.float({ min: 0, max: 1000 }).toString(),
    description: faker.lorem.sentence(),
    createdAt: faker.date.past(),

    transactionDate: faker.date.past(),
  }));
  await db.insert(transaction).values(transactions);
}
// Usage example:

const main = async () => {
  // Seed 10 transactions for a user with ID 'user-123'
  await seedTransactions('bfxBiPxvY9E5RQVPcG3iH3DIpsjU0aRo', 10);
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
