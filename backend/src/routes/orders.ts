import { Router, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, AuthRequest } from '../middleware/auth';
import { NotFoundError, ValidationError } from '../utils/errors';

const router = Router();
const prisma = new PrismaClient();

router.post('/checkout', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;
    const userId = req.userId;

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true }
        }
      }
    });

    if (!cart || cart.items.length === 0) {
      throw new ValidationError('Cart is empty');
    }

    // BUG: No validation that stock is sufficient
    // TODO: Validate stock before creating order

    let total = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const price = parseFloat(item.product.price);
      total += price * item.quantity;
      
      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price
      });
    }

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        status: 'pending',
        items: {
          create: orderItems
        }
      },
      include: {
        items: {
          include: { product: true }
        }
      }
    });

    // BUG: Cart not cleared after checkout
    // TODO: Clear cart after successful order

    // BUG: No confirmation step - order created immediately
    // TODO: Add confirmation step

    res.status(201).json(order);
  } catch (error: any) {
    next(error);
  }
});

router.get('/', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // BUG: No order history for user
    // TODO: Return user order history
    const orders = await prisma.order.findMany({
      where: { userId: req.userId },
      include: {
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

router.get('/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    const order = await prisma.order.findFirst({
      where: { id: parseInt(id), userId: req.userId },
      include: {
        items: {
          include: { product: true }
        }
      }
    });

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    res.json(order);
  } catch (error: any) {
    next(error);
  }
});

export default router;