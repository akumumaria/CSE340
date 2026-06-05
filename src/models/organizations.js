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
async function addOrganization(name, contact_email, description, website) {
  const result = await pool.query(`
    INSERT INTO organizations (name, contact_email, description, website)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `, [name, contact_email, description, website || null]);
  return result.rows[0];
}

async function updateOrganization(id, name, contact_email, description, website) {
  const result = await pool.query(`
    UPDATE organizations
    SET name = $1,
        contact_email = $2,
        description = $3,
        website = $4
    WHERE organization_id = $5
    RETURNING *
  `, [name, contact_email, description, website || null, id]);

  return result.rows[0];
}

module.exports = {
  getAllOrganizations,
  getOrganizationById,
  getProjectsByOrganization,
  addOrganization,
  updateOrganization,
};