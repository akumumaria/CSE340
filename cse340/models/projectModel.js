const db = require("../database");

async function getUpcomingProjects() {
  const result = await db.query(`
    SELECT p.*, o.name AS organization_name
    FROM projects p
    JOIN organizations o
      ON p.organization_id = o.organization_id
    ORDER BY p.project_date
    LIMIT 5
  `);

  return result.rows;
}

async function getProjectById(id) {
  const result = await db.query(`
    SELECT *
    FROM projects
    WHERE project_id = $1
  `, [id]);

  return result.rows[0];
}

async function getOrganizationByProjectId(projectId) {
  const result = await db.query(`
    SELECT o.*
    FROM organizations o
    JOIN projects p
      ON o.organization_id = p.organization_id
    WHERE p.project_id = $1
  `, [projectId]);

  return result.rows[0];
}

async function getCategoriesByProjectId(projectId) {
  const result = await db.query(`
    SELECT c.*
    FROM categories c
    JOIN project_categories pc
      ON c.category_id = pc.category_id
    WHERE pc.project_id = $1
  `, [projectId]);

  return result.rows;
}

module.exports = {
  getUpcomingProjects,
  getProjectById,
  getOrganizationByProjectId,
  getCategoriesByProjectId,
};