import { PrismaClient } from '@prisma/client'
import axios from 'axios'

const prisma = new PrismaClient()

interface Village {
    code: string
    district_code: string
    name: string
}

interface ApiResponse {
    data: Village[]
}

export async function seedKelurahan() {
    try {
        console.log('🌱 Mengambil daftar kecamatan dari database...')
        const kecamatanList = await prisma.kecamatan.findMany({
            select: {
                id: true,
                kode_kecamatan: true,
                nama: true,
                kota: {
                    select: {
                        nama: true
                    }
                }
            },
            where: {
                deleted_at: null,
            },
        })

        if (kecamatanList.length === 0) {
            throw new Error('Data kecamatan tidak ditemukan! Pastikan seeder kecamatan sudah dijalankan.')
        }

        console.log(`📍 Ditemukan ${kecamatanList.length} kecamatan`)
        let totalKelurahan = 0
        let successCount = 0
        let errorCount = 0

        for (const kecamatan of kecamatanList) {
            try {
                console.log(`\n🌱 Mengambil data kelurahan untuk kecamatan ${kecamatan.nama} (${kecamatan.kota.nama})...`)
                const response = await axios.get<ApiResponse>(
                    `https://wilayah.id/api/villages/${kecamatan.kode_kecamatan}.json`,
                    { timeout: 5000 } // 5 detik timeout
                )
                const villages = response.data.data

                console.log(`📍 Ditemukan ${villages.length} kelurahan di kecamatan ${kecamatan.nama}`)

                // Bulk insert kelurahan untuk kecamatan ini
                const result = await prisma.kelurahan.createMany({
                    data: villages.map(village => ({
                        kode_kelurahan: village.code,
                        nama: village.name,
                        kecamatan_id: kecamatan.id,
                    })),
                    skipDuplicates: true,
                })

                totalKelurahan += result.count
                successCount++
                console.log(`✅ Berhasil menambahkan ${result.count} kelurahan baru untuk kecamatan ${kecamatan.nama}`)

                // Delay untuk menghindari rate limiting
                await new Promise(resolve => setTimeout(resolve, 1000))
            } catch (error) {
                errorCount++
                if (axios.isAxiosError(error)) {
                    if (error.code === 'ECONNABORTED') {
                        console.error(`⏱️ Timeout saat mengambil data kelurahan untuk kecamatan ${kecamatan.nama}`)
                    } else {
                        console.error(`❌ Error saat mengambil data kelurahan untuk kecamatan ${kecamatan.nama}:`,
                            error.response?.status, error.response?.statusText)
                    }
                } else {
                    console.error(`❌ Error tidak dikenal untuk kecamatan ${kecamatan.nama}:`, error)
                }
                continue // Lanjut ke kecamatan berikutnya jika terjadi error
            }
        }

        console.log('\n📊 Ringkasan proses seeding:')
        console.log(`- Total kecamatan diproses: ${kecamatanList.length}`)
        console.log(`- Berhasil: ${successCount} kecamatan`)
        console.log(`- Gagal: ${errorCount} kecamatan`)
        console.log(`- Total kelurahan ditambahkan: ${totalKelurahan}`)
        console.log('\n✅ Proses seeding data kelurahan selesai!')
    } catch (error) {
        console.error('❌ Error saat seeding data kelurahan:', error)
        throw error
    } finally {
        await prisma.$disconnect()
    }
}

// Jalankan seeder jika file dieksekusi langsung
if (require.main === module) {
    seedKelurahan()
        .catch((e) => {
            console.error(e)
            process.exit(1)
        })
} 