const pool = require('../src/database');

// Get all organizations
async function getAllOrganizations() {
  const result = await pool.query(
    "SELECT * FROM organizations ORDER BY name"
  );
  return result.rows;
}

// Get organization by ID
async function getOrganizationById(id) {
  const result = await pool.query(
    "SELECT * FROM organizations WHERE organization_id = $1",
    [id]
  );
  return result.rows[0];
}

// Get projects for organization
async function getProjectsByOrganization(id) {
  const result = await pool.query(`
    SELECT *
    FROM projects
    WHERE organization_id = $1
    ORDER BY project_date
  `, [id]);

  return result.rows;
}

module.exports = {
  getAllOrganizations,
  getOrganizationById,
  getProjectsByOrganization
};