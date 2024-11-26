import { intArg, mutationField, nonNull } from 'nexus';
import { Universitas } from 'nexus-prisma';
import { UniversitasCreateInput, UniversitasUpdateInput } from './inputs';

export const universitasCreate = mutationField('universitasCreate', {
    type: Universitas.$name,
    description: 'Membuat data universitas baru',
    args: {
        data: nonNull(UniversitasCreateInput),
    },
    resolve: async (_, { data }, { prisma }) => {
        try {
            return await prisma.universitas.create({
                data,
            });
        } catch (error) {
            throw new Error('Gagal membuat data universitas: ' + error);
        }
    },
});

export const universitasUpdate = mutationField('universitasUpdate', {
    type: Universitas.$name,
    description: 'Memperbarui data universitas yang sudah ada',
    args: {
        id: nonNull(intArg()),
        data: nonNull(UniversitasUpdateInput),
    },
    resolve: async (_, { id, data }, { prisma }) => {
        try {
            return await prisma.universitas.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new Error('Gagal memperbarui data universitas: ' + error);
        }
    },
});

export const universitasDelete = mutationField('universitasDelete', {
    type: Universitas.$name,
    description: 'Menghapus data universitas (soft delete)',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        try {
            return await prisma.universitas.update({
                where: { id },
                data: {
                    deleted_at: new Date(),
                },
            });
        } catch (error) {
            throw new Error('Gagal menghapus data universitas: ' + error);
        }
    },
}); 