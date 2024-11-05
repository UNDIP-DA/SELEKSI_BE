import { intArg, mutationField, nonNull } from 'nexus';
import { Kecamatan } from 'nexus-prisma';
import { KecamatanCreateInput, KecamatanUpdateInput } from './inputs';

export const createKecamatan = mutationField('createKecamatan', {
    type: Kecamatan.$name,
    description: 'Membuat data kecamatan baru',
    args: {
        data: nonNull(KecamatanCreateInput),
    },
    resolve: async (_, { data }, { prisma }) => {
        try {
            return await prisma.kecamatan.create({
                data,
            });
        } catch (error) {
            throw new Error('Gagal membuat data kecamatan: ' + error);
        }
    },
});

export const updateKecamatan = mutationField('updateKecamatan', {
    type: Kecamatan.$name,
    description: 'Memperbarui data kecamatan yang sudah ada',
    args: {
        id: nonNull(intArg()),
        data: nonNull(KecamatanUpdateInput),
    },
    resolve: async (_, { id, data }, { prisma }) => {
        try {
            return await prisma.kecamatan.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new Error('Gagal memperbarui data kecamatan: ' + error);
        }
    },
});

export const deleteKecamatan = mutationField('deleteKecamatan', {
    type: Kecamatan.$name,
    description: 'Menghapus data kecamatan (soft delete)',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        try {
            return await prisma.kecamatan.update({
                where: { id },
                data: {
                    deleted_at: new Date(),
                },
            });
        } catch (error) {
            throw new Error('Gagal menghapus data kecamatan: ' + error);
        }
    },
}); 