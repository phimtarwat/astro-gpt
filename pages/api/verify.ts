import { NextApiRequest, NextApiResponse } from "next";
import { verifyUser } from "@/lib/membership";

export default async function handler(req, res) {
  const { user_id, token } = req.query;
  res.status(200).json({
    success: true,
    message: "Public mode — verification skipped",
    data: { user_id: user_id || null, token: token || null }
  });
}


