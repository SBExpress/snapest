import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  errorFormat: 'colorless',
})

async function main() {
  console.log('🌱 Seeding database...')

  const company = await prisma.company.upsert({
    where: { email: 'demo@snapest.local' },
    update: {},
    create: {
      name: 'Demo Electrical Contractors',
      email: 'demo@snapest.local',
      status: 'active',
      subscriptionTier: 'pro',
    },
  })

  console.log(`✅ Company: ${company.name} (ID: ${company.id})`)

  const materials = await Promise.all([
    prisma.material.upsert({
      where: { itemNumber_companyId: { itemNumber: '1/2-EMT', companyId: company.id } },
      update: {},
      create: {
        itemNumber: '1/2-EMT',
        description: '1/2" EMT Conduit',
        unit: 'LF',
        basePrice: 0.85,
        laborLevel1Hours: 0.02,
        laborLevel2Hours: 0.015,
        laborLevel3Hours: 0.01,
        category: 'Conduit',
        companyId: company.id,
      },
    }),
    prisma.material.upsert({
      where: { itemNumber_companyId: { itemNumber: '3/4-EMT', companyId: company.id } },
      update: {},
      create: {
        itemNumber: '3/4-EMT',
        description: '3/4" EMT Conduit',
        unit: 'LF',
        basePrice: 1.25,
        laborLevel1Hours: 0.025,
        laborLevel2Hours: 0.02,
        laborLevel3Hours: 0.015,
        category: 'Conduit',
        companyId: company.id,
      },
    }),
  ])

  console.log(`✅ Materials: ${materials.length} items`)

  const settings = await prisma.settings.upsert({
    where: { companyId: company.id },
    update: {},
    create: {
      companyId: company.id,
      laborLevel1Name: 'Apprentice',
      laborLevel2Name: 'Journeyman',
      laborLevel3Name: 'Foreman',
      laborLevel1Rate: 25.00,
      laborLevel2Rate: 45.00,
      laborLevel3Rate: 65.00,
      laborBurdenPercent: 30,
      materialSalesTaxPercent: 6.625,
      materialOverheadPercent: 15,
      materialProfitPercent: 12,
      laborOverheadPercent: 15,
      laborProfitPercent: 12,
    },
  })

  console.log(`✅ Settings created`)
  console.log(`\n🎉 Database seeded!\nCompany ID: ${company.id}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
