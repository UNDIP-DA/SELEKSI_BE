import { objectType } from 'nexus';
import { Universitas } from 'nexus-prisma';

export const UniversitasObject = objectType({
    name: Universitas.$name,
    description: 'Objek yang merepresentasikan data universitas dalam sistem',
    definition(t) {
        t.field(Universitas.id);
        t.field(Universitas.kode_pt);
        t.field(Universitas.nama);
        t.field(Universitas.wilayah);
        t.field(Universitas.wilayah_id);
        t.field(Universitas.status);
        t.field(Universitas.created_at);
        t.field(Universitas.updated_at);
        t.field(Universitas.deleted_at);
    },
});

export const UniversitasListObject = objectType({
    name: 'UniversitasList',
    description: 'Objek yang merepresentasikan daftar universitas dengan paginasi',
    definition(t) {
        t.nonNull.list.nonNull.field('data', {
            type: Universitas.$name,
            description: 'Daftar objek universitas'
        });
        t.nonNull.int('total', {
            description: 'Jumlah total data universitas yang sesuai dengan query'
        });
    },
}); 