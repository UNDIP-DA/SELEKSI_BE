import { PrismaClient } from '@prisma/client'
import axios from 'axios'

const prisma = new PrismaClient()

interface Regency {
    code: string
    province_code: string
    name: string
}

interface ApiResponse {
    data: Regency[]
}

export async function seedKota() {
    try {
        console.log('🌱 Mengambil daftar provinsi dari database...')
        const provinsiList = await prisma.provinsi.findMany({
            select: {
                id: true,
                kode_provinsi: true,
                nama: true,
            },
            where: {
                deleted_at: null,
            },
        })

        if (provinsiList.length === 0) {
            throw new Error('Data provinsi tidak ditemukan! Pastikan seeder provinsi sudah dijalankan.')
        }

        console.log(`📍 Ditemukan ${provinsiList.length} provinsi`)

        for (const provinsi of provinsiList) {
            try {
                console.log(`\n🌱 Mengambil data kota untuk provinsi ${provinsi.nama}...`)
                const response = await axios.get<ApiResponse>(`https://wilayah.id/api/regencies/${provinsi.kode_provinsi}.json`)
                const regencies = response.data.data

                console.log(`📍 Ditemukan ${regencies.length} kota di ${provinsi.nama}`)

                // Bulk insert kota untuk provinsi ini
                await prisma.kota.createMany({
                    data: regencies.map(regency => ({
                        kode_kota: regency.code,
                        nama: regency.name,
                        provinsi_id: provinsi.id,
                    })),
                    skipDuplicates: true,
                })

                console.log(`✅ Selesai menambahkan data kota untuk provinsi ${provinsi.nama}`)

                // Delay untuk menghindari rate limiting
                await new Promise(resolve => setTimeout(resolve, 1000))
            } catch (error) {
                console.error(`❌ Error saat mengambil data kota untuk provinsi ${provinsi.nama}:`, error)
                continue // Lanjut ke provinsi berikutnya jika terjadi error
            }
        }

        console.log('\n✅ Proses seeding data kota selesai!')
    } catch (error) {
        console.error('❌ Error saat seeding data kota:', error)
        throw error
    } finally {
        await prisma.$disconnect()
    }
}

// Jalankan seeder jika file dieksekusi langsung
if (require.main === module) {
    seedKota()
        .catch((e) => {
            console.error(e)
            process.exit(1)
        })
} 