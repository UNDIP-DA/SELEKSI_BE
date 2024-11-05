import { inputObjectType } from 'nexus';

export const NegaraCreateInput = inputObjectType({
    name: 'NegaraCreateInput',
    description: 'Input untuk membuat data negara baru',
    definition(t) {
        t.string('kode_negara', {
            description: 'Kode negara'
        });
        t.nonNull.string('nama', {
            description: 'Nama negara (wajib diisi)'
        });
        t.string('kode_telp', {
            description: 'Kode telepon negara'
        });
        t.boolean('status', {
            description: 'Status aktif negara'
        });
    },
});

export const NegaraUpdateInput = inputObjectType({
    name: 'NegaraUpdateInput',
    description: 'Input untuk memperbarui data negara yang sudah ada',
    definition(t) {
        t.string('kode_negara', {
            description: 'Kode negara yang akan diperbarui'
        });
        t.string('nama', {
            description: 'Nama negara yang akan diperbarui'
        });
        t.string('kode_telp', {
            description: 'Kode telepon negara yang akan diperbarui'
        });
        t.boolean('status', {
            description: 'Status aktif negara yang akan diperbarui'
        });
    },
});

export const NegaraWhereInput = inputObjectType({
    name: 'NegaraWhereInput',
    description: 'Input untuk filter dan paginasi daftar negara',
    definition(t) {
        t.string('search', {
            description: 'Kata kunci pencarian untuk kode_negara atau nama'
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