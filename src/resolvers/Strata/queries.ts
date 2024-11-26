import { queryField, nonNull, intArg } from 'nexus';
import { Strata } from 'nexus-prisma';
import { StrataWhereInput } from './inputs';

export const strataGet = queryField('strataGet', {
    type: Strata.$name,
    description: 'Mengambil satu data strata berdasarkan ID',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        const strata = await prisma.strata.findUnique({
            where: { id },
        });
        if (!strata) throw new Error('Data strata tidak ditemukan');
        return strata;
    },
});

export const strataGetList = queryField('strataGetList', {
    type: 'StrataList',
    description: 'Mengambil daftar strata dengan paginasi dan filter opsional',
    args: {
        where: StrataWhereInput,
    },
    resolve: async (_, { where }, { prisma }) => {
        const { search, sortBy, descending, take = 10, skip = 0 } = where || {};

        const whereClause = {
            AND: [
                search ? {
                    nama: { contains: search },
                } : {},
            ],
        };

        const orderBy = sortBy ? { [sortBy]: descending ? 'desc' : 'asc' } : undefined;

        const [data, total] = await Promise.all([
            prisma.strata.findMany({
                where: whereClause,
                orderBy,
                take,
                skip,
            }),
            prisma.strata.count({ where: whereClause }),
        ]);

        return { data, total };
    },
}); 