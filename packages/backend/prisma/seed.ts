import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  errorFormat: 'colorless',
})

async function main() {
  console.log('🌱 Seeding database...')

  // Create a test company
  const company = await prisma.company.create({
    data: {
      name: 'Demo Electrical Contractors',
      email: 'demo@snapest.local',
      status: 'active',
      subscriptionTier: 'pro',
    },
  })

  console.log(`✅ Created company: ${company.name} (ID: ${company.id})`)

  // Create test materials
  const materials = await Promise.all([
    prisma.material.create({
      data: {
        itemNumber: '1/2-EMT',
        description: '1/2" EMT Conduit',
        unit: 'LF',
        basePrice: new Decimal('0.85'),
        laborLevel1Hours: new Decimal('0.02'),
        laborLevel2Hours: new Decimal('0.015'),
        laborLevel3Hours: new Decimal('0.01'),
        category: 'Conduit',
        companyId: company.id,
      },
    }),
    prisma.material.create({
      data: {
        itemNumber: '3/4-EMT',
        description: '3/4" EMT Conduit',
        unit: 'LF',
        basePrice: new Decimal('1.25'),
        laborLevel1Hours: new Decimal('0.025'),
        laborLevel2Hours: new Decimal('0.02'),
        laborLevel3Hours: new Decimal('0.015'),
        category: 'Conduit',
        companyId: company.id,
      },
    }),
    prisma.material.create({
      data: {
        itemNumber: '12AWG-THHN',
        description: '12 AWG THHN Wire',
        unit: 'LF',
        basePrice: new Decimal('0.15'),
        laborLevel1Hours: new Decimal('0.01'),
        laborLevel2Hours: new Decimal('0.008'),
        laborLevel3Hours: new Decimal('0.005'),
        category: 'Wire',
        companyId: company.id,
      },
    }),
    prisma.material.create({
      data: {
        itemNumber: '10AWG-THHN',
        description: '10 AWG THHN Wire',
        unit: 'LF',
        basePrice: new Decimal('0.25'),
        laborLevel1Hours: new Decimal('0.012'),
        laborLevel2Hours: new Decimal('0.01'),
        laborLevel3Hours: new Decimal('0.007'),
        category: 'Wire',
        companyId: company.id,
      },
    }),
    prisma.material.create({
      data: {
        itemNumber: 'OUTLET-15',
        description: '15A Duplex Outlet',
        unit: 'EA',
        basePrice: new Decimal('3.50'),
        laborLevel1Hours: new Decimal('0.25'),
        laborLevel2Hours: new Decimal('0.2'),
        laborLevel3Hours: new Decimal('0.15'),
        category: 'Outlets & Switches',
        companyId: company.id,
      },
    }),
    prisma.material.create({
      data: {
        itemNumber: 'SWITCH-15',
        description: '15A Toggle Switch',
        unit: 'EA',
        basePrice: new Decimal('2.75'),
        laborLevel1Hours: new Decimal('0.2'),
        laborLevel2Hours: new Decimal('0.15'),
        laborLevel3Hours: new Decimal('0.1'),
        category: 'Outlets & Switches',
        companyId: company.id,
      },
    }),
    prisma.material.create({
      data: {
        itemNumber: 'PANEL-200A',
        description: '200A Main Panel',
        unit: 'EA',
        basePrice: new Decimal('450.00'),
        laborLevel1Hours: new Decimal('4.0'),
        laborLevel2Hours: new Decimal('3.0'),
        laborLevel3Hours: new Decimal('2.0'),
        category: 'Panels',
        companyId: company.id,
      },
    }),
  ])

  console.log(`✅ Created ${materials.length} materials`)

  // Create global settings for the company
  const settings = await prisma.settings.create({
    data: {
      companyId: company.id,
      laborLevel1Name: 'Apprentice',
      laborLevel2Name: 'Journeyman',
      laborLevel3Name: 'Foreman',
      laborLevel1Rate: new Decimal('25.00'),
      laborLevel2Rate: new Decimal('45.00'),
      laborLevel3Rate: new Decimal('65.00'),
      laborBurdenPercent: new Decimal('30'),
      materialSalesTaxPercent: new Decimal('6.625'),
      materialOverheadPercent: new Decimal('15'),
      materialProfitPercent: new Decimal('12'),
      laborOverheadPercent: new Decimal('15'),
      laborProfitPercent: new Decimal('12'),
    },
  })

  console.log(`✅ Created settings for company`)

  console.log(`
🎉 Database seeded successfully!

Test Company ID: ${company.id}
Use this ID in the x-company-id header for API requests.

Example:
  curl -H "x-company-id: ${company.id}" http://localhost:3000/api/materials
  `)
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
