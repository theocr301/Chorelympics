import express, { Request, Response, Router } from 'express';
import {
  getAllUsers,
  getCurrentUser,
  generateUser,
  logoutUser,
} from '../Controllers/userControllers';

const router: Router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/current', getCurrentUser);
router.post('/users', generateUser);
router.put('/users/logout/:user', logoutUser);

export default router;