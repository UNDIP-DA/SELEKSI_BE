import { inputObjectType } from 'nexus';

export const FakultasCreateInput = inputObjectType({
    name: 'FakultasCreateInput',
    description: 'Input untuk membuat data fakultas baru',
    definition(t) {
        t.nonNull.string('nama', {
            description: 'Nama fakultas (wajib diisi)'
        });
    },
});

export const FakultasUpdateInput = inputObjectType({
    name: 'FakultasUpdateInput',
    description: 'Input untuk memperbarui data fakultas yang sudah ada',
    definition(t) {
        t.string('nama');
    },
});

export const FakultasWhereInput = inputObjectType({
    name: 'FakultasWhereInput',
    description: 'Input untuk filter dan paginasi daftar fakultas',
    definition(t) {
        t.string('search', {
            description: 'Kata kunci pencarian untuk nama fakultas'
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