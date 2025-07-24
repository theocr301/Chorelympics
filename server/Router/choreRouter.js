const express = require('express');
const router = express.Router();
const { getAllChores, generateChore, markChoreComplete, markChoreNotComplete, assignChore, unassignChore } = require('../Controllers/choreControllers.js');

router.get('/:user/chores', getAllChores);
router.post('/:user/chores', generateChore);
router.put('/:user/chores/markcomplete/:name', markChoreComplete);
router.put('/:user/chores/marknotcomplete/:name', markChoreNotComplete);
router.put('/:user/chores/assign/:name', assignChore);
router.put('/:user/chores/unassign/:name', unassignChore);

module.exports = router;