import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "../drizzle/schema";

let cachedDb: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (cachedDb) return cachedDb;
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) return null;

  const connection = await mysql.createConnection(databaseUrl);
  cachedDb = drizzle(connection, { schema });
  return cachedDb;
}
