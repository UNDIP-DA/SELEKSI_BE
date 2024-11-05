import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const agamaData = [
    {
        nama: 'Islam',
    },
    {
        nama: 'Kristen Protestan',
    },
    {
        nama: 'Kristen Katolik',
    },
    {
        nama: 'Hindu',
    },
    {
        nama: 'Buddha',
    },
    {
        nama: 'Khonghucu',
    },
];

async function main() {
    console.log('Mulai seeding data agama...');

    try {
        await prisma.agama.createMany({
            data: agamaData,
            skipDuplicates: true, // Skip jika data sudah ada (berdasarkan unique constraint)
        });

        console.log('Seeding data agama selesai!');
    } catch (error) {
        console.error('Terjadi kesalahan saat seeding data agama:', error);
        throw error;
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });