import { inputObjectType } from 'nexus'

export const WilayahCreateInput = inputObjectType({
    name: 'WilayahCreateInput',
    description: 'Input untuk membuat data wilayah baru',
    definition(t) {
        t.nonNull.string('kode_wilayah', {
            description: 'Kode unik wilayah (wajib diisi)'
        })
        t.nonNull.string('nama', {
            description: 'Nama wilayah (wajib diisi)'
        })
        t.nonNull.string('tingkat', {
            description: 'Tingkat wilayah: PROVINSI/KOTAKAB/KECAMATAN (wajib diisi)'
        })
        t.int('negara_id', {
            description: 'ID negara dari wilayah (opsional)'
        })
        t.int('parent_id', {
            description: 'ID wilayah induk (opsional)'
        })
        t.boolean('status', {
            description: 'Status aktif wilayah'
        })
    },
})

export const WilayahUpdateInput = inputObjectType({
    name: 'WilayahUpdateInput',
    description: 'Input untuk memperbarui data wilayah',
    definition(t) {
        t.string('nama', {
            description: 'Nama wilayah yang diperbarui'
        })
        t.string('tingkat', {
            description: 'Tingkat wilayah yang diperbarui'
        })
        t.int('parent_id', {
            description: 'ID wilayah induk yang diperbarui'
        })
        t.boolean('status', {
            description: 'Status wilayah yang diperbarui'
        })
    },
})

export const WilayahWhereInput = inputObjectType({
    name: 'WilayahWhereInput',
    description: 'Input untuk filter dan paginasi data wilayah',
    definition(t) {
        t.string('search', {
            description: 'Kata kunci pencarian (berdasarkan kode atau nama wilayah)'
        })
        t.string('sortBy', {
            description: 'Nama field untuk pengurutan data'
        })
        t.boolean('descending', {
            description: 'Urutkan menurun jika true, menaik jika false'
        })
        t.int('take', {
            description: 'Jumlah data yang diambil'
        })
        t.int('skip', {
            description: 'Jumlah data yang dilewati'
        })

        // Filter tambahan
        t.string('tingkat', {
            description: 'Filter berdasarkan tingkat wilayah'
        })
        t.int('negara_id', {
            description: 'Filter berdasarkan ID negara'
        })
        t.int('parent_id', {
            description: 'Filter berdasarkan ID wilayah induk'
        })
    },
}) 