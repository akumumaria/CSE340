require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function addVolunteersTable() {
  try {
    console.log('Connecting to database...');
    const client = await pool.connect();
    
    try {
      console.log('Creating volunteers table...');
      await client.query(`
        CREATE TABLE IF NOT EXISTS volunteers (
          user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
          project_id INTEGER NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
          PRIMARY KEY (user_id, project_id)
        );
      `);
      console.log('✅ Volunteers table created successfully!');
    } catch (error) {
      console.error('❌ Error creating volunteers table:', error.message);
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

addVolunteersTable()
  .then(() => {
    console.log('Volunteers table setup completed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Volunteers table setup failed:', error);
    process.exit(1);
  });
