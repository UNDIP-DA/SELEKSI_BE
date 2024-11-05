import { PrismaClient } from '@prisma/client'
import axios from 'axios'

const prisma = new PrismaClient()

interface District {
    code: string
    regency_code: string
    name: string
}

interface ApiResponse {
    data: District[]
}

export async function seedKecamatan() {
    try {
        console.log('🌱 Mengambil daftar kota dari database...')
        const kotaList = await prisma.kota.findMany({
            select: {
                id: true,
                kode_kota: true,
                nama: true,
            },
            where: {
                deleted_at: null,
            },
        })

        if (kotaList.length === 0) {
            throw new Error('Data kota tidak ditemukan! Pastikan seeder kota sudah dijalankan.')
        }

        console.log(`📍 Ditemukan ${kotaList.length} kota`)
        let totalKecamatan = 0

        for (const kota of kotaList) {
            try {
                console.log(`\n🌱 Mengambil data kecamatan untuk kota ${kota.nama}...`)
                const response = await axios.get<ApiResponse>(`https://wilayah.id/api/districts/${kota.kode_kota}.json`)
                const districts = response.data.data

                console.log(`📍 Ditemukan ${districts.length} kecamatan di ${kota.nama}`)

                // Bulk insert kecamatan untuk kota ini
                const result = await prisma.kecamatan.createMany({
                    data: districts.map(district => ({
                        kode_kecamatan: district.code,
                        nama: district.name,
                        kota_id: kota.id,
                    })),
                    skipDuplicates: true,
                })

                totalKecamatan += result.count
                console.log(`✅ Berhasil menambahkan ${result.count} kecamatan baru untuk kota ${kota.nama}`)

                // Delay untuk menghindari rate limiting
                await new Promise(resolve => setTimeout(resolve, 1000))
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error(`❌ Error saat mengambil data kecamatan untuk kota ${kota.nama}:`,
                        error.response?.status, error.response?.statusText)
                } else {
                    console.error(`❌ Error tidak dikenal untuk kota ${kota.nama}:`, error)
                }
                continue // Lanjut ke kota berikutnya jika terjadi error
            }
        }

        console.log(`\n✅ Proses seeding selesai! Total ${totalKecamatan} kecamatan berhasil ditambahkan.`)
    } catch (error) {
        console.error('❌ Error saat seeding data kecamatan:', error)
        throw error
    } finally {
        await prisma.$disconnect()
    }
}

// Jalankan seeder jika file dieksekusi langsung
if (require.main === module) {
    seedKecamatan()
        .catch((e) => {
            console.error(e)
            process.exit(1)
        })
} 