import { queryField, nonNull, intArg } from 'nexus';
import { Mahasiswa } from 'nexus-prisma';
import { MahasiswaWhereInput } from './inputs';

export const getMahasiswa = queryField('getMahasiswa', {
    type: Mahasiswa.$name,
    description: 'Mengambil satu data mahasiswa berdasarkan ID',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        const mahasiswa = await prisma.mahasiswa.findUnique({
            where: { id },
        });
        if (!mahasiswa) throw new Error('Data mahasiswa tidak ditemukan');
        return mahasiswa;
    },
});

export const getMahasiswaList = queryField('getMahasiswaList', {
    type: 'MahasiswaList',
    description: 'Mengambil daftar mahasiswa dengan paginasi dan filter opsional',
    args: {
        where: MahasiswaWhereInput,
    },
    resolve: async (_, { where }, { prisma }) => {
        const { search, programStudi_id, penerimaan_id, jalur_id, sortBy, descending, take = 10, skip = 0 } = where || {};

        const whereClause = {
            AND: [
                search ? {
                    OR: [
                        { nama: { contains: search } },
                        { nomor_peserta: { contains: search } },
                    ],
                } : {},
                programStudi_id ? { programStudi_id } : {},
                penerimaan_id ? { penerimaan_id } : {},
                jalur_id ? { jalur_id } : {},
            ],
        };

        const orderBy = sortBy ? { [sortBy]: descending ? 'desc' : 'asc' } : undefined;

        const [data, total] = await Promise.all([
            prisma.mahasiswa.findMany({
                where: whereClause,
                orderBy,
                take,
                skip,
            }),
            prisma.mahasiswa.count({ where: whereClause }),
        ]);

        return { data, total };
    },
}); 