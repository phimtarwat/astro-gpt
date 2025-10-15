// lib/cache.ts
const cache = new Map<string, { value: any; time: number }>();

export function setCache(key: string, value: any, ttl = 600000) {
  cache.set(key, { value, time: Date.now() + ttl });
}

export function getCache(key: string) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.time) {
    cache.delete(key);
    return null;
  }
  return entry.value;
}
