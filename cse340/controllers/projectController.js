const projectModel =
  require("../src/models/projects");

async function projectsList(req, res) {
  try {
    const projects = await projectModel.getUpcomingProjects();

    res.render("projects", {
      title: "Projects",
      projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("500");
  }
}

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
      title: project.title,
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
  projectsList,
  projectDetailsPage
};