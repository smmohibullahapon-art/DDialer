const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Dial Dynamic Ltd',
      slug: 'dial-dynamic',
      wallet: {
        create: {
          balance: 15000.0000,
          currency: 'BDT',
          creditLimit: 5000.0000
        }
      },
      users: {
        create: {
          fullName: 'Tasnim Munni',
          email: 'admin@dialdynamic.com',
          passwordHash: 'argon2_or_bcrypt_hash_placeholder',
          role: 'SUPER_ADMIN'
        }
      },
      dids: {
        create: {
          number: '+8809612000000',
          countryCode: '880',
          type: 'DID',
          providerId: 'BD-BTCL-DIRECT',
          monthlyRate: 350.00
        }
      }
    }
  });
  console.log('Seed completed successfully for Tenant:', tenant.name);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
