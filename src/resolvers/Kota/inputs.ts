import { inputObjectType } from 'nexus';

export const KotaCreateInput = inputObjectType({
    name: 'KotaCreateInput',
    description: 'Input untuk membuat data kota/kabupaten baru',
    definition(t) {
        t.nonNull.string('kode_kota', {
            description: 'Kode kota/kabupaten (wajib diisi)'
        });
        t.nonNull.string('nama', {
            description: 'Nama kota/kabupaten (wajib diisi)'
        });
        t.nonNull.int('provinsi_id', {
            description: 'ID provinsi (wajib diisi)'
        });
    },
});

export const KotaUpdateInput = inputObjectType({
    name: 'KotaUpdateInput',
    description: 'Input untuk memperbarui data kota/kabupaten yang sudah ada',
    definition(t) {
        t.string('kode_kota', {
            description: 'Kode kota/kabupaten yang akan diperbarui'
        });
        t.string('nama', {
            description: 'Nama kota/kabupaten yang akan diperbarui'
        });
        t.int('provinsi_id', {
            description: 'ID provinsi yang akan diperbarui'
        });
    },
});

export const KotaWhereInput = inputObjectType({
    name: 'KotaWhereInput',
    description: 'Input untuk filter dan paginasi daftar kota/kabupaten',
    definition(t) {
        t.string('search', {
            description: 'Kata kunci pencarian untuk kode_kota atau nama'
        });
        t.int('provinsi_id', {
            description: 'Filter berdasarkan ID provinsi'
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