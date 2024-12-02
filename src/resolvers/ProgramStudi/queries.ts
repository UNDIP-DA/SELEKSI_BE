import { queryField, nonNull, intArg } from 'nexus';
import { ProgramStudi } from 'nexus-prisma';
import { ProgramStudiWhereInput } from './inputs';

export const programStudiGet = queryField('programStudiGet', {
    type: ProgramStudi.$name,
    description: 'Mengambil satu data program studi berdasarkan ID',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        const programStudi = await prisma.programStudi.findUnique({
            where: { id },
        });
        if (!programStudi) throw new Error('Data program studi tidak ditemukan');
        return programStudi;
    },
});

export const programStudiGetList = queryField('programStudiGetList', {
    type: 'ProgramStudiList',
    description: 'Mengambil daftar program studi dengan paginasi dan filter opsional',
    args: {
        where: ProgramStudiWhereInput,
    },
    resolve: async (_, { where }, { prisma }) => {
        const { search, kode_pmb, kode_regonline, fakultas_id, strata_id, status, sortBy, descending, take = 10, skip = 0 } = where || {};

        const whereClause = {
            AND: [
                search ? {
                    nama: { contains: search },
                } : {},
                kode_pmb ? { kode_pmb } : {},
                kode_regonline ? { kode_regonline } : {},
                fakultas_id ? { fakultas_id } : {},
                strata_id ? { strata_id } : {},
                status != null ? { status } : {},
            ],
        };

        const orderBy = sortBy ? { [sortBy]: descending ? 'desc' : 'asc' } : undefined;

        const [data, total] = await Promise.all([
            prisma.programStudi.findMany({
                where: whereClause,
                orderBy,
                take,
                skip,
            }),
            prisma.programStudi.count({ where: whereClause }),
        ]);

        return { data, total };
    },
}); 