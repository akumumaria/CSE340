const db = require('../database.js');
const bcrypt = require('bcrypt');

/**
 * Create a new user in the database
 * @param {string} name - User's display name
 * @param {string} email - User's email (username)
 * @param {string} passwordHash - Hashed password
 * @returns {number} The newly created user ID
 */
const createUser = async (name, email, passwordHash) => {
    const default_role = 'user';
    const query = `
        INSERT INTO users (name, email, password_hash, role_id) 
        VALUES ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = $4)) 
        RETURNING user_id
    `;
    const queryParams = [name, email, passwordHash, default_role];
    
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create user');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);
    }

    return result.rows[0].user_id;
};

/**
 * Find a user by their email address
 * @param {string} email - User's email address
 * @returns {object|null} User object or null if not found
 */
const findUserByEmail = async (email) => {
    const query = `
        SELECT u.user_id, u.name, u.email, u.password_hash, r.role_name 
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
        WHERE u.email = $1
    `;
    const queryParams = [email];
    
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        return null; // User not found
    }
    
    return result.rows[0];
};

/**
 * Verify if a plain text password matches a hashed password
 * @param {string} password - Plain text password
 * @param {string} passwordHash - Hashed password from database
 * @returns {boolean} True if passwords match, false otherwise
 */
const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

/**
 * Authenticate a user with email and password
 * @param {string} email - User's email address
 * @param {string} password - Plain text password
 * @returns {object|null} User object without password_hash if authenticated, null otherwise
 */
const authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);
    
    if (!user) {
        return null;
    }
    
    const isPasswordValid = await verifyPassword(password, user.password_hash);
    
    if (!isPasswordValid) {
        return null;
    }
    
    // Remove password_hash from user object before returning
    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

/**
 * Get all users with their roles
 * @returns {array} Array of user objects with role information
 */
const getAllUsers = async () => {
    const query = `
        SELECT u.user_id, u.name, u.email, u.created_at, r.role_name 
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
        ORDER BY u.created_at DESC
    `;
    
    const result = await db.query(query);
    return result.rows;
};

module.exports = {
    createUser,
    findUserByEmail,
    verifyPassword,
    authenticateUser,
    getAllUsers
};
