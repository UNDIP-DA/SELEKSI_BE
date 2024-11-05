import { intArg, mutationField, nonNull } from 'nexus';
import { Fakultas } from 'nexus-prisma';
import { FakultasCreateInput, FakultasUpdateInput } from './inputs';

export const createFakultas = mutationField('createFakultas', {
    type: Fakultas.$name,
    description: 'Membuat data fakultas baru',
    args: {
        data: nonNull(FakultasCreateInput),
    },
    resolve: async (_, { data }, { prisma }) => {
        try {
            return await prisma.fakultas.create({
                data,
            });
        } catch (error) {
            throw new Error('Gagal membuat data fakultas: ' + error);
        }
    },
});

export const updateFakultas = mutationField('updateFakultas', {
    type: Fakultas.$name,
    description: 'Memperbarui data fakultas yang sudah ada',
    args: {
        id: nonNull(intArg()),
        data: nonNull(FakultasUpdateInput),
    },
    resolve: async (_, { id, data }, { prisma }) => {
        try {
            return await prisma.fakultas.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new Error('Gagal memperbarui data fakultas: ' + error);
        }
    },
});

export const deleteFakultas = mutationField('deleteFakultas', {
    type: Fakultas.$name,
    description: 'Menghapus data fakultas',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        try {
            return await prisma.fakultas.delete({
                where: { id },
            });
        } catch (error) {
            throw new Error('Gagal menghapus data fakultas: ' + error);
        }
    },
}); 