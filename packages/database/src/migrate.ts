import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'postgres';
import { sql } from 'drizzle-orm';

async function runMigrations() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error('ERROR: DATABASE_URL environment variable is not set');
    console.error('Please set DATABASE_URL to your PostgreSQL connection string');
    console.error('Example: DATABASE_URL=postgresql://user:password@localhost:5432/bountyz');
    process.exit(1);
  }

  console.log('Starting database migrations...');
  console.log(`Database URL: ${connectionString.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`);

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
    const tables = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('users', 'bounties')
      ORDER BY table_name
    `);
    
    const tableNames = tables.rows.map(r => r.table_name);
    console.log(`✓ Found tables: ${tableNames.join(', ')}`);

    if (tableNames.includes('users') && tableNames.includes('bounties')) {
      console.log('\n✅ All migrations completed successfully!');
    } else {
      console.warn('\n⚠️ Warning: Not all expected tables were found');
    }

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigrations();
