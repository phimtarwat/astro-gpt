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

    // ตรวจสิทธิ์ก่อน
    await verifyUser(user_id as string, token as string);

    // เรียก API ดวงคู่จาก backend ดวงดาว
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

    // log การใช้งาน (นับ quota)
    await logUsage(user_id as string, token as string, (question as string) || "match horoscope");

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (e: any) {
    res.status(400).json({ success: false, error: e.message });
  }
}
