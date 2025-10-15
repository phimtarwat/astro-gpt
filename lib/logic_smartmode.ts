// ==========================================================
// 🧩 SMART MODE LOGIC (Keyword Routing for Horoscope GPT)
// ==========================================================
// จุดประสงค์: ตรวจจับประเภทคำถามของผู้ใช้ (ดวงเดี่ยว / ดวงคู่ความรัก / ดวงคู่การงาน / หลายเจ้าชะตา)
// แล้วให้ backend ตัดสินใจเรียก API ที่ถูกต้อง
// ==========================================================

export type AnalysisMode = "single" | "love" | "business" | "multi";

/**
 * ตรวจจับประเภทคำถามจากข้อความภาษาไทย แล้วกำหนดโหมดวิเคราะห์ที่เหมาะสม
 * @param userMessage ข้อความคำถามจากผู้ใช้
 * @param chartCount จำนวนเจ้าชะตาที่ระบุ (ค่า default = 1)
 * @returns "single" | "love" | "business" | "multi"
 */
export function detectAnalysisMode(
  userMessage: string,
  chartCount: number = 1
): AnalysisMode {
  const msg = userMessage.trim();

  // 🔹 ถ้ามีหลายเจ้าชะตา (>2)
  if (chartCount >
