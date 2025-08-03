import { Router } from 'express';
import {
  getAllChores,
  generateChore,
  markChoreComplete,
  markChoreNotComplete,
  assignChore, 
  unassignChore,
} from '../Controllers/choreControllers';
const router = Router();

router.get('/:user/chores', getAllChores);
router.post('/:user/chores', generateChore);
router.put('/:user/chores/markcomplete/:name', markChoreComplete);
router.put('/:user/chores/marknotcomplete/:name', markChoreNotComplete);
router.put('/:user/chores/assign/:name', assignChore);
router.put('/:user/chores/unassign/:name', unassignChore);

export default router;