import { intArg, mutationField, nonNull } from 'nexus';
import { Provinsi } from 'nexus-prisma';
import { ProvinsiCreateInput, ProvinsiUpdateInput } from './inputs';

export const createProvinsi = mutationField('createProvinsi', {
    type: Provinsi.$name,
    description: 'Membuat data provinsi baru',
    args: {
        data: nonNull(ProvinsiCreateInput),
    },
    resolve: async (_, { data }, { prisma }) => {
        try {
            return await prisma.provinsi.create({
                data,
            });
        } catch (error) {
            throw new Error('Gagal membuat data provinsi: ' + error);
        }
    },
});

export const updateProvinsi = mutationField('updateProvinsi', {
    type: Provinsi.$name,
    description: 'Memperbarui data provinsi yang sudah ada',
    args: {
        id: nonNull(intArg()),
        data: nonNull(ProvinsiUpdateInput),
    },
    resolve: async (_, { id, data }, { prisma }) => {
        try {
            return await prisma.provinsi.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new Error('Gagal memperbarui data provinsi: ' + error);
        }
    },
});

export const deleteProvinsi = mutationField('deleteProvinsi', {
    type: Provinsi.$name,
    description: 'Menghapus data provinsi (soft delete)',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        try {
            return await prisma.provinsi.update({
                where: { id },
                data: {
                    deleted_at: new Date(),
                },
            });
        } catch (error) {
            throw new Error('Gagal menghapus data provinsi: ' + error);
        }
    },
}); 