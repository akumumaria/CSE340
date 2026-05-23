async function categoryDetailsPage(req, res) {
  const categoryId = req.params.id;

  const category = await categoryModel.getCategoryById(categoryId);
  const projects = await categoryModel.getProjectsByCategory(categoryId);

  if (!category) return res.status(404).render("404");

  res.render("category-details", {
    category,
    projects,
  });
}