import { NextApiRequest, NextApiResponse } from "next";
import { verifyUser } from "@/lib/membership";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user_id, token } = req.query;
    const data = await verifyUser(user_id as string, token as string);
    res.status(200).json({ success: true, data });
  } catch (e: any) {
    res.status(400).json({ success: false, error: e.message });
  }
}

