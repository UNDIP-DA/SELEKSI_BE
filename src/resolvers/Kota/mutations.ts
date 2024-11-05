import { intArg, mutationField, nonNull } from 'nexus';
import { Kota } from 'nexus-prisma';
import { KotaCreateInput, KotaUpdateInput } from './inputs';

export const createKota = mutationField('createKota', {
    type: Kota.$name,
    description: 'Membuat data kota/kabupaten baru',
    args: {
        data: nonNull(KotaCreateInput),
    },
    resolve: async (_, { data }, { prisma }) => {
        try {
            return await prisma.kota.create({
                data,
            });
        } catch (error) {
            throw new Error('Gagal membuat data kota/kabupaten: ' + error);
        }
    },
});

export const updateKota = mutationField('updateKota', {
    type: Kota.$name,
    description: 'Memperbarui data kota/kabupaten yang sudah ada',
    args: {
        id: nonNull(intArg()),
        data: nonNull(KotaUpdateInput),
    },
    resolve: async (_, { id, data }, { prisma }) => {
        try {
            return await prisma.kota.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new Error('Gagal memperbarui data kota/kabupaten: ' + error);
        }
    },
});

export const deleteKota = mutationField('deleteKota', {
    type: Kota.$name,
    description: 'Menghapus data kota/kabupaten (soft delete)',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        try {
            return await prisma.kota.update({
                where: { id },
                data: {
                    deleted_at: new Date(),
                },
            });
        } catch (error) {
            throw new Error('Gagal menghapus data kota/kabupaten: ' + error);
        }
    },
}); 