import { NextApiRequest, NextApiResponse } from "next";
import { verifyUser, logUsage } from "@/lib/membership";
import { analyzeTransit } from "@/lib/astroService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user_id, token, base_date, base_time, target_date, question } = req.query;

    // ตรวจสิทธิ์ก่อน
    await verifyUser(user_id as string, token as string);

    // วิเคราะห์ดาวจร
    const result = await analyzeTransit(
      base_date as string,
      base_time as string,
      target_date as string
    );

    // บันทึก log การใช้งาน
    await logUsage(user_id as string, token as string, (question as string) || "analyze transit");

    res.status(200).json({ success: true, data: result });
  } catch (e: any) {
    res.status(400).json({ success: false, error: e.message });
  }
}

