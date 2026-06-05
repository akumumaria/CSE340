const flash = require('connect-flash');

/**
 * Flash message middleware
 * Makes flash messages available in all views via res.locals
 */
const flashMiddleware = (req, res, next) => {
  res.locals.success_messages = req.flash('success');
  res.locals.error_messages = req.flash('error');
  next();
};

module.exports = flashMiddleware;
