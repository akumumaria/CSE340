app.get("/organizations", async (req, res) => {
    try {
        const organizations = await organizationsModel.getAllOrganizations();
        res.render("organizations", {
            organizations,
            title: "Organizations"
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving organizations");
    }
});