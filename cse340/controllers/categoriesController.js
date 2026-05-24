const categoryModel = require('../models/category-model');

async function buildCategoryPage(req, res) {
  try {
    const categories = await categoryModel.getAllCategories();

    res.render('categories', {
      title: 'Categories',
      categories
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('errors/error500');
  }
}

async function buildCategoryDetails(req, res) {
  try {
    const categoryId = req.params.id;

    const category = await categoryModel.getCategoryById(categoryId);

    const projects =
      await categoryModel.getProjectsByCategoryId(categoryId);

    res.render('category-detail', {
      title: category.name,
      category,
      projects
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('errors/error500');
  }
}

module.exports = {
  buildCategoryPage,
  buildCategoryDetails
};