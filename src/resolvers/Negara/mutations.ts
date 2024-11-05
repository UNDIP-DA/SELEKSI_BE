import { intArg, mutationField, nonNull } from 'nexus';
import { Negara } from 'nexus-prisma';
import { NegaraCreateInput, NegaraUpdateInput } from './inputs';

export const createNegara = mutationField('createNegara', {
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

export const updateNegara = mutationField('updateNegara', {
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

export const deleteNegara = mutationField('deleteNegara', {
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