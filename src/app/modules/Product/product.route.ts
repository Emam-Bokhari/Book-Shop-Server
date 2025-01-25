import express from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

router.post("/", ProductControllers.createProductController);

router.get("/", ProductControllers.getAllProductsController);

router.get("/:id", ProductControllers.getProductController);

router.patch("/:id", ProductControllers.updateProductController);

router.delete("/:id", ProductControllers.deleteProductController)

export const ProductRoutes = router;