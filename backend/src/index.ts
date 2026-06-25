import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { AppError } from './utils/errors';
import router from './router';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;