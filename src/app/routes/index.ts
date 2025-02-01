import express from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { ProductRoutes } from '../modules/Product/product.route';
import { OrderRoutes } from '../modules/Order/order.route';
import { ShippingAddressRoutes } from '../modules/ShippingAddress/shippingAddress.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { PaymentRoutes } from '../modules/Payment/payment.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/payments',
    route: PaymentRoutes,
  },
  {
    path: '/shipping-address',
    route: ShippingAddressRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
