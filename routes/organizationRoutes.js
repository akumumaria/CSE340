// Organization routes

const express = require("express");
const router = express.Router();
const { body } = require('express-validator');

const orgController = require("../controllers/organizationController");
const { requireRole } = require("../controllers/usersController.js");

// View all organizations
router.get("/organizations", orgController.organizationsPage);

// View single organization details
router.get("/organization/:id", orgController.organizationDetailsPage);

// Show form to create new organization
router.get("/organizations/new-organization", requireRole('admin'), orgController.buildNewOrganization);
router.post(
  "/organizations/new-organization",
  requireRole('admin'),
  [
    body('name').trim().notEmpty().withMessage('Name is required.').isLength({ min: 3, max: 100 }).withMessage('Name must be 3-100 characters.'),
    body('contact_email').trim().notEmpty().withMessage('Contact email is required.').isEmail().withMessage('Contact email must be a valid email.').isLength({ max: 255 }).withMessage('Contact email must be 255 characters or fewer.'),
    body('description').trim().isLength({ max: 1000 }).withMessage('Description must be 1000 characters or fewer.'),
    body('website').trim().isLength({ max: 255 }).withMessage('Website url must be 255 characters or fewer.'),
  ],
  orgController.createOrganization
);

// Show form to edit organization
router.get("/organizations/edit-organization/:id", requireRole('admin'), orgController.buildEditOrganization);
router.post(
  "/organizations/edit-organization/:id",
  requireRole('admin'),
  [
    body('name').trim().notEmpty().withMessage('Name is required.').isLength({ min: 3, max: 100 }).withMessage('Name must be 3-100 characters.'),
    body('contact_email').trim().notEmpty().withMessage('Contact email is required.').isEmail().withMessage('Contact email must be a valid email.').isLength({ max: 255 }).withMessage('Contact email must be 255 characters or fewer.'),
    body('description').trim().isLength({ max: 1000 }).withMessage('Description must be 1000 characters or fewer.'),
    body('website').trim().isLength({ max: 255 }).withMessage('Website url must be 255 characters or fewer.'),
  ],
  orgController.updateOrganization
);

module.exports = router;