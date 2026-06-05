// Project routes

const express = require("express");
const router = express.Router();
const { body } = require('express-validator');

const projectController = require("../controllers/projectController");

// View all projects
router.get("/projects", projectController.projectsList);

// Show page to assign categories to a project
router.get('/projects/:id/categories', projectController.assignCategoriesPage);

// Handle category assignment for a project
router.post('/projects/:id/categories', projectController.updateProjectCategories);

// View single project details
router.get("/project/:id", projectController.projectDetailsPage);

// Show form to create new project
router.get("/projects/new-project", projectController.buildNewProject);

// Handle new project form submission with validation
router.post(
  "/projects/new-project",
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
router.get("/projects/edit-project/:id", projectController.buildEditProject);

// Handle project edit form submission with validation
router.post(
  "/projects/edit-project/:id",
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