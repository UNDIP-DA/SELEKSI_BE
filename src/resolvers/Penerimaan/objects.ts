import { objectType } from 'nexus';
import { Penerimaan } from 'nexus-prisma';

export const PenerimaanObject = objectType({
    name: Penerimaan.$name,
    description: 'Objek yang merepresentasikan data penerimaan mahasiswa dalam sistem',
    definition(t) {
        t.field(Penerimaan.id);
        t.field(Penerimaan.uuid);
        t.field(Penerimaan.nama);
        t.field(Penerimaan.keterangan);
        t.field(Penerimaan.catatan);
        t.field(Penerimaan.approval_id);
        t.field(Penerimaan.approval)
        t.field(Penerimaan.approvalLogList);
        t.field(Penerimaan.status);
        t.field(Penerimaan.mahasiswaList);
        t.field(Penerimaan.created_at);
        t.field(Penerimaan.updated_at);
    },
});

export const PenerimaanListObject = objectType({
    name: 'PenerimaanList',
    description: 'Objek yang merepresentasikan daftar penerimaan dengan paginasi',
    definition(t) {
        t.nonNull.list.nonNull.field('data', {
            type: Penerimaan.$name,
            description: 'Daftar objek penerimaan'
        });
        t.nonNull.int('total', {
            description: 'Jumlah total data penerimaan yang sesuai dengan query'
        });
    },
}); 