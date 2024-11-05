import { queryField, nonNull, intArg } from 'nexus';
import { Agama } from 'nexus-prisma';
import { AgamaWhereInput } from './inputs';

export const getAgama = queryField('getAgama', {
    type: Agama.$name,
    description: 'Mengambil satu data agama berdasarkan ID',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        const agama = await prisma.agama.findUnique({
            where: { id },
        });
        if (!agama) throw new Error('Data agama tidak ditemukan');
        return agama;
    },
});

export const getAgamaList = queryField('getAgamaList', {
    type: 'AgamaList',
    description: 'Mengambil daftar agama dengan paginasi dan filter opsional',
    args: {
        where: AgamaWhereInput,
    },
    resolve: async (_, { where }, { prisma }) => {
        const { search, sortBy, descending, take = 10, skip = 0 } = where || {};

        const whereClause = {
            AND: [
                search ? {
                    nama: { contains: search },
                } : {},
                { deleted_at: null },
            ],
        };

        const orderBy = sortBy ? { [sortBy]: descending ? 'desc' : 'asc' } : undefined;

        const [data, total] = await Promise.all([
            prisma.agama.findMany({
                where: whereClause,
                orderBy,
                take,
                skip,
            }),
            prisma.agama.count({ where: whereClause }),
        ]);

        return { data, total };
    },
}); 