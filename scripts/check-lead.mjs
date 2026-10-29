import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
const leads = await db.lead.findMany({ where: { email: "prueba.redes@test.com" }, orderBy: { createdAt: "desc" }, take: 1 });
console.log("LEAD:", JSON.stringify(leads, null, 2));
if (leads[0]) { await db.lead.delete({ where: { id: leads[0].id } }); console.log("-> lead de prueba eliminado"); }
await db.$disconnect();
