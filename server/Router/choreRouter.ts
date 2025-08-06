import { Router } from 'express';
import {
  getAllChores,
  generateChore,
  toggleIsDone,
  changeAssignment
} from '../Controllers/choreControllers';
const router = Router();

router.get('/chores', getAllChores);
router.post('/chores', generateChore);
// router.put('/chores/markcomplete', markChoreComplete);
// router.put('/chores/marknotcomplete', markChoreNotComplete);
router.put('/chores/toggleDone', toggleIsDone);
// router.put('/chores/assign', assignChore);
// router.put('/chores/unassign', unassignChore);
router.put('/chores/change-assignment', changeAssignment);

export default router;