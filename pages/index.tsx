import React, { useState } from "react";
import UserLogin from "@/components/UserLogin";
import HoroscopeResult from "@/components/HoroscopeResult";
import Loading from "@/components/Loading";

export default function Home() {
  const [user, setUser] = useState<{ id: string; token: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function analyze() {
    if (!user) return;
    setLoading(true);
    const res = await fetch(`/api/analyze?user_id=${user.id}&token=${user.token}&base_date=24/11/2514&base_time=11:00&target_date=08/05/2569`);
    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">🔮 ระบบดูดวง GPT</h1>
      {!user ? (
        <UserLogin onLogin={setUser} />
      ) : (
        <>
          <button onClick={analyze} className="bg-blue-600 text-white px-4 py-2 rounded">
            วิเคราะห์ดวง
          </button>
          {loading && <Loading />}
          {result && <HoroscopeResult data={result} />}
        </>
      )}
    </div>
  );
}

