const pool = require("../database"); // or wherever your pg Pool is defined

async function getAllOrganizations() {
    try {
        const result = await pool.query("SELECT * FROM organizations ORDER BY id ASC");
        return result.rows;
    } catch (error) {
        console.error("Error fetching organizations:", error);
        return [];
    }
}

module.exports = {
    getAllOrganizations
};