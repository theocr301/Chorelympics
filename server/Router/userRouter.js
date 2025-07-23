const express = require('express');
const router = express.Router();
const { getAllUsers, generateUser } = require('../Controllers/userControllers.js');

router.get('/users', getAllUsers);
router.post('/users', generateUser);

module.exports = router;