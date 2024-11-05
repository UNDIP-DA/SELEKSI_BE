import { objectType } from 'nexus';
import { Provinsi } from 'nexus-prisma';

export const ProvinsiObject = objectType({
    name: Provinsi.$name,
    description: 'Objek yang merepresentasikan data provinsi dalam sistem',
    definition(t) {
        t.field(Provinsi.id);
        t.field(Provinsi.kode_provinsi);
        t.field(Provinsi.nama);
        t.field(Provinsi.status);
        t.field(Provinsi.kotaList);
        t.field(Provinsi.mahasiswaList);
        t.field(Provinsi.negara);
        t.field(Provinsi.negara_id);
        t.field(Provinsi.sekolahList);
        t.field(Provinsi.universitasList);
        t.field(Provinsi.created_at);
        t.field(Provinsi.updated_at);
        t.field(Provinsi.deleted_at);
    },
});

export const ProvinsiListObject = objectType({
    name: 'ProvinsiList',
    description: 'Objek yang merepresentasikan daftar provinsi dengan paginasi',
    definition(t) {
        t.nonNull.list.nonNull.field('data', {
            type: Provinsi.$name,
            description: 'Daftar objek provinsi'
        });
        t.nonNull.int('total', {
            description: 'Jumlah total data provinsi yang sesuai dengan query'
        });
    },
}); 