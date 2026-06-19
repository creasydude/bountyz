import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/bountyz';

const client = pg(connectionString);

export const db = drizzle(client, { schema });

export { schema };
