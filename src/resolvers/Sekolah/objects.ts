import { objectType } from 'nexus';
import { Sekolah } from 'nexus-prisma';

export const SekolahObject = objectType({
    name: Sekolah.$name,
    description: 'Objek yang merepresentasikan data sekolah dalam sistem',
    definition(t) {
        t.field(Sekolah.id);
        t.field(Sekolah.kode_sekolah);
        t.field(Sekolah.nama_sekolah);
        t.field(Sekolah.alamat);
        t.field(Sekolah.kelurahan);
        t.field(Sekolah.wilayah);
        t.field(Sekolah.wilayah_id);
        t.field(Sekolah.status);
        t.field(Sekolah.tipe);
        t.field(Sekolah.created_at);
        t.field(Sekolah.updated_at);
        t.field(Sekolah.deleted_at);
    },
});

export const SekolahListObject = objectType({
    name: 'SekolahList',
    description: 'Objek yang merepresentasikan daftar sekolah dengan paginasi',
    definition(t) {
        t.nonNull.list.nonNull.field('data', {
            type: Sekolah.$name,
            description: 'Daftar objek sekolah'
        });
        t.nonNull.int('total', {
            description: 'Jumlah total data sekolah yang sesuai dengan query'
        });
    },
}); 