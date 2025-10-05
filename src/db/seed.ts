import { db } from '@/db';
import { usersTable } from './schema';

const seed = async () => {
  try {
    await db.insert(usersTable).values([
      {
        email: 'test@test.com',
        passwordHash:
          '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', // password is "password"
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);
  } catch (error) {
    console.error('Seeding error:', error);
  }
};

seed();
