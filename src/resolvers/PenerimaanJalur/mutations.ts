import { intArg, mutationField, nonNull } from 'nexus';
import { PenerimaanJalur } from 'nexus-prisma';
import { PenerimaanJalurCreateInput, PenerimaanJalurUpdateInput } from './inputs';

export const createPenerimaanJalur = mutationField('createPenerimaanJalur', {
    type: PenerimaanJalur.$name,
    description: 'Membuat relasi penerimaan-jalur baru',
    args: {
        data: nonNull(PenerimaanJalurCreateInput),
    },
    resolve: async (_, { data }, { prisma }) => {
        try {
            return await prisma.penerimaanJalur.create({
                data,
            });
        } catch (error) {
            throw new Error('Gagal membuat relasi penerimaan-jalur: ' + error);
        }
    },
});

export const updatePenerimaanJalur = mutationField('updatePenerimaanJalur', {
    type: PenerimaanJalur.$name,
    description: 'Memperbarui relasi penerimaan-jalur yang sudah ada',
    args: {
        id: nonNull(intArg()),
        data: nonNull(PenerimaanJalurUpdateInput),
    },
    resolve: async (_, { id, data }, { prisma }) => {
        try {
            return await prisma.penerimaanJalur.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new Error('Gagal memperbarui relasi penerimaan-jalur: ' + error);
        }
    },
});

export const deletePenerimaanJalur = mutationField('deletePenerimaanJalur', {
    type: PenerimaanJalur.$name,
    description: 'Menghapus relasi penerimaan-jalur',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        try {
            return await prisma.penerimaanJalur.delete({
                where: { id },
            });
        } catch (error) {
            throw new Error('Gagal menghapus relasi penerimaan-jalur: ' + error);
        }
    },
}); 