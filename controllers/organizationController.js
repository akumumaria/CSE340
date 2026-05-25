// controllers/organizationController.js

const orgModel = require("../models/organizationModel");

async function organizationsPage(req, res) {
  try {
    const organizations =
      await orgModel.getAllOrganizations();

    res.render("organizations", {
      title: "Organizations",
      organizations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("500");
  }
}

async function organizationDetailsPage(req, res) {
  try {
    const organizationId = req.params.id;

    const organization =
      await orgModel.getOrganizationById(organizationId);

    const projects =
      await orgModel.getProjectsByOrganization(organizationId);

    if (!organization) {
      return res.status(404).render("404");
    }

    res.render("organization-details", {
      title: organization.name,
      organization,
      projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("500");
  }
}

module.exports = {
  organizationsPage,
  organizationDetailsPage,
};