import { inputObjectType } from 'nexus';

export const ProgramStudiCreateInput = inputObjectType({
    name: 'ProgramStudiCreateInput',
    description: 'Input untuk membuat data program studi baru',
    definition(t) {
        t.nonNull.string('nama', {
            description: 'Nama program studi (wajib diisi)'
        });
        t.nonNull.int('kode_pmb', {
            description: 'Kode dari PMB (wajib diisi)'
        });
        t.int('kode_reqonline', {
            description: 'Kode dari Regonline (optional)'
        });
        t.nonNull.int('fakultas_id', {
            description: 'ID fakultas (wajib diisi)'
        });
        t.nonNull.int('strata_id', {
            description: 'ID strata (wajib diisi)'
        });
        t.boolean('status', {
            description: 'Status aktif program studi'
        });
    },
});

export const ProgramStudiUpdateInput = inputObjectType({
    name: 'ProgramStudiUpdateInput',
    description: 'Input untuk memperbarui data program studi yang sudah ada',
    definition(t) {
        t.string('nama');
        t.int('kode_pmb');
        t.int('kode_regonline');
        t.int('fakultas_id');
        t.int('fakultas_id');
        t.int('strata_id');
        t.boolean('status');
    },
});

export const ProgramStudiWhereInput = inputObjectType({
    name: 'ProgramStudiWhereInput',
    description: 'Input untuk filter dan paginasi daftar program studi',
    definition(t) {
        t.string('search', {
            description: 'Kata kunci pencarian untuk nama program studi'
        });
        t.int('kode_pmb', {
            description: 'Filter berdasarkan kode pmb'
        });
        t.int('kode_regonline', {
            description: 'Filter berdasarkan kode regonline'
        });
        t.int('fakultas_id', {
            description: 'Filter berdasarkan fakultas'
        });
        t.int('strata_id', {
            description: 'Filter berdasarkan strata'
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