const { body, validationResult } = require('express-validator');

const categoryRules = () => [
  body('category_name')
    .trim()
    .notEmpty().withMessage('Category name is required.')
    .isLength({ min: 3, max: 100 }).withMessage('Category name must be 3-100 characters.'),
];

const checkCategoryData = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('categories/new-category', {
      title: 'New Category',
      errors,
      category_name: req.body.category_name,
    });
  }
  next();
};

const checkUpdateCategoryData = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('categories/edit-category', {
      title: 'Edit Category',
      errors,
      category_id: req.params.id,
      category_name: req.body.category_name,
    });
  }
  next();
};

module.exports = { categoryRules, checkCategoryData, checkUpdateCategoryData };
