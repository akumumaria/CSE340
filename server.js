const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const flashMiddleware = require("./middlewares/flash");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('[UNHANDLED REJECTION]', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('[UNCAUGHT EXCEPTION]', error);
  process.exit(1);
});

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware setup
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session configuration for user sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,  // Set to false for local development, true for production with HTTPS
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Flash messages for success/error notifications
app.use(flash());

// Make flash messages available in all views
app.use(flashMiddleware);

// Middleware to set res.locals variables for all templates
app.use((req, res, next) => {
  res.locals.isLoggedIn = false;
  if (req.session && req.session.user) {
    res.locals.isLoggedIn = true;
  }

  res.locals.user = req.session.user || null;

  res.locals.NODE_ENV = process.env.NODE_ENV;
  next();
});
app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.path}`);
  next();
});

// Import route files
const mainRoutes = require("./routes/route");
const categoryRoutes = require("./routes/categoryRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const projectRoutes = require("./routes/projectRoutes");

// Use the routes
app.use("/", mainRoutes);
app.use("/", categoryRoutes);
app.use("/", organizationRoutes);
app.use("/", projectRoutes);

// 404 error handler
app.use((req, res) => {
  res.status(404).render("404", {
    title: "Page Not Found"
  });
});

// 500 error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500", {
    title: "Server Error"
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});