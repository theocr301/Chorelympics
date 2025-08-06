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
router.put('/chores/toggleIsDone', toggleIsDone);
router.put('/chores/change-assignment', changeAssignment);

export default router;