const express = require('express');
const router = express.Router();
const { getAllChores, generateChore, markChoreComplete, markChoreNotComplete, assignChore } = require('../Controllers/choreControllers.js')

router.get('/chores', getAllChores);
router.post('/chores', generateChore);
router.put('/chores/markComplete/:name', markChoreComplete);
router.put('/chores/markNotComplete/:name', markChoreNotComplete);
router.put('/chores/assign/:name', assignChore);

module.exports = router;