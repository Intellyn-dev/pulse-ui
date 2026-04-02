import { LRUCache } from 'lru-cache';

const cache = new LRUCache<string, unknown>({
  max: 500,
  ttl: 1000 * 60 * 5,
});

export async function getOrSet<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs?: number
): Promise<T> {
  const cached = cache.get(key);
  if (cached !== undefined) {
    return cached as T;
  }

  const value = await fetcher();
  cache.set(key, value, { ttl: ttlMs });
  return value;
}

export function invalidate(key: string): void {
  cache.delete(key);
}

export function invalidatePrefix(prefix: string): void {
  for (const key of cache.keys()) {
    if (key.startsWith(prefix)) {
      cache.delete(key);
    }
  }
}
