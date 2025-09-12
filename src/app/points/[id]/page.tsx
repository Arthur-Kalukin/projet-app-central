import { findPointById } from "@/lib/mockData";
import Link from "next/link";

export default function PointDetail({ params }: { params: { id: string } }) {
  const res = findPointById(params.id);
  if (!res) {
    return (
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl font-semibold">Point introuvable</h1>
        <Link href="/" className="text-blue-600 underline">← Retour</Link>
      </div>
    );
  }
  const { point, client, service } = res;

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <Link href="/" className="text-blue-600 underline">← Retour</Link>
      <h1 className="text-2xl font-semibold">{point.name} <span className="text-gray-500 text-base">[{point.code}]</span></h1>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <div className="text-xs text-gray-500">Service</div>
          <div className="font-medium">{service.name}</div>
        </div>
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <div className="text-xs text-gray-500">Client</div>
          <div className="font-medium">{client.name}</div>
        </div>
        <div className="bg-white border rounded-xl p-4 shadow-sm sm:col-span-2">
          <div className="text-xs text-gray-500">Adresse</div>
          <div className="font-medium">{point.address}</div>
        </div>
      </div>
    </div>
  );
}
