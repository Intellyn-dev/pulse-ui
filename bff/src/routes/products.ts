import { Router, Request, Response, NextFunction } from 'express';
import { fetchProducts, fetchProduct } from '../services/catalogClient';
import { getOrSet } from '../services/cacheService';

const router = Router();

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await getOrSet('products:all', () => fetchProducts(50));
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const product = await getOrSet(`products:${id}`, () => fetchProduct(id));
    res.json(product);
  } catch (err) {
    next(err);
  }
});

export default router;
