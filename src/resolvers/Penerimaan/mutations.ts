import { intArg, mutationField, nonNull } from 'nexus';
import { Penerimaan } from 'nexus-prisma';
import { PenerimaanCreateInput, PenerimaanUpdateInput } from './inputs';

export const createPenerimaan = mutationField('createPenerimaan', {
    type: Penerimaan.$name,
    description: 'Membuat data penerimaan baru',
    args: {
        data: nonNull(PenerimaanCreateInput),
    },
    resolve: async (_, { data }, { prisma }) => {
        try {
            return await prisma.penerimaan.create({
                data
            });
        } catch (error) {
            throw new Error('Gagal membuat data penerimaan: ' + error);
        }
    },
});

export const updatePenerimaan = mutationField('updatePenerimaan', {
    type: Penerimaan.$name,
    description: 'Memperbarui data penerimaan yang sudah ada',
    args: {
        id: nonNull(intArg()),
        data: nonNull(PenerimaanUpdateInput),
    },
    resolve: async (_, { id, data }, { prisma }) => {
        try {
            return await prisma.penerimaan.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new Error('Gagal memperbarui data penerimaan: ' + error);
        }
    },
});

export const deletePenerimaan = mutationField('deletePenerimaan', {
    type: Penerimaan.$name,
    description: 'Menghapus data penerimaan',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        try {
            return await prisma.penerimaan.delete({
                where: { id },
            });
        } catch (error) {
            throw new Error('Gagal menghapus data penerimaan: ' + error);
        }
    },
}); 