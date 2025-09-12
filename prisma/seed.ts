import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Services
  const s1 = await prisma.service.upsert({ where: { name: "Maintien opérationnel" }, update: {}, create: { name: "Maintien opérationnel" }});
  const s2 = await prisma.service.upsert({ where: { name: "Travaux" }, update: {}, create: { name: "Travaux" }});
  const s3 = await prisma.service.upsert({ where: { name: "S-IDRA" }, update: {}, create: { name: "S-IDRA" }});
  const s4 = await prisma.service.upsert({ where: { name: "SESER" }, update: {}, create: { name: "SESER" }});
  const s5 = await prisma.service.upsert({ where: { name: "CPCU" }, update: {}, create: { name: "CPCU" }});

  // Clients
  const cA = await prisma.client.create({ data: { name: "Client A" }});
  const cB = await prisma.client.create({ data: { name: "Client B" }});
  const cC = await prisma.client.create({ data: { name: "Client C" }});

  // Liens client-services
  await prisma.clientService.createMany({
    data: [
      { clientId: cA.id, serviceId: s1.id },
      { clientId: cB.id, serviceId: s1.id },
      { clientId: cA.id, serviceId: s2.id }, // même client A dans un autre service
      { clientId: cC.id, serviceId: s2.id },
      { clientId: cB.id, serviceId: s3.id },
    ],
    skipDuplicates: true
  });

  // Points
  await prisma.point.createMany({
    data: [
      { id: "pt-100", code: "PT-100", name: "Station Rue X", address: "12 Rue des Docks, 94210", clientId: cA.id, serviceId: s1.id },
      { id: "pt-101", code: "PT-101", name: "Bassin Parc Y", address: "Parc Y, 94100", clientId: cA.id, serviceId: s1.id },
      { id: "pt-102", code: "PT-102", name: "Regard Z",    address: "Allée Z, 94000", clientId: cB.id, serviceId: s1.id },
      { id: "pt-200", code: "PT-200", name: "Chantier Pont A", address: "Quai A, 75012", clientId: cA.id, serviceId: s2.id },
      { id: "pt-201", code: "PT-201", name: "Trappe Centrale", address: "Av. Centrale 5, 75013", clientId: cC.id, serviceId: s2.id },
      { id: "pt-300", code: "PT-300", name: "Capteur SIDRA-1", address: "Rue Sidra 1, 75010", clientId: cB.id, serviceId: s3.id },
    ]
  });

  // Un admin de départ
  await prisma.user.create({ data: { email: "admin@semeru.fayat.com", role: "admin" }});

  // Audit
  await prisma.auditLog.create({
    data: { action: "SEED", userEmail: "system", details: "Initial dataset created" }
  });
}

main()
  .then(() => console.log("Seed OK"))
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
