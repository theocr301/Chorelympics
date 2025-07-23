const express = require('express');
const router = express.Router();
const { getAllChores, generateChore, markChoreComplete, markChoreNotComplete, assignChore, unassignChore } = require('../Controllers/choreControllers.js')

router.get('/chores', getAllChores);
router.post('/chores', generateChore);
router.put('/chores/markcomplete/:name', markChoreComplete);
router.put('/chores/marknotcomplete/:name', markChoreNotComplete);
router.put('/chores/assign/:name', assignChore);
router.put('/chores/unassign/:name', unassignChore);

module.exports = router;