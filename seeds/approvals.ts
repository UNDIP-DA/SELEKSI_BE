import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("Starting seeding approvals ...");

    // Array of approvals to seed
    const approvals = [
        { nama: 'DRAFT', role_id: 2 },
        { nama: 'APPROVED_BY_MANAGER_LP2MP', role_id: 3 },
        { nama: 'APPROVED_BY_SPV_BUK', role_id: 5 },
        { nama: 'APPROVED_BY_SPV_BAK', role_id: 7 },
    ];

    // Use createMany to seed all approvals at once
    await prisma.approval.createMany({
        data: approvals,
        skipDuplicates: true, // Optional: Skip if the record already exists
    });

    console.log("Seeding completed.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
