import { queryField, nonNull, intArg } from 'nexus';
import { Sekolah } from 'nexus-prisma';
import { SekolahWhereInput } from './inputs';

export const getSekolah = queryField('getSekolah', {
    type: Sekolah.$name,
    description: 'Mengambil satu data sekolah berdasarkan ID',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        const sekolah = await prisma.sekolah.findUnique({
            where: { id },
        });
        if (!sekolah) throw new Error('Data sekolah tidak ditemukan');
        return sekolah;
    },
});

export const getSekolahList = queryField('getSekolahList', {
    type: 'SekolahList',
    description: 'Mengambil daftar sekolah dengan paginasi dan filter opsional',
    args: {
        where: SekolahWhereInput,
    },
    resolve: async (_, { where }, { prisma }) => {
        const { search, sortBy, descending, take = 10, skip = 0 } = where || {};

        const whereClause = search
            ? {
                OR: [
                    { kode_sekolah: { contains: search } },
                    { nama_sekolah: { contains: search } },
                ],
                deleted_at: null,
            }
            : { deleted_at: null };

        const orderBy = sortBy ? { [sortBy]: descending ? 'desc' : 'asc' } : undefined;

        const [data, total] = await Promise.all([
            prisma.sekolah.findMany({
                where: whereClause,
                orderBy,
                take,
                skip,
            }),
            prisma.sekolah.count({ where: whereClause }),
        ]);

        return { data, total };
    },
}); 