import { queryField, nonNull, intArg } from 'nexus';
import { Kelurahan } from 'nexus-prisma';
import { KelurahanWhereInput } from './inputs';

export const getKelurahan = queryField('getKelurahan', {
    type: Kelurahan.$name,
    description: 'Mengambil satu data kelurahan berdasarkan ID',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        const kelurahan = await prisma.kelurahan.findUnique({
            where: { id },
        });
        if (!kelurahan) throw new Error('Data kelurahan tidak ditemukan');
        return kelurahan;
    },
});

export const getKelurahanList = queryField('getKelurahanList', {
    type: 'KelurahanList',
    description: 'Mengambil daftar kelurahan dengan paginasi dan filter opsional',
    args: {
        where: KelurahanWhereInput,
    },
    resolve: async (_, { where }, { prisma }) => {
        const { search, kecamatan_id, sortBy, descending, take = 10, skip = 0 } = where || {};

        const whereClause = {
            AND: [
                search ? {
                    OR: [
                        { kode_kelurahan: { contains: search } },
                        { nama: { contains: search } },
                    ],
                } : {},
                kecamatan_id ? { kecamatan_id } : {},
                { deleted_at: null },
            ],
        };

        const orderBy = sortBy ? { [sortBy]: descending ? 'desc' : 'asc' } : undefined;

        const [data, total] = await Promise.all([
            prisma.kelurahan.findMany({
                where: whereClause,
                orderBy,
                take,
                skip,
            }),
            prisma.kelurahan.count({ where: whereClause }),
        ]);

        return { data, total };
    },
}); 