import { intArg, mutationField, nonNull } from 'nexus';
import { Fakultas } from 'nexus-prisma';
import { FakultasCreateInput, FakultasUpdateInput } from './inputs';
import { Fakultas as FakultasModelFromPmb, fetch as qfetchFromPmb } from '../../datasources/pmb/query';

export const fakultasCreate = mutationField('fakultasCreate', {
    type: Fakultas.$name,
    description: 'Membuat data fakultas baru',
    args: {
        data: nonNull(FakultasCreateInput),
    },
    resolve: async (_, { data }, { prisma }) => {
        try {
            return await prisma.fakultas.create({
                data,
            });
        } catch (error) {
            throw new Error('Gagal membuat data fakultas: ' + error);
        }
    },
});

export const fakultasUpdate = mutationField('fakultasUpdate', {
    type: Fakultas.$name,
    description: 'Memperbarui data fakultas yang sudah ada',
    args: {
        id: nonNull(intArg()),
        data: nonNull(FakultasUpdateInput),
    },
    resolve: async (_, { id, data }, { prisma }) => {
        try {
            return await prisma.fakultas.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new Error('Gagal memperbarui data fakultas: ' + error);
        }
    },
});

export const fakultasDelete = mutationField('fakultasDelete', {
    type: Fakultas.$name,
    description: 'Menghapus data fakultas',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        try {
            return await prisma.fakultas.delete({
                where: { id },
            });
        } catch (error) {
            throw new Error('Gagal menghapus data fakultas: ' + error);
        }
    },
});

export const fakultasSyncFromPmb = mutationField('fakultasSyncFromPmb', {
    type: 'Int',
    description: 'Mengsinkronkan data fakultas dari pmb',
    resolve: async (_, { id }, { prisma }) => {
        try {
            // 
            const response1 = await qfetchFromPmb<{ fakultasGetList: { total: number } }>({ gqlQuery: 'fakultasTotal' });
            const fakultasTotal = response1.fakultasGetList.total;
            const response2 = await qfetchFromPmb<{ fakultasGetList: { data: FakultasModelFromPmb[] } }>({ gqlQuery: 'fakultasList', params: { take: fakultasTotal } });
            const fakultasList = response2.fakultasGetList.data;
            for (const fakultas of fakultasList) {
                await prisma.fakultas.upsert({
                    where: { id: fakultas.id }, // Menggunakan ID dari API sebagai unique identifier
                    update: {
                        nama: fakultas.nama,
                    },
                    create: {
                        id: fakultas.id, // Harus sama dengan data dari API
                        nama: fakultas.nama,
                    },
                });
            }
            return prisma.fakultas.count();
        } catch (error) {
            throw new Error('Gagal sync data fakultas dari pmb: ' + error);
        }
    },
}); 