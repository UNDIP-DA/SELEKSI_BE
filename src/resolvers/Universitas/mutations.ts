import { intArg, mutationField, nonNull } from 'nexus';
import { Universitas } from 'nexus-prisma';
import { UniversitasCreateInput, UniversitasUpdateInput } from './inputs';
import { Universitas as UniversitasModelFromPmb, fetch as qfetchFromPmb } from '../../datasources/pmb/query';

export const universitasCreate = mutationField('universitasCreate', {
    type: Universitas.$name,
    description: 'Membuat data universitas baru',
    args: {
        data: nonNull(UniversitasCreateInput),
    },
    resolve: async (_, { data }, { prisma }) => {
        try {
            return await prisma.universitas.create({
                data,
            });
        } catch (error) {
            throw new Error('Gagal membuat data universitas: ' + error);
        }
    },
});

export const universitasUpdate = mutationField('universitasUpdate', {
    type: Universitas.$name,
    description: 'Memperbarui data universitas yang sudah ada',
    args: {
        id: nonNull(intArg()),
        data: nonNull(UniversitasUpdateInput),
    },
    resolve: async (_, { id, data }, { prisma }) => {
        try {
            return await prisma.universitas.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new Error('Gagal memperbarui data universitas: ' + error);
        }
    },
});

export const universitasDelete = mutationField('universitasDelete', {
    type: Universitas.$name,
    description: 'Menghapus data universitas (soft delete)',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        try {
            return await prisma.universitas.update({
                where: { id },
                data: {
                    deleted_at: new Date(),
                },
            });
        } catch (error) {
            throw new Error('Gagal menghapus data universitas: ' + error);
        }
    },
});

export const universitasSyncFromPmb = mutationField('universitasSyncFromPmb', {
    type: 'Int',
    description: 'Mengsinkronkan data universitas dari pmb',
    resolve: async (_, { id }, { prisma }) => {
        try {
            // 
            const response1 = await qfetchFromPmb<{ universitasGetList: { total: number } }>({ gqlQuery: 'universitasTotal' });
            const universitasTotal = response1.universitasGetList.total;
            const response2 = await qfetchFromPmb<{ universitasGetList: { data: UniversitasModelFromPmb[] } }>({ gqlQuery: 'universitasList', params: { take: universitasTotal } });
            const universitasList = response2.universitasGetList.data;
            for (const universitas of universitasList) {
                await prisma.universitas.upsert({
                    where: { id: universitas.id }, // Menggunakan ID dari API sebagai unique identifier
                    update: {
                        uuid: universitas.id_pt,
                        kode_pt: universitas.kode_pt,
                        nama: universitas.nama,
                        wilayah_id: universitas.Wilayah?.id ?? null,
                        status: universitas.status === 1,
                    },
                    create: {
                        id: universitas.id, // Harus sama dengan data dari API
                        uuid: universitas.id_pt,
                        kode_pt: universitas.kode_pt,
                        nama: universitas.nama,
                        wilayah_id: universitas.Wilayah?.id ?? null,
                        status: universitas.status === 1,
                    },
                });
            }
            return prisma.universitas.count();
        } catch (error) {
            throw new Error('Gagal sync data universitas dari pmb: ' + error);
        }
    },
});