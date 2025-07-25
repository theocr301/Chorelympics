const express = require('express');
const router = express.Router();
const { getAllUsers, getCurrentUser, generateUser, logoutUser } = require('../Controllers/userControllers.js');

router.get('/users', getAllUsers);
router.get('/users/current', getCurrentUser);
router.post('/users', generateUser);
router.put('/users/logout/:user', logoutUser);

module.exports = router;