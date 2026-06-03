// routes/projectRoutes.js

const express = require("express");
const router = express.Router();
const { body } = require('express-validator');

const projectController = require("../controllers/projectController");

router.get("/projects", projectController.projectsList);
router.get("/project/:id", projectController.projectDetailsPage);

router.get("/projects/new-project", projectController.buildNewProject);
router.post(
  "/projects/new-project",
  [
    body('organization_id').notEmpty().withMessage('Organization is required.'),
    body('project_title').trim().notEmpty().withMessage('Project title is required.').isLength({ max: 150 }).withMessage('Project title must be 150 characters or fewer.'),
    body('description').trim().isLength({ max: 1000 }).withMessage('Description must be 1000 characters or fewer.'),
    body('location').trim().isLength({ max: 255 }).withMessage('Location must be 255 characters or fewer.'),
    body('project_date').isDate().withMessage('Valid project date is required.'),
  ],
  projectController.createProject
);

router.get("/projects/edit-project/:id", projectController.buildEditProject);
router.post(
  "/projects/edit-project/:id",
  [
    body('organization_id').notEmpty().withMessage('Organization is required.'),
    body('project_title').trim().notEmpty().withMessage('Project title is required.').isLength({ max: 150 }).withMessage('Project title must be 150 characters or fewer.'),
    body('description').trim().isLength({ max: 1000 }).withMessage('Description must be 1000 characters or fewer.'),
    body('location').trim().isLength({ max: 255 }).withMessage('Location must be 255 characters or fewer.'),
    body('project_date').isDate().withMessage('Valid project date is required.'),
  ],
  projectController.updateProject
);

module.exports = router;