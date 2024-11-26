import { intArg, mutationField, nonNull } from 'nexus';
import { ProgramStudi } from 'nexus-prisma';
import { ProgramStudiCreateInput, ProgramStudiUpdateInput } from './inputs';
import { ProgramStudi as ProgramStudiModelFromPmb, fetch as qfetchFromPmb } from '../../datasources/pmb/query';

export const programStudiCreate = mutationField('programStudiCreate', {
    type: ProgramStudi.$name,
    description: 'Membuat data program studi baru',
    args: {
        data: nonNull(ProgramStudiCreateInput),
    },
    resolve: async (_, { data }, { prisma }) => {
        try {
            return await prisma.programStudi.create({
                data,
            });
        } catch (error) {
            throw new Error('Gagal membuat data program studi: ' + error);
        }
    },
});

export const programStudiUpdate = mutationField('programStudiUpdate', {
    type: ProgramStudi.$name,
    description: 'Memperbarui data program studi yang sudah ada',
    args: {
        id: nonNull(intArg()),
        data: nonNull(ProgramStudiUpdateInput),
    },
    resolve: async (_, { id, data }, { prisma }) => {
        try {
            return await prisma.programStudi.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new Error('Gagal memperbarui data program studi: ' + error);
        }
    },
});

export const programStudiDelete = mutationField('programStudiDelete', {
    type: ProgramStudi.$name,
    description: 'Menghapus data program studi',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        try {
            return await prisma.programStudi.delete({
                where: { id },
            });
        } catch (error) {
            throw new Error('Gagal menghapus data program studi: ' + error);
        }
    },
});

export const programStudiSyncFromPmb = mutationField('programStudiSyncFromPmb', {
    type: 'Int',
    description: 'Mengsinkronkan data programStudi dari pmb',
    resolve: async (_, { id }, { prisma }) => {
        try {
            // 
            const response1 = await qfetchFromPmb<{ programStudiGetList: { total: number } }>({ gqlQuery: 'programStudiTotal' });
            const programStudiTotal = response1.programStudiGetList.total;
            const response2 = await qfetchFromPmb<{ programStudiGetList: { data: ProgramStudiModelFromPmb[] } }>({ gqlQuery: 'programStudiList', params: { take: programStudiTotal } });
            const programStudiList = response2.programStudiGetList.data;
            for (const programStudi of programStudiList) {
                await prisma.programStudi.upsert({
                    where: { id: programStudi.id }, // Menggunakan ID dari API sebagai unique identifier
                    update: {
                        uuid: programStudi.uuid,
                        nama: programStudi.nama,
                        fakultas_id: programStudi.fakultas_id,
                        strata_id: programStudi.strata_id,
                        status: programStudi.status === 1, // Ubah status (angka) ke Boolean
                    },
                    create: {
                        id: programStudi.id, // Harus sama dengan data dari API
                        uuid: programStudi.uuid,
                        nama: programStudi.nama,
                        fakultas_id: programStudi.fakultas_id,
                        strata_id: programStudi.strata_id,
                        status: programStudi.status === 1, // Ubah status (angka) ke Boolean
                    },
                });
            }
            return prisma.programStudi.count();
        } catch (error) {
            throw new Error('Gagal sync data programStudi dari pmb: ' + error);
        }
    },
});