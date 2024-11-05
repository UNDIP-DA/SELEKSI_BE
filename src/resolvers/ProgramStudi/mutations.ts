import { intArg, mutationField, nonNull } from 'nexus';
import { ProgramStudi } from 'nexus-prisma';
import { ProgramStudiCreateInput, ProgramStudiUpdateInput } from './inputs';

export const createProgramStudi = mutationField('createProgramStudi', {
    type: ProgramStudi.$name,
    description: 'Membuat data program studi baru',
    args: {
        data: nonNull(ProgramStudiCreateInput),
    },
    resolve: async (_, { data }, { prisma }) => {
        try {
            return await prisma.programStudi.create({
                data,
            });
        } catch (error) {
            throw new Error('Gagal membuat data program studi: ' + error);
        }
    },
});

export const updateProgramStudi = mutationField('updateProgramStudi', {
    type: ProgramStudi.$name,
    description: 'Memperbarui data program studi yang sudah ada',
    args: {
        id: nonNull(intArg()),
        data: nonNull(ProgramStudiUpdateInput),
    },
    resolve: async (_, { id, data }, { prisma }) => {
        try {
            return await prisma.programStudi.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new Error('Gagal memperbarui data program studi: ' + error);
        }
    },
});

export const deleteProgramStudi = mutationField('deleteProgramStudi', {
    type: ProgramStudi.$name,
    description: 'Menghapus data program studi',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        try {
            return await prisma.programStudi.delete({
                where: { id },
            });
        } catch (error) {
            throw new Error('Gagal menghapus data program studi: ' + error);
        }
    },
}); 