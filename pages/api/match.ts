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
    if (user_id && token) {
  await verifyUser(user_id as string, token as string);
} else {
  console.log("⚠️ Public access (no token) — temporary mode");
}


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
    if (user_id && token) {
  await verifyUser(user_id as string, token as string);
} else {
  console.log("⚠️ Public access (no token) — temporary mode");
}


    res.status(200).json({
      success: true,
      data: result
    });
  } catch (e: any) {
    res.status(400).json({ success: false, error: e.message });
  }
}
