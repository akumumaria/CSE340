const projectModel = require('../models/projectModel');
const orgModel = require('../models/organizationModel');
const { validationResult } = require('express-validator');

async function projectsList(req, res) {
  try {
    console.log('[projectsList] Fetching projects...');
    const projects = await projectModel.getUpcomingProjects();
    console.log('[projectsList] Rendering projects view');
    res.render('projects', {
      title: 'Projects',
      projects,
    });
  } catch (error) {
    console.error('[ERROR projectsList]', error.message, error.stack);
    res.status(500).render('500');
  }
}

async function projectDetailsPage(req, res) {
  try {
    const id = req.params.id;
    const project = await projectModel.getProjectById(id);
    if (!project) return res.status(404).render('404');

    const organization = await projectModel.getOrganizationByProjectId(id);
    const categories = await projectModel.getCategoriesByProjectId(id);

    res.render('projects-details', {
      title: project.project_title || 'Project Details',
      project,
      organization,
      categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('500');
  }
}

function formatDateForInput(dateValue) {
  if (!dateValue) return '';
  const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().split('T')[0];
}

async function buildNewProject(req, res) {
  try {
    const organizations = await orgModel.getAllOrganizations();
    res.render('new-project', {
      title: 'New Project',
      errors: null,
      organizations,
      organization_id: '',
      project_title: '',
      description: '',
      location: '',
      project_date: '',
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('500');
  }
}

async function createProject(req, res) {
  const errors = validationResult(req);
  const { organization_id, project_title, description, location, project_date } = req.body;
  const organizations = await orgModel.getAllOrganizations();
  if (!errors.isEmpty()) {
    return res.render('new-project', {
      title: 'New Project',
      errors,
      organizations,
      organization_id,
      project_title,
      description,
      location,
      project_date,
    });
  }

  try {
    await projectModel.addProject(
      organization_id,
      project_title.trim(),
      description.trim(),
      location.trim(),
      project_date
    );
    res.redirect('/projects');
  } catch (error) {
    console.error(error);
    res.status(500).render('500');
  }
}

async function buildEditProject(req, res) {
  try {
    const id = req.params.id;
    const project = await projectModel.getProjectById(id);
    if (!project) return res.status(404).render('404');
    const organizations = await orgModel.getAllOrganizations();

    res.render('edit-project', {
      title: 'Edit Project',
      errors: null,
      organizations,
      project_id: project.project_id,
      organization_id: project.organization_id,
      project_title: project.project_title,
      description: project.description,
      location: project.location,
      project_date: formatDateForInput(project.project_date),
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('500');
  }
}

async function updateProject(req, res) {
  const errors = validationResult(req);
  const { project_id, organization_id, project_title, description, location, project_date } = req.body;
  const organizations = await orgModel.getAllOrganizations();
  if (!errors.isEmpty()) {
    return res.render('edit-project', {
      title: 'Edit Project',
      errors,
      organizations,
      project_id,
      organization_id,
      project_title,
      description,
      location,
      project_date,
    });
  }

  try {
    await projectModel.updateProject(
      project_id,
      organization_id,
      project_title.trim(),
      description.trim(),
      location.trim(),
      project_date
    );
    res.redirect('/project/' + project_id);
  } catch (error) {
    console.error(error);
    res.status(500).render('500');
  }
}

module.exports = {
  projectsList,
  projectDetailsPage,
  buildNewProject,
  createProject,
  buildEditProject,
  updateProject,
};
