import { objectType } from 'nexus';
import { Kecamatan } from 'nexus-prisma';

export const KecamatanObject = objectType({
    name: Kecamatan.$name,
    description: 'Objek yang merepresentasikan data kecamatan dalam sistem',
    definition(t) {
        t.field(Kecamatan.id);
        t.field(Kecamatan.kode_kecamatan);
        t.field(Kecamatan.nama);
        t.field(Kecamatan.mahasiswaList);
        t.field(Kecamatan.kelurahanList);
        t.field(Kecamatan.kota);
        t.field(Kecamatan.kota_id);
        t.field(Kecamatan.created_at);
        t.field(Kecamatan.updated_at);
        t.field(Kecamatan.deleted_at);
    },
});

export const KecamatanListObject = objectType({
    name: 'KecamatanList',
    description: 'Objek yang merepresentasikan daftar kecamatan dengan paginasi',
    definition(t) {
        t.nonNull.list.nonNull.field('data', {
            type: Kecamatan.$name,
            description: 'Daftar objek kecamatan'
        });
        t.nonNull.int('total', {
            description: 'Jumlah total data kecamatan yang sesuai dengan query'
        });
    },
}); 