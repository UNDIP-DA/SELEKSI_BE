import { inputObjectType } from 'nexus';

export const JalurCreateInput = inputObjectType({
    name: 'JalurCreateInput',
    description: 'Input untuk membuat data jalur baru',
    definition(t) {
        t.nonNull.string('kode_jalur', {
            description: 'Kode jalur penerimaan (wajib diisi)'
        });
        t.nonNull.string('nama_jalur', {
            description: 'Nama jalur penerimaan (wajib diisi)'
        });
        t.string('keterangan', {
            description: 'Keterangan jalur penerimaan'
        });
        t.boolean('status', {
            description: 'Status aktif jalur penerimaan'
        });
    },
});

export const JalurUpdateInput = inputObjectType({
    name: 'JalurUpdateInput',
    description: 'Input untuk memperbarui data jalur yang sudah ada',
    definition(t) {
        t.string('kode_jalur', {
            description: 'Kode jalur yang akan diperbarui'
        });
        t.string('nama_jalur', {
            description: 'Nama jalur yang akan diperbarui'
        });
        t.string('keterangan', {
            description: 'Keterangan jalur yang akan diperbarui'
        });
        t.boolean('status', {
            description: 'Status aktif jalur yang akan diperbarui'
        });
    },
});

export const JalurWhereInput = inputObjectType({
    name: 'JalurWhereInput',
    description: 'Input untuk filter dan paginasi daftar jalur',
    definition(t) {
        t.string('search', {
            description: 'Kata kunci pencarian untuk kode_jalur atau nama_jalur'
        });
        t.boolean('status', {
            description: 'Filter berdasarkan status'
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