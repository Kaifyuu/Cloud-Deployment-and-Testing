import { Router } from 'express';
import { creteUser, getUsers, getUserById, updateUser, deleteUser } from './UserController';

const router = Router();

router.post('/users', creteUser);
router.get("/users", getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;