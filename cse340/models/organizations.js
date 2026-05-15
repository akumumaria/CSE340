const pool = require('../src/database');

async function getAllOrganizations() {
    const result = await pool.query('SELECT * FROM organizations ORDER BY name');
    return result.rows;
}

module.exports = {
    getAllOrganizations
};
