'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const user_route_1 = require('../modules/User/user.route');
const product_route_1 = require('../modules/Product/product.route');
const order_route_1 = require('../modules/Order/order.route');
const shippingAddress_route_1 = require('../modules/ShippingAddress/shippingAddress.route');
const auth_route_1 = require('../modules/Auth/auth.route');
const router = express_1.default.Router();
const moduleRoutes = [
  {
    path: '/users',
    route: user_route_1.UserRoutes,
  },
  {
    path: '/auths',
    route: auth_route_1.AuthRoutes,
  },
  {
    path: '/products',
    route: product_route_1.ProductRoutes,
  },
  {
    path: '/orders',
    route: order_route_1.OrderRoutes,
  },
  {
    path: '/shipping-address',
    route: shippingAddress_route_1.ShippingAddressRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
