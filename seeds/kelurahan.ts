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

interface SeederOptions {
    limit?: number              // Batasan jumlah kecamatan yang diproses
    startFrom?: number          // Mulai dari index tertentu
    kecamatanId?: number        // Proses kecamatan spesifik
    kotaId?: number            // Proses kecamatan dari kota tertentu
    provinsiId?: number        // Proses kecamatan dari provinsi tertentu
    timeout?: number           // Timeout untuk request API (ms)
    delay?: number             // Delay antar request (ms)
}

export async function seedKelurahan(options: SeederOptions = {}) {
    const {
        limit,
        startFrom = 0,
        kecamatanId,
        kotaId,
        provinsiId,
        timeout = 5000,
        delay = 1000
    } = options

    try {
        console.log('🌱 Mengambil daftar kecamatan dari database...')

        // Build query conditions
        const whereConditions: any = {
            deleted_at: null,
        }

        if (kecamatanId) {
            whereConditions.id = kecamatanId
        }
        if (kotaId) {
            whereConditions.kota_id = kotaId
        }
        if (provinsiId) {
            whereConditions.kota = {
                provinsi_id: provinsiId
            }
        }

        const kecamatanList = await prisma.kecamatan.findMany({
            select: {
                id: true,
                kode_kecamatan: true,
                nama: true,
                kota: {
                    select: {
                        nama: true,
                        provinsi: {
                            select: {
                                nama: true
                            }
                        }
                    }
                }
            },
            where: whereConditions,
            skip: startFrom,
            take: limit,
            orderBy: {
                id: 'asc'
            }
        })

        if (kecamatanList.length === 0) {
            throw new Error('Data kecamatan tidak ditemukan dengan kriteria yang diberikan!')
        }

        console.log('\n📊 Parameter seeding:')
        console.log(`- Total kecamatan akan diproses: ${kecamatanList.length}`)
        console.log(`- Mulai dari index: ${startFrom}`)
        if (kecamatanId) console.log(`- Filter: Kecamatan ID ${kecamatanId}`)
        if (kotaId) console.log(`- Filter: Kota ID ${kotaId}`)
        if (provinsiId) console.log(`- Filter: Provinsi ID ${provinsiId}`)
        console.log(`- Timeout: ${timeout}ms`)
        console.log(`- Delay: ${delay}ms\n`)

        let totalKelurahan = 0
        let successCount = 0
        let errorCount = 0

        for (const kecamatan of kecamatanList) {
            try {
                console.log(`\n🌱 Mengambil data kelurahan untuk:`)
                console.log(`- Kecamatan: ${kecamatan.nama}`)
                console.log(`- Kota: ${kecamatan.kota.nama}`)
                console.log(`- Provinsi: ${kecamatan.kota.provinsi.nama}`)

                const response = await axios.get<ApiResponse>(
                    `https://wilayah.id/api/villages/${kecamatan.kode_kecamatan}.json`,
                    { timeout }
                )
                const villages = response.data.data

                console.log(`📍 Ditemukan ${villages.length} kelurahan`)

                // Bulk insert kelurahan
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
                console.log(`✅ Berhasil menambahkan ${result.count} kelurahan baru`)

                // Delay sebelum request berikutnya
                await new Promise(resolve => setTimeout(resolve, delay))
            } catch (error) {
                errorCount++
                if (axios.isAxiosError(error)) {
                    if (error.code === 'ECONNABORTED') {
                        console.error(`⏱️ Timeout saat mengambil data kelurahan`)
                    } else {
                        console.error(`❌ Error API:`, error.response?.status, error.response?.statusText)
                    }
                } else {
                    console.error(`❌ Error tidak dikenal:`, error)
                }
                continue
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

// Contoh penggunaan dengan command line arguments
if (require.main === module) {
    const args = process.argv.slice(2)
    const options: SeederOptions = {}

    for (let i = 0; i < args.length; i += 2) {
        const key = args[i].replace('--', '')
        const value = args[i + 1]

        switch (key) {
            case 'limit':
            case 'startFrom':
            case 'kecamatanId':
            case 'kotaId':
            case 'provinsiId':
            case 'timeout':
            case 'delay':
                options[key] = parseInt(value)
                break
        }
    }

    seedKelurahan(options)
        .catch((e) => {
            console.error(e)
            process.exit(1)
        })
} 