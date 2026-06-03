const express = require('express');
const router = express.Router();
const orgModel = require('../models/organizationModel');

router.get('/', (req, res) => {
  res.render('home', {
    title: 'Home'
  });
});

router.get('/debug/orgs', async (req, res) => {
  try {
    const orgs = await orgModel.getAllOrganizations();
    res.json({ count: orgs.length, sample: orgs.slice(0, 5) });
  } catch (err) {
    console.error('[DEBUG /debug/orgs] Error', err.message, err.stack);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
