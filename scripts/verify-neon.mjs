// Verificador de leads en Neon Postgres — uso:
//   node scripts/verify-neon.mjs          → lista los últimos 5 leads
//   node scripts/verify-neon.mjs cleanup  → elimina leads de prueba (email contiene 'prueba-neon')
import { readFileSync } from 'node:fs'
import { PrismaClient } from '@prisma/client'

// Carga .env con PRIORIDAD sobre el entorno del shell (el sandbox exporta un DATABASE_URL viejo)
for (const line of readFileSync(new URL('../.env', import.meta.url), 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_]+)=(.*)$/)
  if (m) process.env[m[1]] = m[2].replace(/^"|"$/g, '')
}

const db = new PrismaClient({ log: ['error'] })

try {
  if (process.argv[2] === 'cleanup') {
    const del = await db.lead.deleteMany({ where: { email: { contains: 'prueba-neon' } } })
    console.log(`cleanup: ${del.count} lead(s) de prueba eliminado(s)`)
  } else {
    const leads = await db.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 5 })
    console.log(`leads en Neon: ${leads.length}`)
    for (const l of leads) {
      console.log(`- ${l.createdAt.toISOString()} | ${l.email} | ${l.need} | ${l.status}`)
    }
  }
} finally {
  await db.$disconnect()
}
