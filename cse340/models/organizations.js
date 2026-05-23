const pool = require('../src/database');

// Get all organizations
async function getAllOrganizations() {
    const result = await pool.query(
        'SELECT * FROM organizations ORDER BY name'
    );
    return result.rows;
}

// Get single organization by ID
async function getOrganizationById(organizationId) {
    const result = await pool.query(
        'SELECT * FROM organizations WHERE organization_id = $1',
        [organizationId]
    );
    return result.rows[0];
}

// Get all projects belonging to an organization
async function getProjectsByOrganization(organizationId) {
    const result = await pool.query(
        `SELECT * 
         FROM projects 
         WHERE organization_id = $1
         ORDER BY project_date`,
        [organizationId]
    );
    return result.rows;
}

module.exports = {
    getAllOrganizations,
    getOrganizationById,
    getProjectsByOrganization
};