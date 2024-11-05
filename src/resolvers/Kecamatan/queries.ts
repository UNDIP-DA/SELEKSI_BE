import { queryField, nonNull, intArg } from 'nexus';
import { Kecamatan } from 'nexus-prisma';
import { KecamatanWhereInput } from './inputs';

export const getKecamatan = queryField('getKecamatan', {
    type: Kecamatan.$name,
    description: 'Mengambil satu data kecamatan berdasarkan ID',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        const kecamatan = await prisma.kecamatan.findUnique({
            where: { id },
        });
        if (!kecamatan) throw new Error('Data kecamatan tidak ditemukan');
        return kecamatan;
    },
});

export const getKecamatanList = queryField('getKecamatanList', {
    type: 'KecamatanList',
    description: 'Mengambil daftar kecamatan dengan paginasi dan filter opsional',
    args: {
        where: KecamatanWhereInput,
    },
    resolve: async (_, { where }, { prisma }) => {
        const { search, kota_id, sortBy, descending, take = 10, skip = 0 } = where || {};

        const whereClause = {
            AND: [
                search ? {
                    OR: [
                        { kode_kecamatan: { contains: search } },
                        { nama: { contains: search } },
                    ],
                } : {},
                kota_id ? { kota_id } : {},
                { deleted_at: null },
            ],
        };

        const orderBy = sortBy ? { [sortBy]: descending ? 'desc' : 'asc' } : undefined;

        const [data, total] = await Promise.all([
            prisma.kecamatan.findMany({
                where: whereClause,
                orderBy,
                take,
                skip,
            }),
            prisma.kecamatan.count({ where: whereClause }),
        ]);

        return { data, total };
    },
}); 