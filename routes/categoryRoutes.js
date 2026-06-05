// Category routes

const express = require('express');
const router = express.Router();
const catCon = require('../controllers/categoryController');
const validate = require('../utilities/category-validation');

// View all categories
router.get('/categories', catCon.buildCategoryPage);

// View single category details
router.get('/category/:id', catCon.buildCategoryDetails);

// Show form to create new category
router.get('/new-category', catCon.buildNewCategory);

// Handle new category form submission with validation
router.post(
  '/new-category',
  validate.categoryRules(),
  validate.checkCategoryData,
  catCon.createCategory
);

// Show form to edit category
router.get('/edit-category/:id', catCon.buildEditCategory);

// Handle category edit form submission with validation
router.post(
  '/edit-category/:id',
  validate.categoryRules(),
  validate.checkUpdateCategoryData,
  catCon.updateCategory
);

module.exports = router;
