import { intArg, mutationField, nonNull } from 'nexus';
import { Kelurahan } from 'nexus-prisma';
import { KelurahanCreateInput, KelurahanUpdateInput } from './inputs';

export const createKelurahan = mutationField('createKelurahan', {
    type: Kelurahan.$name,
    description: 'Membuat data kelurahan baru',
    args: {
        data: nonNull(KelurahanCreateInput),
    },
    resolve: async (_, { data }, { prisma }) => {
        try {
            return await prisma.kelurahan.create({
                data,
            });
        } catch (error) {
            throw new Error('Gagal membuat data kelurahan: ' + error);
        }
    },
});

export const updateKelurahan = mutationField('updateKelurahan', {
    type: Kelurahan.$name,
    description: 'Memperbarui data kelurahan yang sudah ada',
    args: {
        id: nonNull(intArg()),
        data: nonNull(KelurahanUpdateInput),
    },
    resolve: async (_, { id, data }, { prisma }) => {
        try {
            return await prisma.kelurahan.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new Error('Gagal memperbarui data kelurahan: ' + error);
        }
    },
});

export const deleteKelurahan = mutationField('deleteKelurahan', {
    type: Kelurahan.$name,
    description: 'Menghapus data kelurahan (soft delete)',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        try {
            return await prisma.kelurahan.update({
                where: { id },
                data: {
                    deleted_at: new Date(),
                },
            });
        } catch (error) {
            throw new Error('Gagal menghapus data kelurahan: ' + error);
        }
    },
}); 