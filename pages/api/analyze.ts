import { NextApiRequest, NextApiResponse } from "next";
import { verifyUser, logUsage } from "@/lib/membership";
import { analyzeTransit } from "@/lib/astroService";
import { getAstroMatch } from "@/lib/astroApi";
import { detectAnalysisMode } from "@/lib/logic_smartmode";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user_id, token, base_date, base_time, target_date, question } = req.query;

    // ✅ Public Mode: ตรวจสิทธิ์เฉพาะเมื่อมี token
    if (user_id && token) {
      await verifyUser(user_id as string, token as string);
    } else {
      console.log("⚠️ Public access (no token) — temporary mode");
    }

    // ตรวจจับโหมดอัตโนมัติ (single/love/business)
    const mode = detectAnalysisMode((question as string) || "", 1);

    let result: any = null;

    if (mode === "love" || mode === "business") {
      // 🔮 ถ้าเป็นดวงคู่ → เรียก match API backend
      result = await getAstroMatch({
        date1: base_date,
        time1: base_time,
        lat1: 13.75,
        lon1: 100.5,
        date2: target_date, // ใช้ target_date เป็นดวงเทียบตัวอย่าง
        time2: "12:00",
        lat2: 18.79,
        lon2: 98.98
      });
    } else {
      // 🔭 ดวงเดี่ยว → วิเคราะห์ดาวจรปกติ
      result = await analyzeTransit(
        base_date as string,
        base_time as string,
        target_date as string
      );
    }

    // ✅ Log การใช้งานเฉพาะสมาชิก
    if (user_id && token) {
      await logUsage(user_id as string, token as string, (question as string) || "analyze");
    }

    res.status(200).json({
      success: true,
      mode,
      data: result,
      message: "วิเคราะห์สำเร็จ (Public mode)"
    });
  } catch (error: any) {
    console.error("❌ Error in analyze:", error);
    res.status(400).json({ success: false, error: error.message });
  }
}
