require('dotenv').config();
const ejs = require('ejs');
const path = require('path');
const orgModel = require('./models/organizationModel');

(async () => {
  try {
    const organizations = await orgModel.getAllOrganizations();
    const file = path.join(__dirname, 'views', 'organizations.ejs');
    ejs.renderFile(file, { title: 'Organizations', organizations }, { root: path.join(__dirname, 'views') }, (err, str) => {
      if (err) {
        console.error('Render error:', err.message);
        console.error(err.stack);
        process.exit(1);
      }
      console.log('Rendered length:', str.length);
      process.exit(0);
    });
  } catch (err) {
    console.error('Error fetching organizations:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
})();