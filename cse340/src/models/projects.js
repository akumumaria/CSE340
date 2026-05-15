const pool = require("../database");

async function getAllProjects() {
    const sql = `
        SELECT 
            projects.project_id,
            projects.title,
            projects.description,
            projects.location,
            projects.project_date,
            organizations.name AS organization_name
        FROM projects
        JOIN organizations 
            ON projects.organization_id = organizations.organization_id
        ORDER BY projects.project_date;
    `;

    const result = await pool.query(sql);
    return result.rows;
}

module.exports = { getAllProjects };
