import { NextApiRequest, NextApiResponse } from "next";
import { detectAnalysisMode } from "@/lib/logic_smartmode";
import { verifyUser, logUsage } from "@/lib/membership";
import { analyzeTransit } from "@/lib/astroService";
import { getAstroMatch } from "@/lib/astroApi";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user_id, token, question, base_date, base_time, target_date } = req.query;

    // ✅ ตรวจสิทธิ์สมาชิกก่อน
    if (user_id && token) {
  await verifyUser(user_id as string, token as string);
} else {
  console.log("⚠️ Public access (no token) — temporary mode");
}


    // ✅ ตรวจจับโหมดอัตโนมัติ
    const mode = detectAnalysisMode((question as string) || "", 1);

    let result: any = null;

    if (mode === "love" || mode === "business") {
      // ดวงคู่ → เรียก /api/match backend ดวงดาว
      result = await getAstroMatch({
        date1: base_date,
        time1: base_time,
        lat1: 13.75,
        lon1: 100.5,
        date2: target_date, // ตัวอย่างให้ใช้ target_date เป็นดวงคู่
        time2: "12:00",
        lat2: 18.79,
        lon2: 98.98
      });
    } else {
      // ดวงเดี่ยว → วิเคราะห์ดาวจรปกติ
      result = await analyzeTransit(
        base_date as string,
        base_time as string,
        target_date as string
      );
    }

    // ✅ log การใช้งาน
    await logUsage(user_id as string, token as string, (question as string) || "analyze auto");

    res.status(200).json({ success: true, mode, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
}
