const pool = require("../database");

async function getAllOrganizations() {
    const result = await pool.query(
        "SELECT * FROM organizations ORDER BY organization_id ASC"
    );
    return result.rows;
}

module.exports = { getAllOrganizations };