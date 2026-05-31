// routes/projectRoutes.js

const express = require("express");
const router = express.Router();

const projectController =
  require("../controllers/projectController");

router.get(
  "/projects",
  projectController.projectsList
);

router.get(
  "/project/:id",
  projectController.projectDetailsPage
);

module.exports = router;