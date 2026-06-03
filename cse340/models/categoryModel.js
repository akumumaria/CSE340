// Add these functions
async function insertCategory(name) {
  const result = await pool.query(`
    INSERT INTO categories (name)
    VALUES ($1)
    RETURNING *
  `, [name]);
  
  return result.rows[0];
}

async function updateCategory(categoryId, name) {
  const result = await pool.query(`
    UPDATE categories
    SET name = $1
    WHERE category_id = $2
    RETURNING *
  `, [name, categoryId]);
  
  return result.rows[0];
}

module.exports = {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId,
  insertCategory,      // ← NEW
  updateCategory       // ← NEW
};