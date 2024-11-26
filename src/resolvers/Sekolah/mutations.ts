import { intArg, mutationField, nonNull } from 'nexus';
import { Sekolah } from 'nexus-prisma';
import { SekolahCreateInput, SekolahUpdateInput } from './inputs';
import { Sekolah as SekolahModelFromPmb, fetch as qfetchFromPmb } from '../../datasources/pmb/query';
import { timeStamp } from 'console';

export const sekolahCreate = mutationField('sekolahCreate', {
    type: Sekolah.$name,
    description: 'Membuat data sekolah baru',
    args: {
        data: nonNull(SekolahCreateInput),
    },
    resolve: async (_, { data }, { prisma }) => {
        try {
            return await prisma.sekolah.create({
                data,
            });
        } catch (error) {
            throw new Error('Gagal membuat data sekolah: ' + error);
        }
    },
});

export const sekolahUpdate = mutationField('sekolahUpdate', {
    type: Sekolah.$name,
    description: 'Memperbarui data sekolah yang sudah ada',
    args: {
        id: nonNull(intArg()),
        data: nonNull(SekolahUpdateInput),
    },
    resolve: async (_, { id, data }, { prisma }) => {
        try {
            return await prisma.sekolah.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new Error('Gagal memperbarui data sekolah: ' + error);
        }
    },
});

export const sekolahDelete = mutationField('sekolahDelete', {
    type: Sekolah.$name,
    description: 'Menghapus data sekolah (soft delete)',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        try {
            return await prisma.sekolah.update({
                where: { id },
                data: {
                    deleted_at: new Date(),
                },
            });
        } catch (error) {
            throw new Error('Gagal menghapus data sekolah: ' + error);
        }
    },
});

export const sekolahSyncFromPmb = mutationField('sekolahSyncFromPmb', {
    type: 'Int',
    description: 'Mengsinkronkan data sekolah dari pmb',
    resolve: async (_, { id }, { prisma }) => {
        try {
            // 
            const response1 = await qfetchFromPmb<{ sekolahGetList: { total: number } }>({ gqlQuery: 'sekolahTotal' });
            const sekolahTotal = response1.sekolahGetList.total;
            const response2 = await qfetchFromPmb<{ sekolahGetList: { data: SekolahModelFromPmb[] } }>({ gqlQuery: 'sekolahList', params: { take: sekolahTotal } });
            const sekolahList = response2.sekolahGetList.data;
            for (const sekolah of sekolahList) {
                await prisma.sekolah.upsert({
                    where: { id: sekolah.id }, // Menggunakan ID dari API sebagai unique identifier
                    update: {
                        kode_sekolah: sekolah.kode_sekolah,
                        nama_sekolah: sekolah.nama_sekolah,
                        alamat: sekolah.alamat,
                        kelurahan: sekolah.kelurahan,
                        wilayah_id: sekolah.Wilayah?.id,
                        akreditasi: sekolah.akreditasi,
                        status: sekolah.status === 1,
                        tipe: sekolah.tipe,
                    },
                    create: {
                        id: sekolah.id, // Harus sama dengan data dari API
                        kode_sekolah: sekolah.kode_sekolah,
                        nama_sekolah: sekolah.nama_sekolah,
                        alamat: sekolah.alamat,
                        kelurahan: sekolah.kelurahan,
                        wilayah_id: sekolah.Wilayah?.id,
                        akreditasi: sekolah.akreditasi,
                        status: sekolah.status === 1,
                        tipe: sekolah.tipe,
                    },
                });
            }
            return prisma.sekolah.count();
        } catch (error) {
            throw new Error('Gagal sync data sekolah dari pmb: ' + error);
        }
    },
});