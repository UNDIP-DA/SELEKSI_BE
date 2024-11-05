import { inputObjectType } from 'nexus';

export const PenerimaanJalurCreateInput = inputObjectType({
    name: 'PenerimaanJalurCreateInput',
    description: 'Input untuk membuat relasi penerimaan-jalur baru',
    definition(t) {
        t.nonNull.int('penerimaan_id', {
            description: 'ID penerimaan (wajib diisi)'
        });
        t.nonNull.int('jalur_id', {
            description: 'ID jalur (wajib diisi)'
        });
    },
});

export const PenerimaanJalurUpdateInput = inputObjectType({
    name: 'PenerimaanJalurUpdateInput',
    description: 'Input untuk memperbarui relasi penerimaan-jalur yang sudah ada',
    definition(t) {
        t.int('penerimaan_id');
        t.int('jalur_id');
    },
});

export const PenerimaanJalurWhereInput = inputObjectType({
    name: 'PenerimaanJalurWhereInput',
    description: 'Input untuk filter dan paginasi daftar relasi penerimaan-jalur',
    definition(t) {
        t.int('penerimaan_id', {
            description: 'Filter berdasarkan ID penerimaan'
        });
        t.int('jalur_id', {
            description: 'Filter berdasarkan ID jalur'
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