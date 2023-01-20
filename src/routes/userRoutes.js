import { Router } from "express";
import requireAuth from "../middleware/authMiddleware.js";
import userController from "../controllers/userController.js";
const router = Router();

router.use(requireAuth);

router.get("/", userController.getUser);
router.get("/:id", userController.getSingleUser);
router.patch("/", userController.updateUser);
router.delete("/", userController.deleteUser);

export default router;
