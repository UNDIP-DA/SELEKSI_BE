import { objectType } from 'nexus';
import { Agama } from 'nexus-prisma';

export const AgamaObject = objectType({
    name: Agama.$name,
    description: 'Objek yang merepresentasikan data agama dalam sistem',
    definition(t) {
        t.field(Agama.id);
        t.field(Agama.nama);
        t.field(Agama.mahasiswaList);
        t.field(Agama.created_at);
        t.field(Agama.updated_at);
        t.field(Agama.deleted_at);
    },
});

export const AgamaListObject = objectType({
    name: 'AgamaList',
    description: 'Objek yang merepresentasikan daftar agama dengan paginasi',
    definition(t) {
        t.nonNull.list.nonNull.field('data', {
            type: Agama.$name,
            description: 'Daftar objek agama'
        });
        t.nonNull.int('total', {
            description: 'Jumlah total data agama yang sesuai dengan query'
        });
    },
}); 