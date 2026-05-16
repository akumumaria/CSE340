const pool = require("../database");

async function getAllCategories() {
    const SQL = `
        SELECT *
        FROM categories
        ORDER BY name;
    `;

    const result = await pool.query(SQL);
    return result.rows;
}

module.exports = { getAllCategories };