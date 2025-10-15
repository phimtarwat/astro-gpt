// lib/astroApi.ts
const BASE = process.env.ASTRO_API_BASE!;

export async function getAstroChart(date: string, time: string, lat = 13.75, lon = 100.5) {
  const res = await fetch(`${BASE}/astro-chart?date=${date}&time=${time}&lat=${lat}&lon=${lon}`);
  return res.json();
}

export async function getAstroTransit(base_date: string, base_time: string, target_date: string) {
  const res = await fetch(`${BASE}/astro-transit?base_date=${base_date}&base_time=${base_time}&target_date=${target_date}`);
  return res.json();
}

export async function getAstroMatch(params: Record<string, any>) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}/astro-match?${query}`);
  return res.json();
}

