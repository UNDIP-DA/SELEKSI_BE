import { intArg, mutationField, nonNull, stringArg } from 'nexus';
import { Penerimaan } from 'nexus-prisma';
import { PenerimaanCreateInput, PenerimaanUpdateInput } from './inputs';
import { Prisma } from '@prisma/client';

export const penerimaanCreate = mutationField('penerimaanCreate', {
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

export const penerimaanUpdate = mutationField('penerimaanUpdate', {
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

export const penerimaanDelete = mutationField('penerimaanDelete', {
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

export const penerimaanApprovalById = mutationField('penerimaanApprovalById', {
    type: Penerimaan.$name,
    description: 'Approval data penerimaan',
    args: {
        penerimaan_id: nonNull(intArg()),
        approval_id: nonNull(intArg()),
        catatan: stringArg(),
    },
    resolve: async (_, { penerimaan_id, approval_id, catatan }, { prisma, userId }) => {
        try {
            return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
                // Update approval_id pada Penerimaan
                const updatedPenerimaan = await tx.penerimaan.update({
                    where: { id: penerimaan_id },
                    data: { approval_id },
                });

                // Insert log baru ke ApprovalLog
                const approvalLog = await tx.approvalLog.create({
                    data: {
                        penerimaan_id: penerimaan_id,        // Hubungkan ke penerimaan yang di-update
                        approval_id: approval_id, // Approval ID yang baru
                        user_id: userId,          // ID pengguna yang melakukan perubahan
                        catatan: catatan ?? catatan, // Catatan log
                    },
                });

                return updatedPenerimaan
            });

        } catch (error) {
            throw new Error('Gagal melakukan approval data penerimaan: ' + error);
        }
    },
}); 