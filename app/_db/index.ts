import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { config } from "dotenv";
import * as schema from './schema';
config({ path: '.env.local' });
const connectionString = process.env.DATABASE_URL
export const client = postgres(connectionString!, { prepare: false })
export const db = drizzle(client, { schema });