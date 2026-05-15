const express = require('express');
const router = express.Router();

// Example static route
router.get('/static-example', (req, res) => {
	res.send('This is a static route example!');
});

module.exports = router;
