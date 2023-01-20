import { Router } from "express";
const router = Router();

import authController from "../controllers/authController.js";

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot", authController.forgotPassword);
router.post("/reset/:id/:token", authController.reset);

export default router;
