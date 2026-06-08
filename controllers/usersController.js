const bcrypt = require('bcrypt');
const { createUser, authenticateUser, getAllUsers } = require('../src/models/users.js');
const volunteerModel = require('../src/models/volunteers');

/**
 * Show the user registration form
 */
const showUserRegistrationForm = (req, res) => {
    res.render('register', { title: 'Register' });
};

/**
 * Process the user registration form
 */
const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hash the password before storing it
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create the user in the database
        const userId = await createUser(name, email, passwordHash);

        // Redirect to the home page after successful registration
        req.flash('success', 'Registration successful! Please log in.');
        res.redirect('/login');
    } catch (error) {
        console.error('Error registering user:', error);
        
        // Handle duplicate email error specifically
        if (error.code === '23505' && error.constraint === 'users_email_key') {
            req.flash('error', 'Email already exists. Please use a different email or log in.');
        } else {
            req.flash('error', 'An error occurred during registration. Please try again.');
        }
        
        res.redirect('/register');
    }
};

/**
 * Show the login form
 */
const showLoginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};

/**
 * Process the login form
 */
const processLoginForm = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log(`[LOGIN ATTEMPT] Email: ${email}, Environment: ${process.env.NODE_ENV}`);
        
        const user = await authenticateUser(email, password);
        
        if (user) {
            console.log(`[LOGIN SUCCESS] User: ${user.name}, Role: ${user.role_name}`);
            
            // Store user info in session
            req.session.user = user;
            
            // Save session explicitly to ensure it's persisted
            req.session.save((err) => {
                if (err) {
                    console.error('[SESSION SAVE ERROR]', err);
                    req.flash('error', 'Session error occurred. Please try again.');
                    return res.redirect('/login');
                }
                
                console.log('[SESSION SAVED] Session ID:', req.sessionID);
                req.flash('success', 'Login successful!');
                res.redirect('/dashboard');
            });
        } else {
            console.log('[LOGIN FAILED] Invalid credentials for:', email);
            req.flash('error', 'Invalid email or password.');
            res.redirect('/login');
        }
    } catch (error) {
        console.error('[LOGIN ERROR]', error);
        req.flash('error', 'An error occurred during login. Please try again.');
        res.redirect('/login');
    }
};

/**
 * Process logout
 */
const processLogout = async (req, res) => {
    if (req.session.user) {
        delete req.session.user;
    }

    req.flash('success', 'Logout successful!');
    res.redirect('/login');
};

/**
 * Show the user dashboard
 */
const showDashboard = async (req, res) => {
    const user = req.session.user;
    try {
        const volunteeredProjects = await volunteerModel.getVolunteeredProjectsByUserId(user.user_id);
        res.render('dashboard', {
            title: 'Dashboard',
            name: user.name,
            email: user.email,
            volunteeredProjects
        });
    } catch (error) {
        console.error('[ERROR showDashboard]', error.message, error.stack);
        res.render('dashboard', {
            title: 'Dashboard',
            name: user.name,
            email: user.email,
            volunteeredProjects: []
        });
    }
};

/**
 * Show the users page (admin only)
 */
const showUsersPage = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.render('users', {
            title: 'Users',
            users: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        req.flash('error', 'An error occurred while fetching users.');
        res.redirect('/dashboard');
    }
};

/**
 * Middleware to require login for route access
 */
const requireLogin = (req, res, next) => {
    if (!req.session || !req.session.user) {
        req.flash('error', 'You must be logged in to access this page.');
        return res.redirect('/login');
    }
    next();
};

/**
 * Middleware factory to require specific role for route access
 * Returns middleware that checks if user has the required role
 * 
 * @param {string} role - The role name required (e.g., 'admin', 'user')
 * @returns {Function} Express middleware function
 */
const requireRole = (role) => {
    return (req, res, next) => {
        // Check if user is logged in first
        if (!req.session || !req.session.user) {
            req.flash('error', 'You must be logged in to access this page.');
            return res.redirect('/login');
        }

        // Check if user's role matches the required role
        if (req.session.user.role_name !== role) {
            req.flash('error', 'You do not have permission to access this page.');
            return res.redirect('/');
        }

        // User has required role, continue
        next();
    };
};

module.exports = {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    showDashboard,
    showUsersPage,
    requireLogin,
    requireRole
};
