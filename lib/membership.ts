// lib/membership.ts
export interface MemberData {
  user_id: string;
  token: string;
  quota: number;
  used_count: number;
  package: string;
  expiry: string;
}

export async function verifyUser(user_id: string, token: string): Promise<MemberData> {
  const res = await fetch(`${process.env.MEMBER_API}?action=verify&user_id=${user_id}&token=${token}`);
  const data = await res.json();

  if (!data.valid) {
    throw new Error("❌ token ไม่ถูกต้อง หรือหมดอายุ");
  }
  if (data.used_count >= data.quota) {
    throw new Error("⚠️ ใช้ครบโควตาแล้ว กรุณาต่ออายุ package");
  }
  return data;
}

export async function logUsage(user_id: string, token: string, question: string) {
  await fetch(`${process.env.MEMBER_API}?action=log`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, token, question }),
  });
}
