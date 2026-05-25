const express = require("express");
const path = require("path");
require("dotenv").config();

console.log("DATABASE_URL loaded:", process.env.DATABASE_URL ? "YES" : "NO");

const app = express();
const PORT = process.env.PORT || 3000;

/* =========================
   VIEW ENGINE SETUP
========================= */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* =========================
   MIDDLEWARE
========================= */
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* =========================
   ROUTES
========================= */
const categoryRoutes = require("./routes/categoryRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const projectRoutes = require("./routes/projectRoutes");

app.use("/", categoryRoutes);
app.use("/", organizationRoutes);
app.use("/", projectRoutes);

/* =========================
   HOME ROUTE
========================= */
app.get("/", (req, res) => {
  res.render("home", {
    title: "Home"
  });
});

/* =========================
   404 ERROR HANDLER
========================= */
app.use((req, res) => {
  res.status(404).render("404", {
    title: "Page Not Found"
  });
});

/* =========================
   500 ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500", {
    title: "Server Error"
  });
});

/* =========================
   START SERVER
========================= */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});