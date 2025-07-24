const express = require('express');
const router = express.Router();
const { getAllUsers, getCurrentUser, generateUser } = require('../Controllers/userControllers.js');

router.get('/users', getAllUsers);
router.get('/users/current', getCurrentUser);
router.post('/users', generateUser);

module.exports = router;