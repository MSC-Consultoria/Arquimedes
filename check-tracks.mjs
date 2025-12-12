import { drizzle } from 'drizzle-orm/mysql2';
import { tracks } from './drizzle/schema.js';

const db = drizzle(process.env.DATABASE_URL);
const result = await db.select().from(tracks);

console.log('Trilhas no banco:');
result.forEach(t => {
  console.log(`- ID ${t.id}: "${t.title}"`);
});

process.exit(0);
