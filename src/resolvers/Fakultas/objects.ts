import { objectType } from 'nexus';
import { Fakultas } from 'nexus-prisma';

export const FakultasObject = objectType({
    name: Fakultas.$name,
    description: 'Objek yang merepresentasikan data fakultas dalam sistem',
    definition(t) {
        t.field(Fakultas.id);
        t.field(Fakultas.nama);
        t.field(Fakultas.programStudiList);
        t.field(Fakultas.created_at);
        t.field(Fakultas.updated_at);
    },
});

export const FakultasListObject = objectType({
    name: 'FakultasList',
    description: 'Objek yang merepresentasikan daftar fakultas dengan paginasi',
    definition(t) {
        t.nonNull.list.nonNull.field('data', {
            type: Fakultas.$name,
            description: 'Daftar objek fakultas'
        });
        t.nonNull.int('total', {
            description: 'Jumlah total data fakultas yang sesuai dengan query'
        });
    },
}); 