const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS
app.set("view engine", "ejs");

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
    res.render("home", { title: "Home" });
});

app.get("/organizations", (req, res) => {
    res.render("organizations", { title: "Organizations" });
});

app.get("/projects", (req, res) => {
    res.render("projects", { title: "Projects" });
});

app.get("/categories", (req, res) => {
    res.render("categories", { title: "Categories" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});