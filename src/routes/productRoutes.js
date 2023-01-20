import { Router } from "express";
import requireAuth from "../middleware/authMiddleware.js";
const router = Router();

import productController from "../controllers/productController.js";

router.get("/:id", productController.getSingleProduct);
router.get("/", productController.getProduct);

router.use(requireAuth);
router.post("/", productController.createProduct);
router.patch("/", productController.updateProduct);
router.delete("/", productController.deleteProduct);

export default router;
