import { intArg, mutationField, nonNull } from 'nexus';
import { Jalur } from 'nexus-prisma';
import { JalurCreateInput, JalurUpdateInput } from './inputs';

export const createJalur = mutationField('createJalur', {
    type: Jalur.$name,
    description: 'Membuat data jalur baru',
    args: {
        data: nonNull(JalurCreateInput),
    },
    resolve: async (_, { data }, { prisma }) => {
        try {
            return await prisma.jalur.create({
                data,
            });
        } catch (error) {
            throw new Error('Gagal membuat data jalur: ' + error);
        }
    },
});

export const updateJalur = mutationField('updateJalur', {
    type: Jalur.$name,
    description: 'Memperbarui data jalur yang sudah ada',
    args: {
        id: nonNull(intArg()),
        data: nonNull(JalurUpdateInput),
    },
    resolve: async (_, { id, data }, { prisma }) => {
        try {
            return await prisma.jalur.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new Error('Gagal memperbarui data jalur: ' + error);
        }
    },
});

export const deleteJalur = mutationField('deleteJalur', {
    type: Jalur.$name,
    description: 'Menghapus data jalur',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        try {
            return await prisma.jalur.delete({
                where: { id },
            });
        } catch (error) {
            throw new Error('Gagal menghapus data jalur: ' + error);
        }
    },
}); 