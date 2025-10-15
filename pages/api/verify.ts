import { NextApiRequest, NextApiResponse } from "next";

/**
 * ✅ Public Mode — ตรวจสิทธิ์สมาชิก (ชั่วคราว)
 * เปิดให้เข้าถึงได้โดยไม่ต้องมี user_id หรือ token
 * ใช้สำหรับทดสอบการเชื่อมต่อระบบ GPT Actions / API / Frontend
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user_id, token } = req.query;

    // แสดงสถานะโหมดการเข้าถึง
    const accessMode = user_id && token ? "Member mode" : "Public mode";

    // ส่งกลับข้อมูลจำลองสถานะสมาชิก
    res.status(200).json({
      success: true,
      message:
        accessMode === "Public mode"
          ? "✅ Public access: การตรวจสิทธิ์ถูกปิดชั่วคราว (ไม่ต้องใช้ token)"
          : "✅ Member verified successfully",
      data: {
        accessMode,
        user_id: user_id || null,
        token: token || null,
        quota: accessMode === "Public mode" ? "∞ (ทดลอง)" : 10,
        used_count: 0,
        package: accessMode === "Public mode" ? "public_demo" : "member",
        expiry: accessMode === "Public mode" ? "ไม่จำกัด (โหมดสาธารณะ)" : "2025-12-31"
      }
    });
  } catch (error: any) {
    console.error("❌ Error in verify:", error);
    res.status(400).json({
      success: false,
      error: error.message || "เกิดข้อผิดพลาดในระบบตรวจสิทธิ์"
    });
  }
}
