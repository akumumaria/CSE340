require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Expected tables based on setup.sql
const EXPECTED_TABLES = [
  'organizations',
  'projects',
  'categories',
  'project_categories',
  'volunteers',
  'roles',
  'users',
  'session'
];

async function checkDatabaseSync() {
  try {
    console.log('Connecting to database...');
    const client = await pool.connect();
    
    try {
      console.log('Checking existing tables...');
      
      // Get all tables in the database
      const result = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        ORDER BY table_name;
      `);
      
      const existingTables = result.rows.map(row => row.table_name);
      console.log('Existing tables:', existingTables);
      
      // Find missing tables
      const missingTables = EXPECTED_TABLES.filter(
        table => !existingTables.includes(table)
      );
      
      if (missingTables.length === 0) {
        console.log('✅ All expected tables are present in the database.');
        console.log('Database is in sync with setup.sql');
      } else {
        console.log('❌ Missing tables:', missingTables);
        console.log('\nTo create missing tables, run:');
        console.log('  node seed-database.js');
        console.log('  # Or manually execute src/setup.sql in your database');
      }
      
      // Check for extra tables
      const extraTables = existingTables.filter(
        table => !EXPECTED_TABLES.includes(table)
      );
      
      if (extraTables.length > 0) {
        console.log('\n⚠️  Extra tables found (not in setup.sql):', extraTables);
      }
      
      // Check table structures for key tables
      console.log('\nVerifying table structures...');
      await verifyTableStructure(client, 'volunteers');
      await verifyTableStructure(client, 'users');
      await verifyTableStructure(client, 'projects');
      
    } catch (error) {
      console.error('❌ Error checking database:', error.message);
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('❌ Database connection error:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

async function verifyTableStructure(client, tableName) {
  try {
    const result = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = $1
      ORDER BY ordinal_position;
    `, [tableName]);
    
    console.log(`\n${tableName} columns:`);
    result.rows.forEach(row => {
      console.log(`  - ${row.column_name}: ${row.data_type} ${row.is_nullable === 'YES' ? '(nullable)' : '(NOT NULL)'}`);
    });
  } catch (error) {
    console.error(`❌ Error verifying ${tableName} structure:`, error.message);
  }
}

checkDatabaseSync()
  .then(() => {
    console.log('\nDatabase sync check completed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\nDatabase sync check failed:', error);
    process.exit(1);
  });
