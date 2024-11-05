import { objectType } from 'nexus';
import { Negara } from 'nexus-prisma';

export const NegaraObject = objectType({
    name: Negara.$name,
    description: 'Objek yang merepresentasikan data negara dalam sistem',
    definition(t) {
        t.field(Negara.id);
        t.field(Negara.kode_negara);
        t.field(Negara.nama);
        t.field(Negara.kode_telp);
        t.field(Negara.status);
        t.field(Negara.provinsiList);
        t.field(Negara.mahasiswaList);
        t.field(Negara.created_at);
        t.field(Negara.updated_at);
        t.field(Negara.deleted_at);
    },
});

export const NegaraListObject = objectType({
    name: 'NegaraList',
    description: 'Objek yang merepresentasikan daftar negara dengan paginasi',
    definition(t) {
        t.nonNull.list.nonNull.field('data', {
            type: Negara.$name,
            description: 'Daftar objek negara'
        });
        t.nonNull.int('total', {
            description: 'Jumlah total data negara yang sesuai dengan query'
        });
    },
}); 