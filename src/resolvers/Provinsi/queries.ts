import { queryField, nonNull, intArg } from 'nexus';
import { Provinsi } from 'nexus-prisma';
import { ProvinsiWhereInput } from './inputs';

export const getProvinsi = queryField('getProvinsi', {
    type: Provinsi.$name,
    description: 'Mengambil satu data provinsi berdasarkan ID',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        const provinsi = await prisma.provinsi.findUnique({
            where: { id },
        });
        if (!provinsi) throw new Error('Data provinsi tidak ditemukan');
        return provinsi;
    },
});

export const getProvinsiList = queryField('getProvinsiList', {
    type: 'ProvinsiList',
    description: 'Mengambil daftar provinsi dengan paginasi dan filter opsional',
    args: {
        where: ProvinsiWhereInput,
    },
    resolve: async (_, { where }, { prisma }) => {
        const { search, negara_id, sortBy, descending, take = 10, skip = 0 } = where || {};

        const whereClause = {
            AND: [
                search ? {
                    OR: [
                        { kode_provinsi: { contains: search } },
                        { nama: { contains: search } },
                    ],
                } : {},
                negara_id ? { negara_id } : {},
                { deleted_at: null },
            ],
        };

        const orderBy = sortBy ? { [sortBy]: descending ? 'desc' : 'asc' } : undefined;

        const [data, total] = await Promise.all([
            prisma.provinsi.findMany({
                where: whereClause,
                orderBy,
                take,
                skip,
            }),
            prisma.provinsi.count({ where: whereClause }),
        ]);

        return { data, total };
    },
}); 