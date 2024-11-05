import { inputObjectType } from 'nexus';

export const MahasiswaCreateInput = inputObjectType({
    name: 'MahasiswaCreateInput',
    description: 'Input untuk membuat data mahasiswa baru',
    definition(t) {
        t.string('uuid');
        t.string('nomor_peserta');
        t.nonNull.string('nama', {
            description: 'Nama mahasiswa (wajib diisi)'
        });
        t.boolean('status_kip');
        t.string('tempat_lahir');
        t.field('tanggal_lahir', { type: 'DateTime' });
        t.nonNull.string('jenis_kelamin');
        t.string('golongan_darah');
        t.string('nik');
        t.string('alamat');
        t.string('rt');
        t.string('rw');
        t.string('kode_pos');
        t.string('email');
        t.string('no_hp');
        t.string('nim_sebelumnya');
        t.float('ipk');
        t.float('ukt');
        t.float('spp');
        t.boolean('matrikulasi');
        t.string('kelas');
        t.string('riwayat_pendidikan_sma');
        t.string('riwayat_pendidikan_univ');
        t.string('data_ayah');
        t.string('data_ibu');
        t.string('data_wali');
        t.string('foto');
        t.string('ijazah');

        // Relasi ID (Foreign Keys)
        t.int('agama_id');
        t.int('negara_id');
        t.int('provinsi_id');
        t.int('kota_id');
        t.int('kecamatan_id');
        t.int('kelurahan_id');
        t.nonNull.int('programStudi_id');
        t.nonNull.int('penerimaan_id');
        t.nonNull.int('jalur_id');
    },
});

export const MahasiswaUpdateInput = inputObjectType({
    name: 'MahasiswaUpdateInput',
    description: 'Input untuk memperbarui data mahasiswa yang sudah ada',
    definition(t) {
        // Semua field optional untuk update
        t.string('uuid');
        t.string('nomor_peserta');
        t.string('nama');
        t.boolean('status_kip');
        t.string('tempat_lahir');
        t.field('tanggal_lahir', { type: 'DateTime' });
        t.string('jenis_kelamin');
        t.string('golongan_darah');
        t.string('nik');
        t.string('alamat');
        t.string('rt');
        t.string('rw');
        t.string('kode_pos');
        t.string('email');
        t.string('no_hp');
        t.string('nim_sebelumnya');
        t.float('ipk');
        t.float('ukt');
        t.float('spp');
        t.boolean('matrikulasi');
        t.string('kelas');
        t.string('riwayat_pendidikan_sma');
        t.string('riwayat_pendidikan_univ');
        t.string('data_ayah');
        t.string('data_ibu');
        t.string('data_wali');
        t.string('foto');
        t.string('ijazah');

        // Relasi ID (Foreign Keys)
        t.int('agama_id');
        t.int('negara_id');
        t.int('provinsi_id');
        t.int('kota_id');
        t.int('kecamatan_id');
        t.int('kelurahan_id');
        t.int('programStudi_id');
        t.int('penerimaan_id');
        t.int('jalur_id');
    },
});

export const MahasiswaWhereInput = inputObjectType({
    name: 'MahasiswaWhereInput',
    description: 'Input untuk filter dan paginasi daftar mahasiswa',
    definition(t) {
        t.string('search', {
            description: 'Kata kunci pencarian untuk nama atau nomor_peserta'
        });
        t.int('programStudi_id', {
            description: 'Filter berdasarkan program studi'
        });
        t.int('penerimaan_id', {
            description: 'Filter berdasarkan penerimaan'
        });
        t.int('jalur_id', {
            description: 'Filter berdasarkan jalur'
        });
        t.string('sortBy', {
            description: 'Nama field untuk pengurutan data'
        });
        t.boolean('descending', {
            description: 'Urutkan menurun jika true, menaik jika false'
        });
        t.int('take', {
            description: 'Jumlah data yang diambil (limit)'
        });
        t.int('skip', {
            description: 'Jumlah data yang dilewati (offset)'
        });
    },
}); 