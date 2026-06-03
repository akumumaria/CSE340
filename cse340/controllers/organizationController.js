const orgModel = require('../models/organizationModel');
const { validationResult } = require('express-validator');

async function organizationsPage(req, res) {
  try {
    console.log('[organizationsPage] Fetching organizations...');
    const organizations = await orgModel.getAllOrganizations();
    console.log('[organizationsPage] Rendering organizations view');
    res.render('organizations', { title: 'Organizations', organizations });
  } catch (error) {
    console.error('[ERROR organizationsPage]', error.message, error.stack);
    res.status(500).render('500');
  }
}

async function organizationDetailsPage(req, res) {
  try {
    const id = req.params.id;
    console.log('[organizationDetailsPage] Fetching org', id);
    const organization = await orgModel.getOrganizationById(id);
    const projects = await orgModel.getProjectsByOrganization(id);
    if (!organization) return res.status(404).render('404');
    console.log('[organizationDetailsPage] Rendering details');
    res.render('organization-details', {
      title: organization.name,
      organization,
      projects,
    });
  } catch (error) {
    console.error('[ERROR organizationDetailsPage]', error.message, error.stack);
    res.status(500).render('500');
  }
}

async function buildNewOrganization(req, res) {
  res.render('new-organization', {
    title: 'New Organization',
    errors: null,
    name: '',
    description: '',
    website: '',
  });
}

async function createOrganization(req, res) {
  const errors = validationResult(req);
  const { name, description, website } = req.body;
  if (!errors.isEmpty()) {
    return res.render('new-organization', {
      title: 'New Organization',
      errors,
      name,
      description,
      website,
    });
  }

  try {
    await orgModel.addOrganization(name.trim(), description.trim(), website.trim());
    res.redirect('/organizations');
  } catch (error) {
    console.error(error);
    res.status(500).render('500');
  }
}

async function buildEditOrganization(req, res) {
  try {
    const id = req.params.id;
    const org = await orgModel.getOrganizationById(id);
    if (!org) return res.status(404).render('404');
    res.render('edit-organization', {
      title: 'Edit Organization',
      errors: null,
      organization_id: org.organization_id,
      name: org.name,
      description: org.description,
      website: org.website,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('500');
  }
}

async function updateOrganization(req, res) {
  const errors = validationResult(req);
  const { organization_id, name, description, website } = req.body;
  if (!errors.isEmpty()) {
    return res.render('edit-organization', {
      title: 'Edit Organization',
      errors,
      organization_id,
      name,
      description,
      website,
    });
  }

  try {
    await orgModel.updateOrganization(organization_id, name.trim(), description.trim(), website.trim());
    res.redirect('/organization/' + organization_id);
  } catch (error) {
    console.error(error);
    res.status(500).render('500');
  }
}

module.exports = {
  organizationsPage,
  organizationDetailsPage,
  buildNewOrganization,
  createOrganization,
  buildEditOrganization,
  updateOrganization,
};
