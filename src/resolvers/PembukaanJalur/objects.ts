import { objectType } from 'nexus';

const PembukaanJalurName = 'PembukaanJalur';

export const PembukaanJalurObject = objectType({
    name: PembukaanJalurName,
    description: 'Objek yang merepresentasikan data negara dalam sistem',
    definition(t) {
        t.field("id", {
            type: "Int",
            description: "ID dari objek pembukaan jalur"
        });
        t.field("uuid", {
            type: "String",
            description: "UUID dari objek pembukaan jalur"
        });
        t.field("nama_custom", {
            type: "String",
            description: "Nama custom dari objek pembukaan jalur"
        });
    },
});

export const PembukaanJalurListObject = objectType({
    name: 'PembukaanJalurList',
    description: 'Objek yang merepresentasikan daftar pembukaan jalur dengan paginasi',
    definition(t) {
        t.nonNull.list.nonNull.field('data', {
            type: PembukaanJalurName,
            description: 'Daftar objek pembukaan jalur'
        });
        t.nonNull.int('total', {
            description: 'Jumlah total data pembukaan jalur yang sesuai dengan query'
        });
    },
}); 