import { queryField, nonNull, intArg } from 'nexus';
import { PenerimaanJalur } from 'nexus-prisma';
import { PenerimaanJalurWhereInput } from './inputs';

export const getPenerimaanJalur = queryField('getPenerimaanJalur', {
    type: PenerimaanJalur.$name,
    description: 'Mengambil satu data relasi penerimaan-jalur berdasarkan ID',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        const penerimaanJalur = await prisma.penerimaanJalur.findUnique({
            where: { id },
        });
        if (!penerimaanJalur) throw new Error('Data relasi penerimaan-jalur tidak ditemukan');
        return penerimaanJalur;
    },
});

export const getPenerimaanJalurList = queryField('getPenerimaanJalurList', {
    type: 'PenerimaanJalurList',
    description: 'Mengambil daftar relasi penerimaan-jalur dengan paginasi dan filter opsional',
    args: {
        where: PenerimaanJalurWhereInput,
    },
    resolve: async (_, { where }, { prisma }) => {
        const { penerimaan_id, jalur_id, sortBy, descending, take = 10, skip = 0 } = where || {};

        const whereClause = {
            AND: [
                penerimaan_id ? { penerimaan_id } : {},
                jalur_id ? { jalur_id } : {},
            ],
        };

        const orderBy = sortBy ? { [sortBy]: descending ? 'desc' : 'asc' } : undefined;

        const [data, total] = await Promise.all([
            prisma.penerimaanJalur.findMany({
                where: whereClause,
                orderBy,
                take,
                skip,
            }),
            prisma.penerimaanJalur.count({ where: whereClause }),
        ]);

        return { data, total };
    },
}); 