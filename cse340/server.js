const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set("view engine", "ejs");

// Static files (public folder)
app.use(express.static(path.join(__dirname, "public")));

// Models
const categoriesModel = require("./src/models/categories");
const projectsModel = require("./src/models/projects");
const organizationsModel = require("./src/models/organizations");


// =========================
// HOME ROUTE (NO DATABASE)
// =========================
app.get("/", (req, res) => {
    res.render("home", {
        title: "Home"
    });
});


// =========================
// ORGANIZATIONS ROUTE
// =========================
app.get("/organizations", async (req, res) => {
    try {
        const organizations = await organizationsModel.getAllOrganizations();

        res.render("organizations", {
            title: "Organizations",
            organizations
        });

    } catch (error) {
        console.error("Error retrieving organizations:", error);
        res.status(500).send("Error retrieving organizations");
    }
});


// =========================
// PROJECTS ROUTE
// =========================
app.get("/projects", async (req, res) => {
    try {
        const projects = await projectsModel.getAllProjects();

        res.render("projects", {
            title: "Projects",
            projects
        });

    } catch (error) {
        console.error("Error retrieving projects:", error);
        res.status(500).send("Error retrieving projects");
    }
});


// =========================
// CATEGORIES ROUTE
// =========================
app.get("/categories", async (req, res) => {
    try {
        const categories = await categoriesModel.getAllCategories();

        res.render("categories", {
            title: "Categories",
            categories
        });

    } catch (error) {
        console.error("Error retrieving categories:", error);
        res.status(500).send("Error retrieving categories");
    }
});


// =========================
// START SERVER
// =========================
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});