// Category routes

const express = require('express');
const router = express.Router();
const catCon = require('../controllers/categoryController');
const validate = require('../utilities/category-validation');
const { requireRole } = require("../controllers/usersController.js");

// View all categories
router.get('/categories', catCon.buildCategoryPage);

// View single category details
router.get('/category/:id', catCon.buildCategoryDetails);

// Show form to create new category
router.get('/new-category', requireRole('admin'), catCon.buildNewCategory);
router.post(
  '/new-category',
  requireRole('admin'),
  validate.categoryRules(),
  catCon.createCategory
);

// Show form to edit category
router.get('/edit-category/:id', requireRole('admin'), catCon.buildEditCategory);
router.post(
  '/edit-category/:id',
  requireRole('admin'),
  validate.categoryRules(),
  catCon.updateCategory
);

module.exports = router;
