const express = require('express');
const router = express.Router();
const catCon = require('../controllers/categories-controller');
const validate = require('../utilities/category-validation');

router.get('/new-category', catCon.buildNewCategory);
router.post(
  '/new-category',
  validate.categoryRules(),
  validate.checkCategoryData,
  catCon.createCategory
);

router.get('/edit-category/:id', catCon.buildEditCategory);
router.post(
  '/edit-category/:id',
  validate.categoryRules(),
  validate.checkUpdateCategoryData,
  catCon.updateCategory
);

module.exports = router;
