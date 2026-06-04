const express = require("express");
const path = require("path");
require("dotenv").config();

console.log("DATABASE_URL loaded:", process.env.DATABASE_URL ? "YES" : "NO");

const app = express();
const PORT = process.env.PORT || 3000;

/* =========================
   ERROR HANDLERS (top-level)
========================= */
process.on('unhandledRejection', (reason, promise) => {
  console.error('[UNHANDLED REJECTION]', reason);
});

process.on('uncaughtException', (error) => {
  console.error('[UNCAUGHT EXCEPTION]', error);
  process.exit(1);
});

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

app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.path}`);
  next();
});

/* =========================
   ROUTES
========================= */
const mainRoutes = require("./routes/route");
const categoryRoutes = require("./routes/categoryRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const projectRoutes = require("./routes/projectRoutes");

console.log('[SERVER] Routes loaded successfully');

app.use("/", mainRoutes);
console.log('[SERVER] Main routes mounted');

app.use("/", categoryRoutes);
console.log('[SERVER] Category routes mounted');

app.use("/", organizationRoutes);
console.log('[SERVER] Organization routes mounted');

app.use("/", projectRoutes);
console.log('[SERVER] Project routes mounted');

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