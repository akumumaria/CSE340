const express = require('express');
const router = express.Router();
const {
  showUserRegistrationForm,
  processUserRegistrationForm,
  showLoginForm,
  processLoginForm,
  processLogout,
  showDashboard,
  showUsersPage,
  requireLogin,
  requireRole
} = require('../controllers/usersController.js');

router.get('/', (req, res) => {
  res.render('home', {
    title: 'Home'
  });
});

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);

// User logout route
router.get('/logout', processLogout);

// Protected dashboard route
router.get('/dashboard', requireLogin, showDashboard);

// Protected users page (admin only)
router.get('/users', requireRole('admin'), showUsersPage);

module.exports = router;