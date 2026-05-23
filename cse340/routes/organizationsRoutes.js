const express = require("express");
const router = express.Router();

const orgController = require("../controllers/organizationController");

router.get("/organizations", orgController.organizationsPage);
router.get("/organization/:id", orgController.organizationDetailsPage);

module.exports = router;