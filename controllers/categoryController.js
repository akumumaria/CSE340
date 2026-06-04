const categories = require('../models/categoryModel');

async function buildCategoryPage(req, res) {
  try {
    const categoriesList = await categories.getAllCategories();
    res.render('categories', { title: 'Categories', categories: categoriesList });
  } catch (error) {
    console.error(error);
    res.status(500).render('500');
  }
}

async function buildCategoryDetails(req, res) {
  try {
    const categoryId = req.params.id;
    const category = await categories.getCategoryById(categoryId);
    const projects = await categories.getProjectsByCategoryId(categoryId);
    if (!category) return res.status(404).render('404');
    res.render('category-details', { title: category.name, category, projects });
  } catch (error) {
    console.error(error);
    res.status(500).render('500');
  }
}

async function buildNewCategory(req, res) {
  res.render('new-category', { title: 'New Category', errors: null, category_name: '' });
}

async function createCategory(req, res) {
  try {
    const { category_name } = req.body;
    await categories.insertCategory(category_name.trim());
    res.redirect('/categories');
  } catch (error) {
    console.error(error);
    res.status(500).render('500');
  }
}

async function buildEditCategory(req, res) {
  try {
    const categoryId = req.params.id;
    const category = await categories.getCategoryById(categoryId);
    if (!category) return res.status(404).render('404');
    res.render('edit-category', { title: 'Edit Category', category, errors: null });
  } catch (error) {
    console.error(error);
    res.status(500).render('500');
  }
}

async function updateCategory(req, res) {
  try {
    const categoryId = req.params.id;
    const { category_name } = req.body;
    await categories.updateCategory(categoryId, category_name.trim());
    res.redirect('/categories');
  } catch (error) {
    console.error(error);
    res.status(500).render('500');
  }
}

module.exports = {
  buildCategoryPage,
  buildCategoryDetails,
  buildNewCategory,
  createCategory,
  buildEditCategory,
  updateCategory,
};