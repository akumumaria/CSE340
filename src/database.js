const { Pool } = require('pg');
require('dotenv').config();

// Determine environment
const isProduction = process.env.NODE_ENV === 'production';

// Local development configuration
/*
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});
*/

// ===========================================
// RENDER PRODUCTION CONFIGURATION (Active)
// Use this block when deploying to Render
// ===========================================
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,  // Required for Render
  },
});

// Test connection (only in development)
if (!isProduction) {
  pool.connect((err, client, release) => {
    if (err) {
      console.error('❌ Local database connection error:', err.message);
    } else {
      console.log('✅ Connected to local database:', client.database);
      release();
    }
  });
}

module.exports = pool;