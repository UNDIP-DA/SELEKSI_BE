import { mutationField, nonNull, intArg } from 'nexus'
import { Wilayah } from 'nexus-prisma'
import { WilayahCreateInput, WilayahUpdateInput } from './inputs'
import { Wilayah as WilayahModelFromPmb, fetch as qfetchFromPmb } from '../../datasources/pmb/query';

export const wilayahCreate = mutationField('wilayahCreate', {
    type: Wilayah.$name,
    description: 'Membuat data wilayah baru',
    args: {
        data: nonNull(WilayahCreateInput),
    },
    resolve: async (_, { data }, { prisma }) => {
        try {
            return await prisma.wilayah.create({
                data,
            })
        } catch (error) {
            throw new Error('Gagal membuat wilayah: ' + error)
        }
    },
})

export const wilayahUpdate = mutationField('wilayahUpdate', {
    type: Wilayah.$name,
    description: 'Memperbarui data wilayah yang sudah ada',
    args: {
        id: nonNull(intArg()),
        data: nonNull(WilayahUpdateInput),
    },
    resolve: async (_, { id, data }, { prisma }) => {
        try {
            return await prisma.wilayah.update({
                where: { id },
                data,
            })
        } catch (error) {
            throw new Error('Gagal memperbarui wilayah: ' + error)
        }
    },
})

export const wilayahDelete = mutationField('wilayahDelete', {
    type: Wilayah.$name,
    description: 'Menghapus data wilayah (soft delete)',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        try {
            return await prisma.wilayah.update({
                where: { id },
                data: {
                    deleted_at: new Date(),
                },
            })
        } catch (error) {
            throw new Error('Gagal menghapus wilayah: ' + error)
        }
    },
})

export const wilayahRestore = mutationField('wilayahRestore', {
    type: Wilayah.$name,
    description: 'Memulihkan data wilayah yang telah dihapus',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        try {
            return await prisma.wilayah.update({
                where: { id },
                data: {
                    deleted_at: null,
                },
            })
        } catch (error) {
            throw new Error('Gagal memulihkan wilayah: ' + error)
        }
    },
})

export const wilayahSyncFromPmb = mutationField('wilayahSyncFromPmb', {
    type: 'Int',
    description: 'Mengsinkronkan data negara dari pmb',
    resolve: async (_, { id }, { prisma }) => {
        try {
            // 
            const tingkat_wilayah_list = [
                { name: 'provinsi', key: 1 },
                { name: 'kotakab', key: 2 },
                { name: 'kecamatan', key: 3 },
            ];
            for (const tingkat_wilayah of tingkat_wilayah_list) {
                const response1 = await qfetchFromPmb<{ wilayahGetByLevel: { total: number } }>({ gqlQuery: 'wilayahTotal', params: { level: tingkat_wilayah.key } });
                const wilayahTotal = response1.wilayahGetByLevel.total;
                const response2 = await qfetchFromPmb<{ wilayahGetByLevel: { data: WilayahModelFromPmb[] } }>({ gqlQuery: 'wilayahList', params: { level: tingkat_wilayah.key, take: wilayahTotal } });
                const wilayahList = response2.wilayahGetByLevel.data;
                for (const wilayah of wilayahList) {
                    let wilayahExist = null;
                    if (wilayah.parent_kode) {
                        wilayahExist = await prisma.wilayah.findUnique({ where: { kode_wilayah: wilayah.parent_kode } });
                    }
                    await prisma.wilayah.upsert({
                        where: { id: wilayah.id }, // Menggunakan ID dari API sebagai unique identifier
                        update: {
                            nama: wilayah.nama,
                            kode_wilayah: wilayah.kode,
                            tingkat: tingkat_wilayah.name,
                            negara_id: wilayah.ref_negara_id,
                            parent_id: wilayahExist?.id ?? null,
                        },
                        create: {
                            id: wilayah.id, // Harus sama dengan data dari API
                            nama: wilayah.nama,
                            kode_wilayah: wilayah.kode,
                            tingkat: tingkat_wilayah.name,
                            negara_id: wilayah.ref_negara_id,
                            parent_id: wilayahExist?.id ?? null,
                        },
                    });
                }
            }
            return prisma.wilayah.count();
        } catch (error) {
            throw new Error('Gagal sync data negara dari pmb: ' + error);
        }
    },
})