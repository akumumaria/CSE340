const orgModel = require('../src/models/organizations');
const { validationResult } = require('express-validator');

async function organizationsPage(req, res) {
  try {
    const organizations = await orgModel.getAllOrganizations();
    res.render('organizations', { title: 'Organizations', organizations });
  } catch (error) {
    console.error('[ERROR organizationsPage]', error.message, error.stack);
    res.status(500).render('500');
  }
}

async function organizationDetailsPage(req, res) {
  try {
    const id = req.params.id;
    const organization = await orgModel.getOrganizationById(id);
    const projects = await orgModel.getProjectsByOrganization(id);
    if (!organization) return res.status(404).render('404');
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
    contact_email: '',
    description: '',
    website: '',
  });
}

async function createOrganization(req, res) {
  const errors = validationResult(req);
  const { name, contact_email, description, website } = req.body;
  if (!errors.isEmpty()) {
    return res.render('new-organization', {
      title: 'New Organization',
      errors,
      name,
      contact_email,
      description,
      website,
    });
  }

  try {
    await orgModel.addOrganization(name.trim(), contact_email.trim(), description.trim(), website.trim());
    req.flash('success', 'Organization created successfully!');
    res.redirect('/organizations');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Failed to create organization.');
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
      contact_email: org.contact_email,
      description: org.description,
      website: org.website
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('500');
  }
}
async function updateOrganization(req, res) {
  const errors = validationResult(req);

  const {
    organization_id,
    name,
    contact_email,
    description,
    website
  } = req.body;

  if (!errors.isEmpty()) {
    return res.render('edit-organization', {
      title: 'Edit Organization',
      errors,
      organization_id,
      name,
      contact_email,
      description,
      website
    });
  }

  try {
    await orgModel.updateOrganization(
      organization_id,
      name.trim(),
      contact_email.trim(),
      description.trim(),
      website.trim()
    );

    req.flash('success', 'Organization updated successfully!');
    res.redirect('/organization/' + organization_id);

  } catch (error) {
    console.error(error);
    req.flash('error', 'Failed to update organization.');
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