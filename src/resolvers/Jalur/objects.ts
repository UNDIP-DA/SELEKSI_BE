import { objectType } from 'nexus';
import { Jalur } from 'nexus-prisma';

export const JalurObject = objectType({
    name: Jalur.$name,
    description: 'Objek yang merepresentasikan data jalur penerimaan dalam sistem',
    definition(t) {
        t.field(Jalur.id);
        t.field(Jalur.kode_jalur);
        t.field(Jalur.nama_jalur);
        t.field(Jalur.keterangan);
        t.field(Jalur.status);
        // t.field(Jalur.mahasiswaList);
        t.field(Jalur.penerimaanJalurList);
        t.field(Jalur.created_at);
        t.field(Jalur.updated_at);
    },
});

export const JalurListObject = objectType({
    name: 'JalurList',
    description: 'Objek yang merepresentasikan daftar jalur dengan paginasi',
    definition(t) {
        t.nonNull.list.nonNull.field('data', {
            type: Jalur.$name,
            description: 'Daftar objek jalur'
        });
        t.nonNull.int('total', {
            description: 'Jumlah total data jalur yang sesuai dengan query'
        });
    },
}); 