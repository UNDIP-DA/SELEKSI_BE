import { inputObjectType } from 'nexus';

export const PenerimaanCreateInput = inputObjectType({
    name: 'PenerimaanCreateInput',
    description: 'Input untuk membuat data penerimaan baru',
    definition(t) {
        t.nonNull.string('nama', {
            description: 'Nama penerimaan (wajib diisi)'
        });
        t.string('keterangan', {
            description: 'Keterangan tambahan untuk penerimaan'
        });
        t.string('catatan', {
            description: 'Catatan untuk penerimaan'
        });
        t.int('approval_id', {
            description: 'ID approval'
        })
        t.boolean('status', {
            description: 'Status aktif penerimaan'
        });
    },
});

export const PenerimaanUpdateInput = inputObjectType({
    name: 'PenerimaanUpdateInput',
    description: 'Input untuk memperbarui data penerimaan yang sudah ada',
    definition(t) {
        t.string('nama', {
            description: 'Nama penerimaan yang akan diperbarui'
        });
        t.string('keterangan', {
            description: 'Keterangan tambahan yang akan diperbarui'
        });
        t.string('catatan', {
            description: 'Catatan yang akan diperbarui'
        });
        t.int('approval_id', {
            description: 'ID approval'
        })
        t.boolean('status', {
            description: 'Status aktif yang akan diperbarui'
        });
    },
});

export const PenerimaanWhereInput = inputObjectType({
    name: 'PenerimaanWhereInput',
    description: 'Input untuk filter dan paginasi daftar penerimaan',
    definition(t) {
        t.string('search', {
            description: 'Kata kunci pencarian untuk nama penerimaan'
        });
        t.int('approval_id', {
            description: 'ID approval'
        })
        t.boolean('status', {
            description: 'Filter berdasarkan status penerimaan'
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