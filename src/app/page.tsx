import ServiceTree from "@/components/Tree/ServiceTree";
import { getServiceTreesFromDB } from "@/lib/tree.repository";

export default async function HomePage() {
  const serviceTrees = await getServiceTreesFromDB();
  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Accueil</h1>
        <p className="text-sm text-gray-600">Arborescence des services & clients.</p>
      </div>
      <ServiceTree data={serviceTrees} />
    </div>
  );
}
