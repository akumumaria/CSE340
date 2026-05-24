const pool = require('../database/');

async function getAllCategories() {
  const result = await pool.query(
    'SELECT * FROM categories ORDER BY name'
  );
  return result.rows;
}

async function getCategoryById(categoryId) {
  const result = await pool.query(
    'SELECT * FROM categories WHERE id = $1',
    [categoryId]
  );
  return result.rows[0];
}

async function getProjectsByCategoryId(categoryId) {
  const result = await pool.query(
    `SELECT projects.*
     FROM projects
     JOIN project_categories
     ON projects.id = project_categories.project_id
     WHERE project_categories.category_id = $1`,
    [categoryId]
  );

  return result.rows;
}

async function getCategoriesByProjectId(projectId) {
  const result = await pool.query(
    `SELECT categories.*
     FROM categories
     JOIN project_categories
     ON categories.id = project_categories.category_id
     WHERE project_categories.project_id = $1`,
    [projectId]
  );

  return result.rows;
}

module.exports = {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId,
  getCategoriesByProjectId
};