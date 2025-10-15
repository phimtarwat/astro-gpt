import { NextApiRequest, NextApiResponse } from "next";
import { verifyUser, logUsage } from "@/lib/membership";
import { getAstroMatch } from "@/lib/astroApi";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      user_id,
      token,
      date1,
      time1,
      lat1,
      lon1,
      date2,
      time2,
      lat2,
      lon2,
      question
    } = req.query;

    // ✅ Public Mode: ตรวจสิทธิ์เฉพาะเมื่อมี token
    if (user_id && token) {
      await verifyUser(user_id as string, token as string);
    } else {
      console.log("⚠️ Public access (no token) — temporary mode");
    }

    // 🔮 เรียก backend ดวงคู่โดยตรง
    const result = await getAstroMatch({
      date1,
      time1,
      lat1,
      lon1,
      date2,
      time2,
      lat2,
      lon2,
      timezone: "Asia/Bangkok"
    });

    // ✅ Log การใช้งานเฉพาะสมาชิก
    if (user_id && token) {
      await logUsage(user_id as string, token as string, (question as string) || "match");
    }

    res.status(200).json({
      success: true,
      data: result,
      message: "เปรียบเทียบดวงคู่สำเร็จ (Public mode)"
    });
  } catch (error: any) {
    console.error("❌ Error in match:", error);
    res.status(400).json({ success: false, error: error.message });
  }
}
