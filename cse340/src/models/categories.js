app.get("/categories", async (req, res) => {
    try {
        const categories = await categoriesModel.getAllCategories();
        res.render("categories", {
            categories,
            title: "Categories"
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving categories");
    }
});