// routes/categoryRoutes.js

const express = require("express");
const router = express.Router();

const categoryController =
  require("../controllers/categoryController");

router.get(
  "/categories",
  categoryController.buildCategoryPage
);

router.get(
  "/category/:id",
  categoryController.buildCategoryDetails
);

module.exports = router;