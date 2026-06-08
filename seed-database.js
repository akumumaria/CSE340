const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function seedDatabase() {
  try {
    console.log('Reading setup.sql file...');
    const setupSql = fs.readFileSync(path.join(__dirname, 'src/setup.sql'), 'utf8');
    
    console.log('Connecting to database...');
    await pool.connect();
    
    console.log('Executing setup.sql...');
    await pool.query(setupSql);
    
    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

seedDatabase()
  .then(() => {
    console.log('Database seeding completed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Database seeding failed:', error);
    process.exit(1);
  });
