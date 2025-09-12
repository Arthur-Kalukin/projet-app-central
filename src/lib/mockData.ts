import { ServiceTree, Service, Client, Point, ID } from "@/types/domain";

const sAssainissement: Service = { id: "svc-1", name: "Maintien opérationnel" };
const sTravaux: Service        = { id: "svc-2", name: "Travaux" };
const sSIDRA: Service          = { id: "svc-3", name: "S-IDRA" };
const sSESER: Service          = { id: "svc-4", name: "SESER" };
const sCPCU: Service           = { id: "svc-5", name: "CPCU" };

const cA: Client = { id: "cli-A", name: "Client A" };
const cB: Client = { id: "cli-B", name: "Client B" };
const cC: Client = { id: "cli-C", name: "Client C" };

// util pour fabriquer des points rapidement
const p = (id: ID, name: string, code: string, address: string, clientId: ID, serviceId: ID): Point =>
  ({ id, name, code, address, clientId, serviceId });

export const serviceTrees: ServiceTree[] = [
  {
    service: sAssainissement,
    clients: [
      {
        client: cA, // A apparaît ici...
        points: [
          p("pt-100", "Station Rue X", "PT-100", "12 Rue des Docks, 94210", cA.id, sAssainissement.id),
          p("pt-101", "Bassin Parc Y", "PT-101", "Parc Y, 94100", cA.id, sAssainissement.id),
        ],
      },
      {
        client: cB,
        points: [
          p("pt-102", "Regard Z", "PT-102", "Allée Z, 94000", cB.id, sAssainissement.id),
        ],
      },
    ],
  },
  {
    service: sTravaux,
    clients: [
      {
        client: cA, // ...et réapparaît aussi ici (client multi-services)
        points: [
          p("pt-200", "Chantier Pont A", "PT-200", "Quai A, 75012", cA.id, sTravaux.id),
        ],
      },
      {
        client: cC,
        points: [
          p("pt-201", "Trappe Centrale", "PT-201", "Av. Centrale 5, 75013", cC.id, sTravaux.id),
        ],
      },
    ],
  },
  {
    service: sSIDRA,
    clients: [
      { client: cB, points: [p("pt-300", "Capteur SIDRA-1", "PT-300", "Rue Sidra 1, 75010", cB.id, sSIDRA.id)] },
    ],
  },
  { service: sSESER, clients: [] },
  { service: sCPCU, clients: [] },
];

// aides pour la page détail point
export function findPointById(id: ID): { point: Point; client: Client; service: Service } | null {
  for (const tree of serviceTrees) {
    for (const node of tree.clients) {
      const point = node.points.find(p => p.id === id);
      if (point) return { point, client: node.client, service: tree.service };
    }
  }
  return null;
}
