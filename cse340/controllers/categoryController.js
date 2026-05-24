// controllers/categoryController.js

const categoryModel = require("../models/categoryModel");

async function buildCategoryPage(req, res) {
  try {
    const categories = await categoryModel.getAllCategories();

    res.render("categories", {
      title: "Categories",
      categories,
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
      await categoryModel.getCategoryById(categoryId);

    const projects =
      await categoryModel.getProjectsByCategoryId(categoryId);

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