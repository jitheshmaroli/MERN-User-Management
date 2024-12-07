import express from 'express';
import { addUser, allUsers, blockUser, deleteUser, updateUser } from '../controllers/adminController.js';
import { verifyToken } from '../utills/verifyUser.js';
import { verifyAdmin } from '../utills/verifyAdmin.js';

const router = express.Router();

// router.get('/', adminHome);
router.get('/users',verifyToken, verifyAdmin, allUsers);
router.delete('/users/:id',verifyToken, verifyAdmin, deleteUser);
router.put('/users/:id',verifyToken, verifyAdmin, updateUser );
router.post('/users/add',verifyToken, verifyAdmin, addUser);
router.put('/users/:id/block', blockUser);

export default router;