// server.js

const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// =========================
// VIEW ENGINE
// =========================
app.set("view engine", "ejs");


// =========================
// MIDDLEWARE
// =========================

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Parse form data
app.use(express.urlencoded({ extended: true }));


// =========================
// ROUTES
// =========================

const categoryRoutes =
  require("./routes/categoryRoutes");

const organizationRoutes =
  require("./routes/organizationRoutes");

const projectRoutes =
  require("./routes/projectRoutes");


// =========================
// USE ROUTES
// =========================

app.use("/", categoryRoutes);
app.use("/", organizationRoutes);
app.use("/", projectRoutes);


// =========================
// HOME ROUTE
// =========================

app.get("/", (req, res) => {
  res.render("home", {
    title: "Home",
  });
});


// =========================
// 404 ERROR PAGE
// =========================

app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 - Page Not Found",
  });
});


// =========================
// 500 ERROR PAGE
// =========================

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).render("500", {
    title: "500 - Server Error",
  });
});


// =========================
// START SERVER
// =========================

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});