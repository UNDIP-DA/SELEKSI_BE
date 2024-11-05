import { inputObjectType } from 'nexus';

export const UniversitasCreateInput = inputObjectType({
    name: 'UniversitasCreateInput',
    description: 'Input untuk membuat data perguruan tinggi baru',
    definition(t) {
        t.nonNull.string('kode_pt', {
            description: 'Kode perguruan tinggi (wajib diisi)'
        });
        t.nonNull.string('nama', {
            description: 'Nama perguruan tinggi (wajib diisi)'
        });
        t.int('provinsi_id', {
            description: 'ID provinsi perguruan tinggi'
        });
        t.boolean('status', {
            description: 'Status aktif perguruan tinggi'
        });
    },
});

export const UniversitasUpdateInput = inputObjectType({
    name: 'UniversitasUpdateInput',
    description: 'Input untuk memperbarui data perguruan tinggi yang sudah ada',
    definition(t) {
        t.string('kode_pt', {
            description: 'Kode perguruan tinggi yang akan diperbarui'
        });
        t.string('nama', {
            description: 'Nama perguruan tinggi yang akan diperbarui'
        });
        t.int('provinsi_id', {
            description: 'ID provinsi perguruan tinggi yang akan diperbarui'
        });
        t.boolean('status', {
            description: 'Status aktif perguruan tinggi yang akan diperbarui'
        });
    },
});

export const UniversitasWhereInput = inputObjectType({
    name: 'UniversitasWhereInput',
    description: 'Input untuk filter dan paginasi daftar perguruan tinggi',
    definition(t) {
        t.string('search', {
            description: 'Kata kunci pencarian untuk kode_pt atau nama perguruan tinggi'
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