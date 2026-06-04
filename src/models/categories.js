const pool = require("../database");

async function getAllCategories() {
  const result = await pool.query(`
    SELECT *
    FROM categories
    ORDER BY name
  `);
  return result.rows;
}

async function getCategoryById(id) {
  const result = await pool.query(`
    SELECT *
    FROM categories
    WHERE category_id = $1
  `, [id]);
  return result.rows[0];
}

async function getProjectsByCategoryId(categoryId) {
  const result = await pool.query(`
    SELECT p.*
    FROM projects p
    JOIN project_categories pc ON p.project_id = pc.project_id
    WHERE pc.category_id = $1
    ORDER BY p.project_date
  `, [categoryId]);
  return result.rows;
}

async function insertCategory(name) {
  const result = await pool.query(`
    INSERT INTO categories (name)
    VALUES ($1)
    RETURNING *
  `, [name]);
  return result.rows[0];
}

async function updateCategory(id, name) {
  const result = await pool.query(`
    UPDATE categories
    SET name = $1
    WHERE category_id = $2
    RETURNING *
  `, [name, id]);
  return result.rows[0];
}

module.exports = {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId,
  insertCategory,
  updateCategory,
};
