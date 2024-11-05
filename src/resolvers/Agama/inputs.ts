import { inputObjectType } from 'nexus';

export const AgamaCreateInput = inputObjectType({
    name: 'AgamaCreateInput',
    description: 'Input untuk membuat data agama baru',
    definition(t) {
        t.nonNull.string('nama', {
            description: 'Nama agama (wajib diisi)'
        });
    },
});

export const AgamaUpdateInput = inputObjectType({
    name: 'AgamaUpdateInput',
    description: 'Input untuk memperbarui data agama yang sudah ada',
    definition(t) {
        t.string('nama', {
            description: 'Nama agama yang akan diperbarui'
        });
    },
});

export const AgamaWhereInput = inputObjectType({
    name: 'AgamaWhereInput',
    description: 'Input untuk filter dan paginasi daftar agama',
    definition(t) {
        t.string('search', {
            description: 'Kata kunci pencarian untuk nama agama'
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