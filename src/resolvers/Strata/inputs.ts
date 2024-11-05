import { inputObjectType } from 'nexus';

export const StrataCreateInput = inputObjectType({
    name: 'StrataCreateInput',
    description: 'Input untuk membuat data strata baru',
    definition(t) {
        t.nonNull.string('nama', {
            description: 'Nama strata (wajib diisi)'
        });
    },
});

export const StrataUpdateInput = inputObjectType({
    name: 'StrataUpdateInput',
    description: 'Input untuk memperbarui data strata yang sudah ada',
    definition(t) {
        t.string('nama');
    },
});

export const StrataWhereInput = inputObjectType({
    name: 'StrataWhereInput',
    description: 'Input untuk filter dan paginasi daftar strata',
    definition(t) {
        t.string('search', {
            description: 'Kata kunci pencarian untuk nama strata'
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