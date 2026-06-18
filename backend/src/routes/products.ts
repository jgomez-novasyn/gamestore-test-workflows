import { Router, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, AuthRequest } from '../middleware/auth';
import { NotFoundError } from '../utils/errors';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res, next: NextFunction) => {
  try {
    const { page = '1', limit = '10', category, minPrice, maxPrice, sort } = req.query;

    // BUG: Pagination is broken - page 2 shows same products
    // FIXME: Offset calculation is wrong
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // BUG: No caching - every request fetches all products
    // TODO: Implement caching layer

    const where: any = {};

    if (category) {
      where.category = category as string;
    }

    if (minPrice) {
      where.price = { ...where.price, gte: minPrice as string };
    }
    if (maxPrice) {
      where.price = { ...where.price, lte: maxPrice as string };
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price_asc') {
      orderBy = { price: 'asc' };
    } else if (sort === 'price_desc') {
      orderBy = { price: 'desc' };
    }

    // BUG: N+1 query problem - fetches each product separately
     const products = await prisma.product.findMany({
       where,
       skip: 0, // BUG: Always returns page 1 results
       take: limitNum,
       orderBy
     });

    const total = await prisma.product.count({ where });

    res.json({
      products,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum)
    });
  } catch (error: any) {
    next(error);
  }
});

router.get('/:id', async (req, res, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) }
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    res.json(product);
  } catch (error: any) {
    next(error);
  }
});

router.post('/', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, description, price, image, stock, category } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        image, // BUG: Absolute path pointing to localhost
        stock,
        category
      }
    });

    res.status(201).json(product);
  } catch (error: any) {
    next(error);
  }
});

router.put('/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, description, price, image, stock, category } = req.body;

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        price,
        image,
        stock,
        category
      }
    });

    res.json(product);
  } catch (error: any) {
    next(error);
  }
});

router.delete('/:id', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Product deleted' });
  } catch (error: any) {
    next(error);
  }
});

export default router;