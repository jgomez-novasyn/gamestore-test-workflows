import { Router, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { generateToken, generateRefreshToken, verifyRefreshToken, AuthRequest, authenticate } from '../middleware/auth';
import { AuthError, NotFoundError, ValidationError } from '../utils/errors';

const router = Router();
const prisma = new PrismaClient();

router.post('/register', async (req, res, next: NextFunction) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ValidationError('Email already exists');
    }

    // BUG: Password stored in plain text
    const user = await prisma.user.create({
      data: {
        email,
        password, // TODO: Store hashed password
        name,
        role: 'user'
      }
    });

    const token = generateToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken }
    });

    res.json({ token, refreshToken, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error: any) {
    next(error);
  }
});

router.post('/login', async (req, res, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // BUG: Comparing plain text passwords directly
    const user = await prisma.user.findFirst({
      where: { email, password } // FIXME: Should compare with hashed password
    });

    if (!user) {
      throw new AuthError('Invalid credentials');
    }

    const token = generateToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken }
    });

    res.json({ token, refreshToken, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error: any) {
    next(error);
  }
});

router.post('/refresh', async (req, res, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new ValidationError('Refresh token required');
    }

    const decoded = verifyRefreshToken(refreshToken);
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user || user.refreshToken !== refreshToken) {
      throw new AuthError('Invalid refresh token');
    }

    // BUG: Refresh token is not renewed, returning the same token
    const token = generateToken(user.id, user.role);
    // FIXME: Should generate new refresh token and store it
    
    res.json({ token, refreshToken }); // BUG: Returning same refresh token instead of new one
  } catch (error: any) {
    next(error);
  }
});

router.post('/logout', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.user.update({
      where: { id: req.userId },
      data: { refreshToken: null }
    });

    res.json({ message: 'Logged out successfully' });
  } catch (error: any) {
    next(error);
  }
});

router.get('/me', authenticate, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, email: true, name: true, role: true }
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    res.json(user);
  } catch (error: any) {
    next(error);
  }
});

export default router;