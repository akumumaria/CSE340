require('dotenv').config();
const orgModel = require('./models/organizationModel');

(async () => {
  try {
    const orgs = await orgModel.getAllOrganizations();
    console.log('Organizations count:', orgs.length);
    console.log(orgs.slice(0,5));
    process.exit(0);
  } catch (err) {
    console.error('Error fetching organizations:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
})();