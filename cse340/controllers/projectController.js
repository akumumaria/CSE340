const projectModel =
  require("../models/projectModel");

async function projectDetailsPage(req, res) {
  try {
    const projectId = req.params.id;

    const project =
      await projectModel.getProjectById(projectId);

    const organization =
      await projectModel.getOrganizationByProjectId(projectId);

    const categories =
      await projectModel.getCategoriesByProjectId(projectId);

    if (!project) {
      return res.status(404).render("404");
    }

    res.render("project-details", {
      title: project.name,
      project,
      organization,
      categories
    });

  } catch (error) {
    console.error(error);
    res.status(500).render("500");
  }
}

module.exports = {
  projectDetailsPage
};