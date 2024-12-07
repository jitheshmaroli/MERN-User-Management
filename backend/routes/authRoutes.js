import express from "express";
import { signUp, singIn, signOut } from "../controllers/authController.js";

const router = express.Router();

router.post('/sign-up', signUp);
router.post('/sign-in',singIn);
router.get('/signout', signOut);

export default router;
