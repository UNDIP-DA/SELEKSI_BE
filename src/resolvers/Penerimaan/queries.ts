import { queryField, nonNull, intArg } from 'nexus';
import { Penerimaan } from 'nexus-prisma';
import { PenerimaanWhereInput } from './inputs';

export const penerimaanGet = queryField('penerimaanGet', {
    type: Penerimaan.$name,
    description: 'Mengambil satu data penerimaan berdasarkan ID',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        const penerimaan = await prisma.penerimaan.findUnique({
            where: { id },
        });
        if (!penerimaan) throw new Error('Data penerimaan tidak ditemukan');
        return penerimaan;
    },
});

export const penerimaanGetList = queryField('penerimaanGetList', {
    type: 'PenerimaanList',
    description: 'Mengambil daftar penerimaan dengan paginasi dan filter opsional',
    args: {
        where: PenerimaanWhereInput,
    },
    resolve: async (_, { where }, { prisma }) => {
        const { search, tahap, status, sortBy, descending, take = 10, skip = 0 } = where || {};

        const whereClause = {
            AND: [
                search ? {
                    OR: [
                        { nama: { contains: search } },
                        { keterangan: { contains: search } },
                    ],
                } : {},
                tahap ? { tahap } : {},
                status !== undefined ? { status } : {},
            ],
        };

        const orderBy = sortBy ? { [sortBy]: descending ? 'desc' : 'asc' } : undefined;

        const [data, total] = await Promise.all([
            prisma.penerimaan.findMany({
                where: whereClause,
                orderBy,
                take,
                skip,
            }),
            prisma.penerimaan.count({ where: whereClause }),
        ]);

        return { data, total };
    },
}); 