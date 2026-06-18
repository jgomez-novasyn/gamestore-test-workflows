import { Router, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(authenticate);

// BUG: No admin role check - any authenticated user can access
// FIXME: Should check if user.role === 'admin'
router.get('/users', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, createdAt: true }
    });

    res.json(users);
  } catch (error: any) {
    next(error);
  }
});

router.get('/orders', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: { select: { email: true, name: true } },
        items: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(orders);
  } catch (error: any) {
    next(error);
  }
});

router.put('/orders/:id/status', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status }
    });

    res.json(order);
  } catch (error: any) {
    next(error);
  }
});

router.get('/stats', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalOrders = await prisma.order.count();
    const totalProducts = await prisma.product.count();
    
    const revenue = await prisma.order.aggregate({
      _sum: { total: true }
    });

    res.json({
      totalUsers,
      totalOrders,
      totalProducts,
      revenue: revenue._sum.total || 0
    });
  } catch (error: any) {
    next(error);
  }
});

export default router;