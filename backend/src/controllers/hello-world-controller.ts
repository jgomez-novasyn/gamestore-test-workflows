import { Router, Response, NextFunction } from 'express';

const router = Router();

router.get('/hello-world', async (req, res: Response, next: NextFunction) => {
  try {
    res.json({ success: true, data: 'Hello World!' });
  } catch (error: any) {
    next(error);
  }
});

export default router;