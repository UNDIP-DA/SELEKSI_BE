import { intArg, mutationField, nonNull } from 'nexus';
import { Jalur } from 'nexus-prisma';
import { JalurCreateInput, JalurUpdateInput } from './inputs';
import { Jalur as JalurModelFromPmb, fetch as qfetchFromPmb } from '../../datasources/pmb/query';

export const jalurCreate = mutationField('jalurCreate', {
    type: Jalur.$name,
    description: 'Membuat data jalur baru',
    args: {
        data: nonNull(JalurCreateInput),
    },
    resolve: async (_, { data }, { prisma }) => {
        try {
            return await prisma.jalur.create({
                data,
            });
        } catch (error) {
            throw new Error('Gagal membuat data jalur: ' + error);
        }
    },
});

export const jalurUpdate = mutationField('jalurUpdate', {
    type: Jalur.$name,
    description: 'Memperbarui data jalur yang sudah ada',
    args: {
        id: nonNull(intArg()),
        data: nonNull(JalurUpdateInput),
    },
    resolve: async (_, { id, data }, { prisma }) => {
        try {
            return await prisma.jalur.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new Error('Gagal memperbarui data jalur: ' + error);
        }
    },
});

export const jalurDelete = mutationField('jalurDelete', {
    type: Jalur.$name,
    description: 'Menghapus data jalur',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        try {
            return await prisma.jalur.delete({
                where: { id },
            });
        } catch (error) {
            throw new Error('Gagal menghapus data jalur: ' + error);
        }
    },
});

export const jalurSyncFromPmb = mutationField('jalurSyncFromPmb', {
    type: 'Int',
    description: 'Mengsinkronkan data jalur dari pmb',
    resolve: async (_, { id }, { prisma }) => {
        try {
            // 
            const response1 = await qfetchFromPmb<{ jalurGetList: { total: number } }>({ gqlQuery: 'jalurTotal' });
            const jalurTotal = response1.jalurGetList.total;
            const response2 = await qfetchFromPmb<{ jalurGetList: { data: JalurModelFromPmb[] } }>({ gqlQuery: 'jalurList', params: { take: jalurTotal } });
            const jalurList = response2.jalurGetList.data;
            for (const jalur of jalurList) {
                await prisma.jalur.upsert({
                    where: { id: jalur.id }, // Menggunakan ID dari API sebagai unique identifier
                    update: {
                        kode_jalur: jalur.kode_jalur,
                        nama_jalur: jalur.nama_jalur,
                        strata_id: jalur.strata_id,
                    },
                    create: {
                        id: jalur.id, // Harus sama dengan data dari API
                        kode_jalur: jalur.kode_jalur,
                        nama_jalur: jalur.nama_jalur,
                        strata_id: jalur.strata_id,
                    },
                });
            }
            return prisma.jalur.count();
        } catch (error) {
            throw new Error('Gagal sync data jalur dari pmb: ' + error);
        }
    },
});