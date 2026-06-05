const express = require('express');
const router = express.Router();
const catCon = require('../controllers/categoryController');
const validate = require('../utilities/category-validation');
const { requireRole } = require("../controllers/usersController.js");

router.get('/categories', catCon.buildCategoryPage);
router.get('/category/:id', catCon.buildCategoryDetails);

router.get('/new-category', requireRole('admin'), catCon.buildNewCategory);
router.post(
  '/new-category',
  requireRole('admin'),
  validate.categoryRules(),
  validate.checkCategoryData,
  catCon.createCategory
);

router.get('/edit-category/:id', requireRole('admin'), catCon.buildEditCategory);
router.post(
  '/edit-category/:id',
  requireRole('admin'),
  validate.categoryRules(),
  validate.checkUpdateCategoryData,
  catCon.updateCategory
);

module.exports = router;
