import { objectType } from 'nexus';
import { Mahasiswa } from 'nexus-prisma';

export const MahasiswaObject = objectType({
    name: Mahasiswa.$name,
    description: 'Objek yang merepresentasikan data mahasiswa dalam sistem',
    definition(t) {
        t.field(Mahasiswa.id);
        t.field(Mahasiswa.uuid);
        t.field(Mahasiswa.nomor_peserta);
        t.field(Mahasiswa.nama);
        t.field(Mahasiswa.status_kip);
        t.field(Mahasiswa.tempat_lahir);
        t.field(Mahasiswa.tanggal_lahir);
        t.field(Mahasiswa.jenis_kelamin);
        t.field(Mahasiswa.golongan_darah);
        t.field(Mahasiswa.nik);
        t.field(Mahasiswa.alamat);
        t.field(Mahasiswa.rt);
        t.field(Mahasiswa.rw);
        t.field(Mahasiswa.kode_pos);
        t.field(Mahasiswa.email);
        t.field(Mahasiswa.no_hp);
        t.field(Mahasiswa.nim_sebelumnya);
        t.field(Mahasiswa.ipk);
        t.field(Mahasiswa.ukt);
        t.field(Mahasiswa.spp);
        t.field(Mahasiswa.matrikulasi);
        t.field(Mahasiswa.kelas);
        t.field(Mahasiswa.riwayat_pendidikan_sma);
        t.field(Mahasiswa.riwayat_pendidikan_univ);
        t.field(Mahasiswa.data_ayah);
        t.field(Mahasiswa.data_ibu);
        t.field(Mahasiswa.data_wali);
        t.field(Mahasiswa.foto);
        t.field(Mahasiswa.ijazah);

        // Relasi
        t.field(Mahasiswa.agama);
        t.field(Mahasiswa.agama_id);
        t.field(Mahasiswa.negara);
        t.field(Mahasiswa.negara_id);
        t.field(Mahasiswa.provinsi);
        t.field(Mahasiswa.provinsi_id);
        t.field(Mahasiswa.kota);
        t.field(Mahasiswa.kota_id);
        t.field(Mahasiswa.kecamatan);
        t.field(Mahasiswa.kecamatan_id);
        t.field(Mahasiswa.kelurahan);
        t.field(Mahasiswa.kelurahan_id);
        t.field(Mahasiswa.programStudi);
        t.field(Mahasiswa.programStudi_id);
        t.field(Mahasiswa.penerimaan);
        t.field(Mahasiswa.penerimaan_id);
        t.field(Mahasiswa.jalur);
        t.field(Mahasiswa.jalur_id);

        t.field(Mahasiswa.created_at);
        t.field(Mahasiswa.updated_at);
    },
});

export const MahasiswaListObject = objectType({
    name: 'MahasiswaList',
    description: 'Objek yang merepresentasikan daftar mahasiswa dengan paginasi',
    definition(t) {
        t.nonNull.list.nonNull.field('data', {
            type: Mahasiswa.$name,
            description: 'Daftar objek mahasiswa'
        });
        t.nonNull.int('total', {
            description: 'Jumlah total data mahasiswa yang sesuai dengan query'
        });
    },
}); 