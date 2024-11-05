import { intArg, mutationField, nonNull } from 'nexus';
import { Mahasiswa } from 'nexus-prisma';
import { MahasiswaCreateInput, MahasiswaUpdateInput } from './inputs';

export const createMahasiswa = mutationField('createMahasiswa', {
    type: Mahasiswa.$name,
    description: 'Membuat data mahasiswa baru',
    args: {
        data: nonNull(MahasiswaCreateInput),
    },
    resolve: async (_, { data }, { prisma }) => {
        try {
            return await prisma.mahasiswa.create({
                data,
            });
        } catch (error) {
            throw new Error('Gagal membuat data mahasiswa: ' + error);
        }
    },
});

export const updateMahasiswa = mutationField('updateMahasiswa', {
    type: Mahasiswa.$name,
    description: 'Memperbarui data mahasiswa yang sudah ada',
    args: {
        id: nonNull(intArg()),
        data: nonNull(MahasiswaUpdateInput),
    },
    resolve: async (_, { id, data }, { prisma }) => {
        try {
            return await prisma.mahasiswa.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new Error('Gagal memperbarui data mahasiswa: ' + error);
        }
    },
});

export const deleteMahasiswa = mutationField('deleteMahasiswa', {
    type: Mahasiswa.$name,
    description: 'Menghapus data mahasiswa',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        try {
            return await prisma.mahasiswa.delete({
                where: { id },
            });
        } catch (error) {
            throw new Error('Gagal menghapus data mahasiswa: ' + error);
        }
    },
}); 