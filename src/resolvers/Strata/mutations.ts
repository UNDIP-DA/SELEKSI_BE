import { intArg, mutationField, nonNull } from 'nexus';
import { Strata } from 'nexus-prisma';
import { StrataCreateInput, StrataUpdateInput } from './inputs';
import { Strata as StrataModelFromPmb, fetch as qfetchFromPmb } from '../../datasources/pmb/query';

export const strataCreate = mutationField('strataCreate', {
    type: Strata.$name,
    description: 'Membuat data strata baru',
    args: {
        data: nonNull(StrataCreateInput),
    },
    resolve: async (_, { data }, { prisma }) => {
        try {
            return await prisma.strata.create({
                data,
            });
        } catch (error) {
            throw new Error('Gagal membuat data strata: ' + error);
        }
    },
});

export const strataUpdate = mutationField('strataUpdate', {
    type: Strata.$name,
    description: 'Memperbarui data strata yang sudah ada',
    args: {
        id: nonNull(intArg()),
        data: nonNull(StrataUpdateInput),
    },
    resolve: async (_, { id, data }, { prisma }) => {
        try {
            return await prisma.strata.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new Error('Gagal memperbarui data strata: ' + error);
        }
    },
});

export const strataDelete = mutationField('strataDelete', {
    type: Strata.$name,
    description: 'Menghapus data strata',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        try {
            return await prisma.strata.delete({
                where: { id },
            });
        } catch (error) {
            throw new Error('Gagal menghapus data strata: ' + error);
        }
    },
});

export const strataSyncFromPmb = mutationField('strataSyncFromPmb', {
    type: 'Int',
    description: 'Mengsinkronkan data strata dari pmb',
    resolve: async (_, { id }, { prisma }) => {
        try {
            // 
            const response1 = await qfetchFromPmb<{ strataGetList: { total: number } }>({ gqlQuery: 'strataTotal' });
            const strataTotal = response1.strataGetList.total;
            const response2 = await qfetchFromPmb<{ strataGetList: { data: StrataModelFromPmb[] } }>({ gqlQuery: 'strataList', params: { take: strataTotal } });
            const strataList = response2.strataGetList.data;
            for (const strata of strataList) {
                await prisma.strata.upsert({
                    where: { id: strata.id }, // Menggunakan ID dari API sebagai unique identifier
                    update: {
                        nama: strata.strata,
                        keterangan: strata.keterangan,
                    },
                    create: {
                        id: strata.id, // Harus sama dengan data dari API
                        nama: strata.strata,
                        keterangan: strata.keterangan,
                    },
                });
            }
            return prisma.strata.count();
        } catch (error) {
            throw new Error('Gagal sync data strata dari pmb: ' + error);
        }
    },
}); 