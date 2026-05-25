const pool = require("../database");

async function getAllCategories() {
  const result = await pool.query(`
    SELECT *
    FROM categories
    ORDER BY name
  `);

  return result.rows;
}

async function getCategoryById(categoryId) {
  const result = await pool.query(`
    SELECT *
    FROM categories
    WHERE category_id = $1
  `, [categoryId]);

  return result.rows[0];
}

async function getProjectsByCategoryId(categoryId) {
  const result = await pool.query(`
    SELECT p.*
    FROM projects p
    JOIN project_categories pc
      ON p.project_id = pc.project_id
    WHERE pc.category_id = $1
    ORDER BY p.project_date
  `, [categoryId]);

  return result.rows;
}

module.exports = {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId,
};
