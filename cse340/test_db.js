require('dotenv').config();
const db = require('./src/database');

(async () => {
  try {
    const res = await db.query('SELECT NOW() AS now');
    console.log('DB connected, now =', res.rows[0].now);
    process.exit(0);
  } catch (err) {
    console.error('DB connection error:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
})();