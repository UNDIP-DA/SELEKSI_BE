import { PrismaClient } from '@prisma/client'
import axios from 'axios'

const prisma = new PrismaClient()

interface Province {
    code: string
    name: string
}

interface ApiResponse {
    data: Province[]
}

export async function seedProvinsi() {
    try {
        console.log('🌱 Mencari ID negara Indonesia...')
        const indonesia = await prisma.negara.findFirst({
            where: {
                nama: 'Indonesia',
            },
            select: {
                id: true,
            },
        })

        if (!indonesia) {
            throw new Error('Data negara Indonesia tidak ditemukan! Pastikan seeder negara sudah dijalankan.')
        }

        console.log('🌱 Mengambil data dari API wilayah.id...')
        const response = await axios.get<ApiResponse>('https://wilayah.id/api/provinces.json')
        const provinces = response.data.data

        console.log('🌱 Mulai seeding data provinsi...')

        // Bulk insert
        await prisma.provinsi.createMany({
            data: provinces.map(province => ({
                kode_provinsi: province.code,
                nama: province.name,
                status: true,
                negara_id: indonesia.id,
            })),
            skipDuplicates: true, // Skip jika kode_provinsi sudah ada
        })

        console.log('✅ Seeding data provinsi selesai!')
    } catch (error) {
        console.error('❌ Error saat seeding data provinsi:', error)
        throw error
    } finally {
        await prisma.$disconnect()
    }
}

// Jalankan seeder jika file dieksekusi langsung
if (require.main === module) {
    seedProvinsi()
        .catch((e) => {
            console.error(e)
            process.exit(1)
        })
} 