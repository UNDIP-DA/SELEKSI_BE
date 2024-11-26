import { intArg, mutationField, nonNull } from 'nexus';
import { Sekolah } from 'nexus-prisma';
import { SekolahCreateInput, SekolahUpdateInput } from './inputs';

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