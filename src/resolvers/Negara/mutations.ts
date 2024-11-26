import { intArg, mutationField, nonNull } from 'nexus';
import { Negara } from 'nexus-prisma';
import { NegaraCreateInput, NegaraUpdateInput } from './inputs';
import { Negara as NegaraModelFromPmb, fetch as qfetchFromPmb } from '../../datasources/pmb/query';

export const negaraCreate = mutationField('negaraCreate', {
    type: Negara.$name,
    description: 'Membuat data negara baru',
    args: {
        data: nonNull(NegaraCreateInput),
    },
    resolve: async (_, { data }, { prisma }) => {
        try {
            return await prisma.negara.create({
                data,
            });
        } catch (error) {
            throw new Error('Gagal membuat data negara: ' + error);
        }
    },
});

export const negaraUpdate = mutationField('negaraUpdate', {
    type: Negara.$name,
    description: 'Memperbarui data negara yang sudah ada',
    args: {
        id: nonNull(intArg()),
        data: nonNull(NegaraUpdateInput),
    },
    resolve: async (_, { id, data }, { prisma }) => {
        try {
            return await prisma.negara.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new Error('Gagal memperbarui data negara: ' + error);
        }
    },
});

export const negaraDelete = mutationField('negaraDelete', {
    type: Negara.$name,
    description: 'Menghapus data negara (soft delete)',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        try {
            return await prisma.negara.update({
                where: { id },
                data: {
                    deleted_at: new Date(),
                },
            });
        } catch (error) {
            throw new Error('Gagal menghapus data negara: ' + error);
        }
    },
});

export const negaraSyncFromPmb = mutationField('negaraSyncFromPmb', {
    type: 'Int',
    description: 'Mengsinkronkan data negara dari pmb',
    resolve: async (_, { id }, { prisma }) => {
        try {
            // 
            const response1 = await qfetchFromPmb<{ negaraGetList: { total: number } }>({ gqlQuery: 'negaraTotal' });
            const negaraTotal = response1.negaraGetList.total;
            const response2 = await qfetchFromPmb<{ negaraGetList: { data: NegaraModelFromPmb[] } }>({ gqlQuery: 'negaraList', params: { take: negaraTotal } });
            const negaraList = response2.negaraGetList.data;
            for (const negara of negaraList) {
                await prisma.negara.upsert({
                    where: { id: negara.id }, // Menggunakan ID dari API sebagai unique identifier
                    update: {
                        nama: negara.nama,
                        kode_negara: negara.country_code,
                        kode_telp: negara.tel_code,
                        status: negara.status === 1, // Ubah status (angka) ke Boolean
                    },
                    create: {
                        id: negara.id, // Harus sama dengan data dari API
                        nama: negara.nama,
                        kode_negara: negara.country_code,
                        kode_telp: negara.tel_code,
                        status: negara.status === 1,
                    },
                });
            }
            return prisma.negara.count();
        } catch (error) {
            throw new Error('Gagal sync data negara dari pmb: ' + error);
        }
    },
}); 