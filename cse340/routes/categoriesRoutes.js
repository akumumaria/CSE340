const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");

router.get("/categories", categoryController.categoriesPage);
router.get("/category/:id", categoryController.categoryDetailsPage);

module.exports = router;