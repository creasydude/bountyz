import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'postgres';
import { sql } from 'drizzle-orm';

function maskUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.password) {
      parsed.password = '***';
    }
    if (parsed.username) {
      parsed.username = '***';
    }
    return parsed.toString();
  } catch {
    return 'invalid-url';
  }
}

async function runMigrations() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('ERROR: DATABASE_URL environment variable is not set');
    console.error('Please set DATABASE_URL to your PostgreSQL connection string');
    console.error('Example: DATABASE_URL=postgresql://user:password@localhost:5432/bountyz');
    process.exit(1);
  }

  console.log('Starting database migrations...');
  console.log(`Database URL: ${maskUrl(connectionString)}`);

  const client = pg(connectionString);
  const db = drizzle(client);

  try {
    // Test connection
    console.log('Testing database connection...');
    await db.execute(sql`SELECT 1`);
    console.log('✓ Database connection successful');

    // Run migrations
    console.log('Running migrations...');
    await migrate(db, { migrationsFolder: './migrations' });
    console.log('✓ Migrations completed successfully');

    // Verify tables exist
    console.log('Verifying tables...');
    const expectedTables = ['users', 'bounties'];
    const tables = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = ANY(${expectedTables})
      ORDER BY table_name
    `);
    
    const tableNames = tables.rows.map(r => r.table_name as string);
    console.log(`✓ Found tables: ${tableNames.join(', ')}`);

    const missingTables = expectedTables.filter(t => !tableNames.includes(t));
    if (missingTables.length === 0) {
      console.log('\n✅ All migrations completed successfully!');
    } else {
      console.warn(`\n⚠️ Warning: Missing tables: ${missingTables.join(', ')}`);
    }

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigrations();
