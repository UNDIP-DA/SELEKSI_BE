import { queryField, nonNull, intArg } from 'nexus';
import { Kota } from 'nexus-prisma';
import { KotaWhereInput } from './inputs';

export const getKota = queryField('getKota', {
    type: Kota.$name,
    description: 'Mengambil satu data kota/kabupaten berdasarkan ID',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        const kota = await prisma.kota.findUnique({
            where: { id },
        });
        if (!kota) throw new Error('Data kota/kabupaten tidak ditemukan');
        return kota;
    },
});

export const getKotaList = queryField('getKotaList', {
    type: 'KotaList',
    description: 'Mengambil daftar kota/kabupaten dengan paginasi dan filter opsional',
    args: {
        where: KotaWhereInput,
    },
    resolve: async (_, { where }, { prisma }) => {
        const { search, provinsi_id, sortBy, descending, take = 10, skip = 0 } = where || {};

        const whereClause = {
            AND: [
                search ? {
                    OR: [
                        { kode_kota: { contains: search } },
                        { nama: { contains: search } },
                    ],
                } : {},
                provinsi_id ? { provinsi_id } : {},
                { deleted_at: null },
            ],
        };

        const orderBy = sortBy ? { [sortBy]: descending ? 'desc' : 'asc' } : undefined;

        const [data, total] = await Promise.all([
            prisma.kota.findMany({
                where: whereClause,
                orderBy,
                take,
                skip,
            }),
            prisma.kota.count({ where: whereClause }),
        ]);

        return { data, total };
    },
}); 