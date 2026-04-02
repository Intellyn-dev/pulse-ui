import { Router, Request, Response } from 'express';

const router = Router();

router.post('/verify', (req: Request, res: Response) => {
  const { token } = req.body;
  const valid = token === process.env.API_TOKEN;
  res.json({ valid });
});

export default router;
