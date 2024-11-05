import { inputObjectType } from 'nexus';

export const KelurahanCreateInput = inputObjectType({
    name: 'KelurahanCreateInput',
    description: 'Input untuk membuat data kelurahan baru',
    definition(t) {
        t.nonNull.string('kode_kelurahan', {
            description: 'Kode kelurahan (wajib diisi)'
        });
        t.nonNull.string('nama', {
            description: 'Nama kelurahan (wajib diisi)'
        });
        t.nonNull.int('kecamatan_id', {
            description: 'ID kecamatan (wajib diisi)'
        });
    },
});

export const KelurahanUpdateInput = inputObjectType({
    name: 'KelurahanUpdateInput',
    description: 'Input untuk memperbarui data kelurahan yang sudah ada',
    definition(t) {
        t.string('kode_kelurahan', {
            description: 'Kode kelurahan yang akan diperbarui'
        });
        t.string('nama', {
            description: 'Nama kelurahan yang akan diperbarui'
        });
        t.int('kecamatan_id', {
            description: 'ID kecamatan yang akan diperbarui'
        });
    },
});

export const KelurahanWhereInput = inputObjectType({
    name: 'KelurahanWhereInput',
    description: 'Input untuk filter dan paginasi daftar kelurahan',
    definition(t) {
        t.string('search', {
            description: 'Kata kunci pencarian untuk kode_kelurahan atau nama'
        });
        t.int('kecamatan_id', {
            description: 'Filter berdasarkan ID kecamatan'
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