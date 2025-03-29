import express from 'express';
import { ProductControllers } from './product.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { ProductValidationSchema } from './product.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequestSchema(ProductValidationSchema.createProductValidationSchema),
  ProductControllers.createProductController,
);

router.get('/', ProductControllers.getAllProductsController);

router.get(
  '/category/:category',
  ProductControllers.getProductsByCategoryController,
);

router.get('/all', ProductControllers.getProductsNoDefaultPaginationController);

router.get('/:id', ProductControllers.getProductController);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequestSchema(ProductValidationSchema.updateProductValidationSchema),
  ProductControllers.updateProductController,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  ProductControllers.deleteProductController,
);

export const ProductRoutes = router;
