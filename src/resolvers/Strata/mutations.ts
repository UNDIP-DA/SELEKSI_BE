import { intArg, mutationField, nonNull } from 'nexus';
import { Strata } from 'nexus-prisma';
import { StrataCreateInput, StrataUpdateInput } from './inputs';

export const strataCreate = mutationField('strataCreate', {
    type: Strata.$name,
    description: 'Membuat data strata baru',
    args: {
        data: nonNull(StrataCreateInput),
    },
    resolve: async (_, { data }, { prisma }) => {
        try {
            return await prisma.strata.create({
                data,
            });
        } catch (error) {
            throw new Error('Gagal membuat data strata: ' + error);
        }
    },
});

export const strataUpdate = mutationField('strataUpdate', {
    type: Strata.$name,
    description: 'Memperbarui data strata yang sudah ada',
    args: {
        id: nonNull(intArg()),
        data: nonNull(StrataUpdateInput),
    },
    resolve: async (_, { id, data }, { prisma }) => {
        try {
            return await prisma.strata.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new Error('Gagal memperbarui data strata: ' + error);
        }
    },
});

export const strataDelete = mutationField('strataDelete', {
    type: Strata.$name,
    description: 'Menghapus data strata',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        try {
            return await prisma.strata.delete({
                where: { id },
            });
        } catch (error) {
            throw new Error('Gagal menghapus data strata: ' + error);
        }
    },
}); 