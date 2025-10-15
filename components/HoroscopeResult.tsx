export default function HoroscopeResult({ data }: { data: any }) {
  if (!data?.success) return <div className="text-red-500 mt-4">❌ วิเคราะห์ไม่สำเร็จ</div>;
  return (
    <div className="mt-6 p-4 border rounded bg-gray-50 text-left">
      <h2 className="font-bold mb-2">ผลการวิเคราะห์:</h2>
      <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(data.data, null, 2)}</pre>
    </div>
  );
}

