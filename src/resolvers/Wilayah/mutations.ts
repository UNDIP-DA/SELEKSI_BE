import { mutationField, nonNull, intArg } from 'nexus'
import { Wilayah } from 'nexus-prisma'
import { WilayahCreateInput, WilayahUpdateInput } from './inputs'

export const wilayahCreate = mutationField('wilayahCreate', {
    type: Wilayah.$name,
    description: 'Membuat data wilayah baru',
    args: {
        data: nonNull(WilayahCreateInput),
    },
    resolve: async (_, { data }, { prisma }) => {
        try {
            return await prisma.wilayah.create({
                data,
            })
        } catch (error) {
            throw new Error('Gagal membuat wilayah: ' + error)
        }
    },
})

export const wilayahUpdate = mutationField('wilayahUpdate', {
    type: Wilayah.$name,
    description: 'Memperbarui data wilayah yang sudah ada',
    args: {
        id: nonNull(intArg()),
        data: nonNull(WilayahUpdateInput),
    },
    resolve: async (_, { id, data }, { prisma }) => {
        try {
            return await prisma.wilayah.update({
                where: { id },
                data,
            })
        } catch (error) {
            throw new Error('Gagal memperbarui wilayah: ' + error)
        }
    },
})

export const wilayahDelete = mutationField('wilayahDelete', {
    type: Wilayah.$name,
    description: 'Menghapus data wilayah (soft delete)',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        try {
            return await prisma.wilayah.update({
                where: { id },
                data: {
                    deleted_at: new Date(),
                },
            })
        } catch (error) {
            throw new Error('Gagal menghapus wilayah: ' + error)
        }
    },
})

export const wilayahRestore = mutationField('wilayahRestore', {
    type: Wilayah.$name,
    description: 'Memulihkan data wilayah yang telah dihapus',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        try {
            return await prisma.wilayah.update({
                where: { id },
                data: {
                    deleted_at: null,
                },
            })
        } catch (error) {
            throw new Error('Gagal memulihkan wilayah: ' + error)
        }
    },
}) 