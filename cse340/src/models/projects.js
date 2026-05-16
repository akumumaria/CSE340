app.get("/projects", async (req, res) => {
    try {
        const projects = await projectsModel.getAllProjects();
        res.render("projects", {
            projects,
            title: "Projects"
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving projects");
    }
});