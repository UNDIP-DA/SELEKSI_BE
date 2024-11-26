import { intArg, mutationField, nonNull } from 'nexus';
import { Agama } from 'nexus-prisma';
import { AgamaCreateInput, AgamaUpdateInput } from './inputs';

export const agamaCreate = mutationField('agamaCreate', {
    type: Agama.$name,
    description: 'Membuat data agama baru',
    args: {
        data: nonNull(AgamaCreateInput),
    },
    resolve: async (_, { data }, { prisma }) => {
        try {
            return await prisma.agama.create({
                data,
            });
        } catch (error) {
            throw new Error('Gagal membuat data agama: ' + error);
        }
    },
});

export const agamaUpdate = mutationField('agamaUpdate', {
    type: Agama.$name,
    description: 'Memperbarui data agama yang sudah ada',
    args: {
        id: nonNull(intArg()),
        data: nonNull(AgamaUpdateInput),
    },
    resolve: async (_, { id, data }, { prisma }) => {
        try {
            return await prisma.agama.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new Error('Gagal memperbarui data agama: ' + error);
        }
    },
});

export const agamaDelete = mutationField('agamaDelete', {
    type: Agama.$name,
    description: 'Menghapus data agama (soft delete)',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        try {
            return await prisma.agama.update({
                where: { id },
                data: {
                    deleted_at: new Date(),
                },
            });
        } catch (error) {
            throw new Error('Gagal menghapus data agama: ' + error);
        }
    },
}); 