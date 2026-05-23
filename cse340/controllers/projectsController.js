const projectModel = require("../models/projectModel");

async function projectDetailsPage(req, res) {
  const projectId = req.params.id;

  const project = await projectModel.getProjectById(projectId);
  const organization = await projectModel.getOrganizationByProjectId(projectId);
  const categories = await projectModel.getCategoriesByProject(projectId);

  if (!project) return res.status(404).render("404");

  res.render("project-details", {
    project,
    organization,
    categories,
  });
}

module.exports = {
  projectDetailsPage,
};