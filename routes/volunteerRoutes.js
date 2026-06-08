// Volunteer routes

const express = require("express");
const router = express.Router();
const volunteerController = require("../controllers/volunteerController");
const { requireLogin } = require("../controllers/usersController");

// Add user as volunteer for a project (protected)
router.post("/project/:id/volunteer", requireLogin, volunteerController.addVolunteerToProject);

// Remove user as volunteer from a project (protected)
router.post("/project/:id/volunteer/remove", requireLogin, volunteerController.removeVolunteerFromProject);

// Remove user as volunteer from a project (from dashboard) (protected)
router.post("/dashboard/volunteer/:id/remove", requireLogin, volunteerController.removeVolunteerFromDashboard);

module.exports = router;
