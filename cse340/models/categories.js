const db = require('../src/database');

// Get all categories
async function getAllCategories() {
  const result = await db.query(
    "SELECT * FROM categories ORDER BY name"
  );
  return result.rows;
}

// Get category by ID
async function getCategoryById(categoryId) {
  const result = await db.query(
    "SELECT * FROM categories WHERE category_id = $1",
    [categoryId]
  );
  return result.rows[0];
}

// Get projects in a category
async function getProjectsByCategory(categoryId) {
  const result = await db.query(`
    SELECT p.*
    FROM projects p
    JOIN project_categories pc ON p.project_id = pc.project_id
    WHERE pc.category_id = $1
    ORDER BY p.project_date
  `, [categoryId]);

  return result.rows;
}

module.exports = {
  getAllCategories,
  getCategoryById,
  getProjectsByCategory,
};