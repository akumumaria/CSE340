// controllers/categoryController.js
const categories = require("../src/models/categories");
const utilities = require("../utilities"); // assuming you have this for flash messages

// Existing functions (keep them)
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
    const category = await categories.getCategoryById(categoryId);
    const projects = await categories.getProjectsByCategoryId(categoryId);

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

// ==================== NEW FUNCTIONS ====================

// Build New Category Page
async function buildNewCategoryPage(req, res) {
  res.render("new-category", {
    title: "New Category",
    errors: null,
    category_name: req.flash ? req.flash('category_name') : ''
  });
}

// Create New Category
async function createCategory(req, res) {
  try {
    const { category_name } = req.body;

    // Server-side validation
    if (!category_name || category_name.trim().length < 3 || category_name.trim().length > 100) {
      req.flash('notice', 'Category name must be between 3 and 100 characters.');
      req.flash('category_name', category_name);
      return res.redirect('/new-category');
    }

    await categories.insertCategory(category_name.trim());

    req.flash('notice', 'Category created successfully!');
    res.redirect('/categories');
  } catch (error) {
    console.error(error);
    req.flash('notice', 'Error creating category.');
    res.redirect('/new-category');
  }
}

// Build Edit Category Page
async function buildEditCategoryPage(req, res) {
  try {
    const categoryId = req.params.id;
    const category = await categories.getCategoryById(categoryId);

    if (!category) {
      return res.status(404).render("404");
    }

    res.render("edit-category", {
      title: "Edit Category",
      category,
      errors: null
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("500");
  }
}

// Update Category
async function updateCategory(req, res) {
  try {
    const categoryId = req.params.id;
    const { category_name } = req.body;

    if (!category_name || category_name.trim().length < 3 || category_name.trim().length > 100) {
      req.flash('notice', 'Category name must be between 3 and 100 characters.');
      return res.redirect(`/edit-category/${categoryId}`);
    }

    const updatedCategory = await categories.updateCategory(categoryId, category_name.trim());

    if (!updatedCategory) {
      req.flash('notice', 'Category not found.');
      return res.redirect('/categories');
    }

    req.flash('notice', 'Category updated successfully!');
    res.redirect('/categories');
  } catch (error) {
    console.error(error);
    req.flash('notice', 'Error updating category.');
    res.redirect(`/edit-category/${req.params.id}`);
  }
}

module.exports = {
  buildCategoryPage,
  buildCategoryDetails,
  buildNewCategoryPage,
  createCategory,
  buildEditCategoryPage,
  updateCategory
};