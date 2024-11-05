import { inputObjectType } from 'nexus';

export const ProvinsiCreateInput = inputObjectType({
    name: 'ProvinsiCreateInput',
    description: 'Input untuk membuat data provinsi baru',
    definition(t) {
        t.nonNull.string('kode_provinsi', {
            description: 'Kode provinsi (wajib diisi)'
        });
        t.nonNull.string('nama', {
            description: 'Nama provinsi (wajib diisi)'
        });
        t.boolean('status', {
            description: 'Status aktif provinsi'
        });
        t.nonNull.int('negara_id', {
            description: 'ID negara (wajib diisi)'
        });
    },
});

export const ProvinsiUpdateInput = inputObjectType({
    name: 'ProvinsiUpdateInput',
    description: 'Input untuk memperbarui data provinsi yang sudah ada',
    definition(t) {
        t.string('kode_provinsi', {
            description: 'Kode provinsi yang akan diperbarui'
        });
        t.string('nama', {
            description: 'Nama provinsi yang akan diperbarui'
        });
        t.boolean('status', {
            description: 'Status aktif provinsi yang akan diperbarui'
        });
        t.int('negara_id', {
            description: 'ID negara yang akan diperbarui'
        });
    },
});

export const ProvinsiWhereInput = inputObjectType({
    name: 'ProvinsiWhereInput',
    description: 'Input untuk filter dan paginasi daftar provinsi',
    definition(t) {
        t.string('search', {
            description: 'Kata kunci pencarian untuk kode_provinsi atau nama'
        });
        t.int('negara_id', {
            description: 'Filter berdasarkan ID negara'
        });
        t.string('sortBy', {
            description: 'Nama field untuk pengurutan data'
        });
        t.boolean('descending', {
            description: 'Urutkan menurun jika true, menaik jika false'
        });
        t.int('take', {
            description: 'Jumlah data yang diambil (limit)'
        });
        t.int('skip', {
            description: 'Jumlah data yang dilewati (offset)'
        });
    },
}); 