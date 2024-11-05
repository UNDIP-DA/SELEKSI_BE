import { objectType } from 'nexus';
import { ProgramStudi } from 'nexus-prisma';

export const ProgramStudiObject = objectType({
    name: ProgramStudi.$name,
    description: 'Objek yang merepresentasikan data program studi dalam sistem',
    definition(t) {
        t.field(ProgramStudi.id);
        t.field(ProgramStudi.nama);
        t.field(ProgramStudi.fakultas_id);
        t.field(ProgramStudi.strata_id);
        t.field(ProgramStudi.status);
        t.field(ProgramStudi.fakultas);
        t.field(ProgramStudi.strata);
        t.field(ProgramStudi.mahasiswaList);
        t.field(ProgramStudi.created_at);
        t.field(ProgramStudi.updated_at);
    },
});

export const ProgramStudiListObject = objectType({
    name: 'ProgramStudiList',
    description: 'Objek yang merepresentasikan daftar program studi dengan paginasi',
    definition(t) {
        t.nonNull.list.nonNull.field('data', {
            type: ProgramStudi.$name,
            description: 'Daftar objek program studi'
        });
        t.nonNull.int('total', {
            description: 'Jumlah total data program studi yang sesuai dengan query'
        });
    },
}); 