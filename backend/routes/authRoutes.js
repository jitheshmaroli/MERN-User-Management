import express from "express";
import { home, signUp, singIn } from "../controllers/authController.js";

const router = express.Router();

router.post('/sign-up', signUp);
router.post('/sign-in',singIn);

export default router;
