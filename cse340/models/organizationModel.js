const pool = require("../database");

async function getAllOrganizations() {
  const result = await pool.query(`
    SELECT *
    FROM organizations
    ORDER BY name
  `);

  return result.rows;
}

async function getOrganizationById(id) {
  const result = await pool.query(`
    SELECT *
    FROM organizations
    WHERE organization_id = $1
  `, [id]);

  return result.rows[0];
}

async function getProjectsByOrganization(id) {
  const result = await pool.query(`
    SELECT *
    FROM projects
    WHERE organization_id = $1
    ORDER BY project_date
  `, [id]);

  return result.rows;
}
async function addOrganization(name, description, website) {
  const result = await pool.query(`
    INSERT INTO organizations (name, description, website)
    VALUES ($1, $2, $3)
    RETURNING *
  `, [name, description, website]);
  return result.rows[0];
}

async function updateOrganization(id, name, description, website) {
  const result = await pool.query(`
    UPDATE organizations
    SET name = $1, description = $2, website = $3
    WHERE organization_id = $4
    RETURNING *
  `, [name, description, website, id]);
  return result.rows[0];
}

module.exports = {
  getAllOrganizations,
  getOrganizationById,
  getProjectsByOrganization,
  addOrganization,
  updateOrganization,
};
