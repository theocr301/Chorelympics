const express = require('express');
const router = express.Router();
const { getAllChores, generateChore } = require('../Controllers/choreControllers.js')

router.get('/chores', getAllChores);
router.post('/chores', generateChore);

module.exports = router;