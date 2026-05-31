// controllers/categoryController.js

const categories = require("../src/models/categories");

async function buildCategoryPage(req, res) {
  try {
    const categoriesList = await categories.getAllCategories();

    res.render("categories", {
      title: "Categories",
      categories: categoriesList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("500");
  }
}

async function buildCategoryDetails(req, res) {
  try {
    const categoryId = req.params.id;

    const category =
      await categories.getCategoryById(categoryId);

    const projects =
      await categories.getProjectsByCategoryId(categoryId);

    if (!category) {
      return res.status(404).render("404");
    }

    res.render("category-details", {
      title: category.name,
      category,
      projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("500");
  }
}

module.exports = {
  buildCategoryPage,
  buildCategoryDetails,
};