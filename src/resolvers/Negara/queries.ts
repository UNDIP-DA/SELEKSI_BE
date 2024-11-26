import { queryField, nonNull, intArg } from 'nexus';
import { Negara } from 'nexus-prisma';
import { NegaraWhereInput } from './inputs';

export const negaraGet = queryField('negaraGet', {
    type: Negara.$name,
    description: 'Mengambil satu data negara berdasarkan ID',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        const negara = await prisma.negara.findUnique({
            where: { id },
        });
        if (!negara) throw new Error('Data negara tidak ditemukan');
        return negara;
    },
});

export const negaraGetList = queryField('negaraGetList', {
    type: 'NegaraList',
    description: 'Mengambil daftar negara dengan paginasi dan filter opsional',
    args: {
        where: NegaraWhereInput,
    },
    resolve: async (_, { where }, { prisma }) => {
        const { search, sortBy, descending, take = 10, skip = 0 } = where || {};

        const whereClause = search
            ? {
                OR: [
                    { kode_negara: { contains: search } },
                    { nama: { contains: search } },
                ],
                deleted_at: null,
            }
            : { deleted_at: null };

        const orderBy = sortBy ? { [sortBy]: descending ? 'desc' : 'asc' } : undefined;

        const [data, total] = await Promise.all([
            prisma.negara.findMany({
                where: whereClause,
                orderBy,
                take,
                skip,
            }),
            prisma.negara.count({ where: whereClause }),
        ]);

        return { data, total };
    },
}); 