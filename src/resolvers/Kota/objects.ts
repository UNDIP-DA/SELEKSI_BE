import { objectType } from 'nexus';
import { Kota } from 'nexus-prisma';

export const KotaObject = objectType({
    name: Kota.$name,
    description: 'Objek yang merepresentasikan data kota/kabupaten dalam sistem',
    definition(t) {
        t.field(Kota.id);
        t.field(Kota.kode_kota);
        t.field(Kota.nama);
        t.field(Kota.mahasiswaList);
        t.field(Kota.kecamatanList);
        t.field(Kota.provinsi);
        t.field(Kota.provinsi_id);
        t.field(Kota.created_at);
        t.field(Kota.updated_at);
        t.field(Kota.deleted_at);
    },
});

export const KotaListObject = objectType({
    name: 'KotaList',
    description: 'Objek yang merepresentasikan daftar kota/kabupaten dengan paginasi',
    definition(t) {
        t.nonNull.list.nonNull.field('data', {
            type: Kota.$name,
            description: 'Daftar objek kota/kabupaten'
        });
        t.nonNull.int('total', {
            description: 'Jumlah total data kota/kabupaten yang sesuai dengan query'
        });
    },
}); 