import { prisma } from "@/lib/db";
import type { ServiceTree } from "@/types/domain";

export async function getServiceTreesFromDB(): Promise<ServiceTree[]> {
  const services = await prisma.service.findMany({
    orderBy: { name: "asc" },
    include: {
      clients: {
        include: {
          client: true,
        },
      },
      points: true,
    },
  });

  // Construire ServiceTree[]: pour chaque service, regrouper points par client
  const trees: ServiceTree[] = services.map(svc => {
    // map clientId -> points[]
    const byClient = new Map<string, { id: string; name: string; points: any[] }>();
    for (const link of svc.clients) {
      byClient.set(link.clientId, { id: link.client.id, name: link.client.name, points: [] });
    }
    for (const pt of svc.points) {
      if (!byClient.has(pt.clientId)) {
        // point orphelin si lien manquant (devrait pas arriver, mais safe)
        const c = { id: pt.clientId, name: "Client ?", points: [] as any[] };
        byClient.set(pt.clientId, c);
      }
      byClient.get(pt.clientId)!.points.push({
        id: pt.id, code: pt.code, name: pt.name, address: pt.address,
        clientId: pt.clientId, serviceId: pt.serviceId
      });
    }

    return {
      service: { id: svc.id, name: svc.name },
      clients: Array.from(byClient.values()).map(c => ({
        client: { id: c.id, name: c.name },
        points: c.points
      }))
    };
  });

  return trees;
}
