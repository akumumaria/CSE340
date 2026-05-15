const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const categoriesModel = require("./src/models/categories");
const projectsModel = require("./src/models/projects");

app.get("/", (req, res) => {
    res.render("home", { title: "Home" });
});

const organizationsModel = require("./src/models/organizations");

app.get("/organizations", async (req, res) => {
    try {
        const organizations = await organizationsModel.getAllOrganizations();
        res.render("organizations", { organizations });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving organizations");
    }
});

app.get("/projects", async (req, res) => {
    try {
        const projects = await projectsModel.getAllProjects();
        res.render("projects", { projects });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving projects");
    }
});

app.get("/categories", async (req, res) => {
    try {
        const categories = await categoriesModel.getAllCategories();
        res.render("categories", { categories });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving categories");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
