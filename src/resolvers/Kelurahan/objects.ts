import { objectType } from 'nexus';
import { Kelurahan } from 'nexus-prisma';

export const KelurahanObject = objectType({
    name: Kelurahan.$name,
    description: 'Objek yang merepresentasikan data kelurahan dalam sistem',
    definition(t) {
        t.field(Kelurahan.id);
        t.field(Kelurahan.kode_kelurahan);
        t.field(Kelurahan.nama);
        t.field(Kelurahan.mahasiswaList);
        t.field(Kelurahan.kecamatan);
        t.field(Kelurahan.kecamatan_id);
        t.field(Kelurahan.created_at);
        t.field(Kelurahan.updated_at);
        t.field(Kelurahan.deleted_at);
    },
});

export const KelurahanListObject = objectType({
    name: 'KelurahanList',
    description: 'Objek yang merepresentasikan daftar kelurahan dengan paginasi',
    definition(t) {
        t.nonNull.list.nonNull.field('data', {
            type: Kelurahan.$name,
            description: 'Daftar objek kelurahan'
        });
        t.nonNull.int('total', {
            description: 'Jumlah total data kelurahan yang sesuai dengan query'
        });
    },
}); 