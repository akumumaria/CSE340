const orgModel = require("../models/organizationModel");

async function organizationsPage(req, res) {
  const organizations = await orgModel.getAllOrganizations();
  res.render("organizations", { organizations });
}

async function organizationDetailsPage(req, res) {
  const organizationId = req.params.id;

  const organization = await orgModel.getOrganizationById(organizationId);
  const projects = await orgModel.getProjectsByOrganization(organizationId);

  if (!organization) return res.status(404).render("404");

  res.render("organization-details", {
    organization,
    projects,
  });
}

module.exports = {
  organizationsPage,
  organizationDetailsPage,
};