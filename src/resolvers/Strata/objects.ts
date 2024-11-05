import { objectType } from 'nexus';
import { Strata } from 'nexus-prisma';

export const StrataObject = objectType({
    name: Strata.$name,
    description: 'Objek yang merepresentasikan data strata pendidikan dalam sistem',
    definition(t) {
        t.field(Strata.id);
        t.field(Strata.nama);
        t.field(Strata.programStudiList);
        t.field(Strata.created_at);
        t.field(Strata.updated_at);
    },
});

export const StrataListObject = objectType({
    name: 'StrataList',
    description: 'Objek yang merepresentasikan daftar strata dengan paginasi',
    definition(t) {
        t.nonNull.list.nonNull.field('data', {
            type: Strata.$name,
            description: 'Daftar objek strata'
        });
        t.nonNull.int('total', {
            description: 'Jumlah total data strata yang sesuai dengan query'
        });
    },
}); 