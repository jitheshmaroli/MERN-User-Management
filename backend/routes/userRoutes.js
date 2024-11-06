import express from "express";
import { home, signUp, singIn } from "../controllers/userController.js";

const router = express.Router();

router.get('/', home);
router.post('/sign-up', signUp);
router.get('/sign-in',singIn);

export default router;
