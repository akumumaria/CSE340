// Project routes

const express = require("express");
const router = express.Router();
const { body } = require('express-validator');

const projectController = require("../controllers/projectController");
const { requireRole } = require("../controllers/usersController.js");

// View all projects
router.get("/projects", projectController.projectsList);
// Show page to assign categories to a project
router.get('/projects/:id/categories', requireRole('admin'), projectController.assignCategoriesPage);

// Handle category assignment for a project
router.post('/projects/:id/categories', requireRole('admin'), projectController.updateProjectCategories);

// View single project details
router.get("/project/:id", projectController.projectDetailsPage);

// Show form to create new project
router.get("/projects/new-project", requireRole('admin'), projectController.buildNewProject);
router.post(
  "/projects/new-project",
  requireRole('admin'),
  [
    body('organization_id').notEmpty().withMessage('Organization is required.'),
    body('project_title').trim().notEmpty().withMessage('Project title is required.').isLength({ min: 3, max: 150 }).withMessage('Project title must be 3-150 characters.'),
    body('description').trim().isLength({ max: 1000 }).withMessage('Description must be 1000 characters or fewer.'),
    body('location').trim().isLength({ max: 255 }).withMessage('Location must be 255 characters or fewer.'),
    body('project_date').isDate().withMessage('Valid project date is required.'),
  ],
  projectController.createProject
);

// Show form to edit project
router.get("/projects/edit-project/:id", requireRole('admin'), projectController.buildEditProject);
router.post(
  "/projects/edit-project/:id",
  requireRole('admin'),
  [
    body('organization_id').notEmpty().withMessage('Organization is required.'),
    body('project_title').trim().notEmpty().withMessage('Project title is required.').isLength({ min: 3, max: 150 }).withMessage('Project title must be 3-150 characters.'),
    body('description').trim().isLength({ max: 1000 }).withMessage('Description must be 1000 characters or fewer.'),
    body('location').trim().isLength({ max: 255 }).withMessage('Location must be 255 characters or fewer.'),
    body('project_date').isDate().withMessage('Valid project date is required.'),
  ],
  projectController.updateProject
);

module.exports = router;