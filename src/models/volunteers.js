const db = require("../database");

/**
 * Add a user as a volunteer for a project
 * @param {number} userId - The user's ID
 * @param {number} projectId - The project's ID
 * @returns {object} The newly created volunteer relationship
 */
async function addVolunteer(userId, projectId) {
  const result = await db.query(`
    INSERT INTO volunteers (user_id, project_id)
    VALUES ($1, $2)
    RETURNING user_id, project_id
  `, [userId, projectId]);

  return result.rows[0];
}

/**
 * Remove a user as a volunteer from a project
 * @param {number} userId - The user's ID
 * @param {number} projectId - The project's ID
 * @returns {boolean} True if removal was successful
 */
async function removeVolunteer(userId, projectId) {
  const result = await db.query(`
    DELETE FROM volunteers
    WHERE user_id = $1 AND project_id = $2
    RETURNING user_id, project_id
  `, [userId, projectId]);

  return result.rows.length > 0;
}

/**
 * Get all projects a user has volunteered for
 * @param {number} userId - The user's ID
 * @returns {array} Array of project objects with volunteer information
 */
async function getVolunteeredProjectsByUserId(userId) {
  const result = await db.query(`
    SELECT p.project_id,
           p.organization_id,
           p.title,
           p.description,
           p.location,
           p.project_date,
           o.name AS organization_name
    FROM projects p
    JOIN organizations o ON p.organization_id = o.organization_id
    JOIN volunteers v ON p.project_id = v.project_id
    WHERE v.user_id = $1
    ORDER BY p.project_date
  `, [userId]);

  return result.rows;
}

/**
 * Check if a user is already volunteering for a project
 * @param {number} userId - The user's ID
 * @param {number} projectId - The project's ID
 * @returns {boolean} True if user is volunteering for the project
 */
async function isUserVolunteering(userId, projectId) {
  const result = await db.query(`
    SELECT 1
    FROM volunteers
    WHERE user_id = $1 AND project_id = $2
  `, [userId, projectId]);

  return result.rows.length > 0;
}

module.exports = {
  addVolunteer,
  removeVolunteer,
  getVolunteeredProjectsByUserId,
  isUserVolunteering
};
