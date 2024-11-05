import { PrismaClient } from '@prisma/client'
import axios from 'axios'

const prisma = new PrismaClient()

interface Country {
    name: {
        common: string
    }
    idd: {
        root?: string
        suffixes?: string[]
    }
    cca2: string
    region: string
    subregion: string
    status?: boolean
}

async function main() {
    try {
        // Fetch data from REST Countries API
        console.log('🌱 Mengambil data dari API restcountries...')
        const response = await axios.get('https://restcountries.com/v3.1/all')
        const countries: Country[] = response.data

        console.log('🌱 Mulai seeding data negara...')

        // Prepare data for bulk insert
        const negaraData = countries.map(country => ({
            kode_negara: country.cca2,
            nama: country.name.common,
            kode_telp: country.idd.root && country.idd.suffixes ?
                `${country.idd.root}${country.idd.suffixes[0]}`.replace('+', '') :
                null,
            region: country.region,
            subregion: country.subregion,
            status: true,
        }))

        // Bulk insert using createMany
        await prisma.negara.createMany({
            data: negaraData,
            skipDuplicates: true, // Skip jika kode_negara sudah ada
        })

        console.log('✅ Seeding data negara selesai!')
    } catch (error) {
        console.error('❌ Error saat seeding data negara:', error)
        throw error
    } finally {
        await prisma.$disconnect()
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    }) 