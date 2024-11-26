import { queryField, nonNull, intArg, stringArg } from 'nexus'
import { Wilayah } from 'nexus-prisma'
import { WilayahWhereInput } from './inputs'

export const wilayahGet = queryField('wilayahGet', {
    type: Wilayah.$name,
    description: 'Mengambil satu data wilayah berdasarkan ID',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        const wilayah = await prisma.wilayah.findUnique({
            where: { id },
        })
        if (!wilayah) throw new Error('Wilayah tidak ditemukan')
        return wilayah
    },
})

export const wilayahGetByKode = queryField('wilayahGetByKode', {
    type: Wilayah.$name,
    description: 'Mengambil satu data wilayah berdasarkan kode wilayah',
    args: {
        kode: nonNull(stringArg()),
    },
    resolve: async (_, { kode }, { prisma }) => {
        const wilayah = await prisma.wilayah.findUnique({
            where: { kode_wilayah: kode },
        })
        if (!wilayah) throw new Error('Wilayah tidak ditemukan')
        return wilayah
    },
})

export const wilayahGetList = queryField('wilayahGetList', {
    type: 'WilayahList',
    description: 'Mengambil daftar wilayah dengan filter dan paginasi',
    args: {
        where: WilayahWhereInput,
    },
    resolve: async (_, { where }, { prisma }) => {
        const { search, sortBy, descending, take = 10, skip = 0, level, negara_id, parent_id, status } = where || {}

        const whereClause = {
            AND: [
                search ? {
                    OR: [
                        { kode_wilayah: { contains: search } },
                        { nama: { contains: search } },
                    ],
                } : {},
                level ? { level } : {},
                negara_id ? { negara_id } : {},
                parent_id ? { parent_id } : {},
            ],
        }

        const orderBy = sortBy ? { [sortBy]: descending ? 'desc' : 'asc' } : undefined

        const [data, total] = await Promise.all([
            prisma.wilayah.findMany({
                where: whereClause,
                orderBy,
                take,
                skip,
            }),
            prisma.wilayah.count({ where: whereClause }),
        ])

        return { data, total }
    },
}) 