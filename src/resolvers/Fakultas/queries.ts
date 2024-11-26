import { queryField, nonNull, intArg } from 'nexus';
import { Fakultas } from 'nexus-prisma';
import { FakultasWhereInput } from './inputs';

export const fakultasGet = queryField('fakultasGet', {
    type: Fakultas.$name,
    description: 'Mengambil satu data fakultas berdasarkan ID',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        const fakultas = await prisma.fakultas.findUnique({
            where: { id },
        });
        if (!fakultas) throw new Error('Data fakultas tidak ditemukan');
        return fakultas;
    },
});

export const fakultasGetList = queryField('fakultasGetList', {
    type: 'FakultasList',
    description: 'Mengambil daftar fakultas dengan paginasi dan filter opsional',
    args: {
        where: FakultasWhereInput,
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
            prisma.fakultas.findMany({
                where: whereClause,
                orderBy,
                take,
                skip,
            }),
            prisma.fakultas.count({ where: whereClause }),
        ]);

        return { data, total };
    },
}); 