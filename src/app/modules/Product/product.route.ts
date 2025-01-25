import express from "express";
import { ProductControllers } from "./product.controller";
import { validateRequestSchema } from "../../middlewares/validateRequestSchema";
import { ProductValidationSchema } from "./product.validation";

const router = express.Router();

router.post("/", validateRequestSchema(ProductValidationSchema.createProductValidationSchema), ProductControllers.createProductController);

router.get("/", ProductControllers.getAllProductsController);

router.get("/:id", ProductControllers.getProductController);

router.patch("/:id", validateRequestSchema(ProductValidationSchema.updateProductValidationSchema), ProductControllers.updateProductController);

router.delete("/:id", ProductControllers.deleteProductController)

export const ProductRoutes = router;