// lib/astroHelper.ts
export function normalizeThaiDate(date: string): string {
  const parts = date.split("/");
  let year = parseInt(parts[2], 10);
  if (year > 2400) year -= 543;
  return `${parts[0]}/${parts[1]}/${year}`;
}

export function timeFromPhrase(phrase: string): string {
  const map: Record<string, string> = {
    "เช้า": "07:00",
    "สาย": "10:00",
    "บ่าย": "13:00",
    "เย็น": "18:00",
    "กลางคืน": "21:00",
  };
  return map[phrase] || "12:00";
}

