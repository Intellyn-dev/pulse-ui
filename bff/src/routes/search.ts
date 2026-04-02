import { Router, Request, Response, NextFunction } from 'express';
import { aiSearch } from '../services/agentService';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.query.q as string;
    if (!query) {
      res.status(400).json({ error: 'Query parameter q is required' });
      return;
    }
    const results = await aiSearch(query);
    res.json(results);
  } catch (err) {
    next(err);
  }
});

export default router;
