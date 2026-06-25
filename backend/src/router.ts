import { Router } from 'express';

export { default as authRoutes } from './routes/auth';
export { default as productRoutes } from './routes/products';
export { default as cartRoutes } from './routes/cart';
export { default as orderRoutes } from './routes/orders';
export { default as adminRoutes } from './routes/admin';
export { default as helloWorldRoutes } from './controllers/hello-world-controller';

export const allRoutes = [
  { path: '/api/auth', router: authRoutes },
  { path: '/api/products', router: productRoutes },
  { path: '/api/cart', router: cartRoutes },
  { path: '/api/orders', router: orderRoutes },
  { path: '/api/admin', router: adminRoutes },
  { path: '/api/hello-world', router: helloWorldRoutes }
];

const router = Router();

allRoutes.forEach(route => {
  router.use(route.path, route.router);
});

export default router;