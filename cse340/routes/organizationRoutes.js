// routes/organizationRoutes.js

const express = require("express");
const router = express.Router();
const { body } = require('express-validator');

const orgController = require("../controllers/organizationController");

router.get("/organizations", (req, res, next) => {
  console.log('[ROUTE] GET /organizations');
  next();
}, orgController.organizationsPage);
router.get("/organization/:id", orgController.organizationDetailsPage);

router.get("/organizations/new-organization", orgController.buildNewOrganization);
router.post(
  "/organizations/new-organization",
  [
    body('name').trim().notEmpty().withMessage('Name is required.').isLength({ max: 100 }).withMessage('Name must be 100 characters or fewer.'),
    body('description').trim().isLength({ max: 1000 }).withMessage('Description must be 1000 characters or fewer.'),
    body('website').trim().isLength({ max: 255 }).withMessage('Website url must be 255 characters or fewer.'),
  ],
  orgController.createOrganization
);

router.get("/organizations/edit-organization/:id", orgController.buildEditOrganization);
router.post(
  "/organizations/edit-organization/:id",
  [
    body('name').trim().notEmpty().withMessage('Name is required.').isLength({ max: 100 }).withMessage('Name must be 100 characters or fewer.'),
    body('description').trim().isLength({ max: 1000 }).withMessage('Description must be 1000 characters or fewer.'),
    body('website').trim().isLength({ max: 255 }).withMessage('Website url must be 255 characters or fewer.'),
  ],
  orgController.updateOrganization
);

module.exports = router;