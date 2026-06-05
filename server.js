const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
require("dotenv").config();

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

// Session middleware (required by connect-flash)
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Flash message middleware
app.use(flash());

// Make flash messages available to all views
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success');
  res.locals.error_messages = req.flash('error');
  next();
});

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

app.use("/", mainRoutes);
app.use("/", categoryRoutes);
app.use("/", organizationRoutes);
app.use("/", projectRoutes);

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