import { objectType } from 'nexus';
import { PenerimaanJalur } from 'nexus-prisma';

export const PenerimaanJalurObject = objectType({
    name: PenerimaanJalur.$name,
    description: 'Objek yang merepresentasikan relasi antara penerimaan dan jalur dalam sistem',
    definition(t) {
        t.field(PenerimaanJalur.id);
        t.field(PenerimaanJalur.penerimaan_id);
        t.field(PenerimaanJalur.jalur_id);
        t.field(PenerimaanJalur.penerimaan);
        t.field(PenerimaanJalur.jalur);
        t.field(PenerimaanJalur.created_at);
        t.field(PenerimaanJalur.updated_at);
    },
});

export const PenerimaanJalurListObject = objectType({
    name: 'PenerimaanJalurList',
    description: 'Objek yang merepresentasikan daftar relasi penerimaan-jalur dengan paginasi',
    definition(t) {
        t.nonNull.list.nonNull.field('data', {
            type: PenerimaanJalur.$name,
            description: 'Daftar objek relasi penerimaan-jalur'
        });
        t.nonNull.int('total', {
            description: 'Jumlah total data relasi yang sesuai dengan query'
        });
    },
}); 