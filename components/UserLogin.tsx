import React, { useState } from "react";

export default function UserLogin({ onLogin }: { onLogin: (user: any) => void }) {
  const [user_id, setUserId] = useState("");
  const [token, setToken] = useState("");

  return (
    <div className="space-y-3">
      <input
        className="border p-2 w-full"
        placeholder="User ID"
        value={user_id}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button
        onClick={() => onLogin({ id: user_id, token })}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        เข้าสู่ระบบ
      </button>
    </div>
  );
}

