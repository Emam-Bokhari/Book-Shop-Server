import express from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { ProductRoutes } from '../modules/Product/product.route';
import { OrderRoutes } from '../modules/Order/order.route';
import { ShippingAddressRoutes } from '../modules/ShippingAddress/shippingAddress.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { PaymentRoutes } from '../modules/Payment/payment.route';
import { SupportRoutes } from '../modules/Support/support.route';
import { ContactRoutes } from '../modules/Contact/contact.route';
import { BlogRoutes } from '../modules/Blog/blog.route';
import { NewsletterRoutes } from '../modules/Newsletter/newsletter.route';
import { AnalyticsRoutes } from '../modules/Analytics/analytics.route';

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
  {
    path: '/supports',
    route: SupportRoutes,
  },
  {
    path: '/contacts',
    route: ContactRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/newsletters',
    route: NewsletterRoutes,
  },
  {
    path: '/analytics',
    route: AnalyticsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
