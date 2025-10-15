// lib/astroService.ts
import { getAstroTransit } from "./astroApi";
import { getCache, setCache } from "./cache";
import { normalizeThaiDate } from "./astroHelper";

export async function analyzeTransit(base_date: string, base_time: string, target_date: string) {
  const key = `transit_${base_date}_${target_date}`;
  const cached = getCache(key);
  if (cached) return cached;

  const bd = normalizeThaiDate(base_date);
  const td = normalizeThaiDate(target_date);
  const result = await getAstroTransit(bd, base_time, td);
  setCache(key, result);
  return result;
}

