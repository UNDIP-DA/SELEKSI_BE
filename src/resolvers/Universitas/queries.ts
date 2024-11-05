import { queryField, nonNull, intArg } from 'nexus';
import { Universitas } from 'nexus-prisma';
import { UniversitasWhereInput } from './inputs';

export const getUniversitas = queryField('getUniversitas', {
    type: Universitas.$name,
    description: 'Mengambil satu data universitas berdasarkan ID',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        const universitas = await prisma.universitas.findUnique({
            where: { id },
        });
        if (!universitas) throw new Error('Data universitas tidak ditemukan');
        return universitas;
    },
});

export const getUniversitasList = queryField('getUniversitasList', {
    type: 'UniversitasList',
    description: 'Mengambil daftar universitas dengan paginasi dan filter opsional',
    args: {
        where: UniversitasWhereInput,
    },
    resolve: async (_, { where }, { prisma }) => {
        const { search, sortBy, descending, take = 10, skip = 0 } = where || {};

        const whereClause = search
            ? {
                OR: [
                    { kode_pt: { contains: search } },
                    { nama: { contains: search } },
                ],
                deleted_at: null,
            }
            : { deleted_at: null };

        const orderBy = sortBy ? { [sortBy]: descending ? 'desc' : 'asc' } : undefined;

        const [data, total] = await Promise.all([
            prisma.universitas.findMany({
                where: whereClause,
                orderBy,
                take,
                skip,
            }),
            prisma.universitas.count({ where: whereClause }),
        ]);

        return { data, total };
    },
}); 