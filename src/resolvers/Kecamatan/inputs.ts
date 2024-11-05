import { inputObjectType } from 'nexus';

export const KecamatanCreateInput = inputObjectType({
    name: 'KecamatanCreateInput',
    description: 'Input untuk membuat data kecamatan baru',
    definition(t) {
        t.nonNull.string('kode_kecamatan', {
            description: 'Kode kecamatan (wajib diisi)'
        });
        t.nonNull.string('nama', {
            description: 'Nama kecamatan (wajib diisi)'
        });
        t.nonNull.int('kota_id', {
            description: 'ID kota (wajib diisi)'
        });
    },
});

export const KecamatanUpdateInput = inputObjectType({
    name: 'KecamatanUpdateInput',
    description: 'Input untuk memperbarui data kecamatan yang sudah ada',
    definition(t) {
        t.string('kode_kecamatan', {
            description: 'Kode kecamatan yang akan diperbarui'
        });
        t.string('nama', {
            description: 'Nama kecamatan yang akan diperbarui'
        });
        t.int('kota_id', {
            description: 'ID kota yang akan diperbarui'
        });
    },
});

export const KecamatanWhereInput = inputObjectType({
    name: 'KecamatanWhereInput',
    description: 'Input untuk filter dan paginasi daftar kecamatan',
    definition(t) {
        t.string('search', {
            description: 'Kata kunci pencarian untuk kode_kecamatan atau nama'
        });
        t.int('kota_id', {
            description: 'Filter berdasarkan ID kota'
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