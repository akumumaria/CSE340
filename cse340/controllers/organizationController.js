const organizationsModel = require("../models/organizations-model");
const { validationResult } = require("express-validator");

async function buildNewOrganization(req, res) {
  res.render("organizations/new-organization", {
    title: "Add Organization",
    errors: null,
    name: "", description: "", website: "",
  });
}

async function createOrganization(req, res) {
  const { name, description, website } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("organizations/new-organization", {
      title: "Add Organization",
      errors, name, description, website,
    });
  }
  await organizationsModel.addOrganization(name, description, website);
  req.flash("notice", "Organization added successfully.");
  res.redirect("/organizations");
}

async function buildEditOrganization(req, res) {
  const id = req.params.id;
  const org = await organizationsModel.getOrganizationById(id);
  res.render("organizations/edit-organization", {
    title: "Edit Organization",
    errors: null,
    organization_id: org.organization_id,
    name: org.name,
    description: org.description,
    website: org.website,
  });
}

async function updateOrganization(req, res) {
  const { organization_id, name, description, website } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("organizations/edit-organization", {
      title: "Edit Organization",
      errors, organization_id, name, description, website,
    });
  }
  await organizationsModel.updateOrganization(organization_id, name, description, website);
  req.flash("notice", "Organization updated successfully.");
  res.redirect("/organizations/" + organization_id);
}

module.exports = {
  // ...your existing exports,
  buildNewOrganization,
  createOrganization,
  buildEditOrganization,
  updateOrganization,
};
