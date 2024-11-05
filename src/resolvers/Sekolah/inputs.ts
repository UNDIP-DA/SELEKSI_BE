import { inputObjectType } from 'nexus';

export const SekolahCreateInput = inputObjectType({
    name: 'SekolahCreateInput',
    description: 'Input untuk membuat data sekolah baru',
    definition(t) {
        t.nonNull.string('kode_sekolah', {
            description: 'Kode sekolah (wajib diisi)'
        });
        t.nonNull.string('nama_sekolah', {
            description: 'Nama sekolah (wajib diisi)'
        });
        t.string('alamat', {
            description: 'Alamat sekolah'
        });
        t.string('kelurahan', {
            description: 'Kelurahan sekolah'
        });
        t.int('provinsi_id', {
            description: 'ID provinsi sekolah'
        });
        t.string('akreditasi', {
            description: 'Akreditasi sekolah'
        });
        t.boolean('status', {
            description: 'Status aktif sekolah'
        });
        t.string('tipe', {
            description: 'Tipe sekolah'
        });
    },
});

export const SekolahUpdateInput = inputObjectType({
    name: 'SekolahUpdateInput',
    description: 'Input untuk memperbarui data sekolah yang sudah ada',
    definition(t) {
        t.string('kode_sekolah', {
            description: 'Kode sekolah yang akan diperbarui'
        });
        t.string('nama_sekolah', {
            description: 'Nama sekolah yang akan diperbarui'
        });
        t.string('alamat', {
            description: 'Alamat sekolah yang akan diperbarui'
        });
        t.string('kelurahan', {
            description: 'Kelurahan sekolah yang akan diperbarui'
        });
        t.int('provinsi_id', {
            description: 'ID provinsi sekolah yang akan diperbarui'
        });
        t.string('akreditasi', {
            description: 'Akreditasi sekolah yang akan diperbarui'
        });
        t.boolean('status', {
            description: 'Status aktif sekolah yang akan diperbarui'
        });
        t.string('tipe', {
            description: 'Tipe sekolah yang akan diperbarui'
        });
    },
});

export const SekolahWhereInput = inputObjectType({
    name: 'SekolahWhereInput',
    description: 'Input untuk filter dan paginasi daftar sekolah',
    definition(t) {
        t.string('search', {
            description: 'Kata kunci pencarian untuk kode_sekolah atau nama_sekolah'
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