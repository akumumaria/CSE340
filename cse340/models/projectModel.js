const db = require("../database");

async function getUpcomingProjects() {
  const result = await db.query(`
    SELECT p.project_id,
           p.organization_id,
           p.title AS project_title,
           p.description,
           p.location,
           p.project_date,
           o.name AS organization_name
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
    SELECT project_id,
           organization_id,
           title AS project_title,
           description,
           location,
           project_date
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

async function addProject(organization_id, project_title, description, location, project_date) {
  const result = await db.query(`
    INSERT INTO projects (organization_id, title, description, location, project_date)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING project_id
  `, [organization_id, project_title, description, location, project_date]);

  return result.rows[0];
}

async function updateProject(project_id, organization_id, project_title, description, location, project_date) {
  const result = await db.query(`
    UPDATE projects
    SET organization_id = $1,
        title = $2,
        description = $3,
        location = $4,
        project_date = $5
    WHERE project_id = $6
    RETURNING project_id
  `, [organization_id, project_title, description, location, project_date, project_id]);

  return result.rows[0];
}

module.exports = {
  getUpcomingProjects,
  getProjectById,
  getOrganizationByProjectId,
  getCategoriesByProjectId,
  addProject,
  updateProject,
};