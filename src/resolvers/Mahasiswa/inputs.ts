import { inputObjectType } from 'nexus';

export const MahasiswaCreateInput = inputObjectType({
    name: 'MahasiswaCreateInput',
    description: 'Input untuk membuat data mahasiswa baru',
    definition(t) {
        // Data Pribadi Wajib
        t.nonNull.string('nama', {
            description: 'Nama lengkap mahasiswa'
        })
        t.nonNull.string('jenis_kelamin', {
            description: 'Jenis kelamin mahasiswa (L/P)'
        })
        t.nonNull.int('programStudi_id', {
            description: 'ID program studi mahasiswa'
        })
        t.nonNull.int('penerimaan_id', {
            description: 'ID penerimaan mahasiswa'
        })
        t.nonNull.int('jalur_id', {
            description: 'ID jalur penerimaan mahasiswa'
        })

        // Data Pribadi Opsional
        t.string('uuid', {
            description: 'UUID mahasiswa (optional)'
        })
        t.string('nomor_peserta', {
            description: 'Nomor peserta mahasiswa'
        })
        t.boolean('status_kip', {
            description: 'Status KIP mahasiswa'
        })
        t.string('tempat_lahir', {
            description: 'Tempat lahir mahasiswa'
        })
        t.field('tanggal_lahir', {
            type: 'DateTime',
            description: 'Tanggal lahir mahasiswa'
        })
        t.string('golongan_darah', {
            description: 'Golongan darah mahasiswa'
        })
        t.string('nik', {
            description: 'NIK mahasiswa'
        })

        // Relasi IDs
        t.int('agama_id', {
            description: 'ID agama mahasiswa'
        })
        t.int('negara_id', {
            description: 'ID negara mahasiswa'
        })
        t.int('wilayah_id', {
            description: 'ID wilayah mahasiswa'
        })

        // Data Akademik
        t.string('nim_sebelumnya', {
            description: 'NIM sebelumnya (untuk mahasiswa pindahan)'
        })
        t.float('ipk', {
            description: 'IPK mahasiswa'
        })
        t.float('ukt', {
            description: 'Nominal UKT mahasiswa'
        })
        t.float('spp', {
            description: 'Nominal SPP mahasiswa'
        })
        t.boolean('matrikulasi', {
            description: 'Status matrikulasi mahasiswa'
        })
        t.string('kelas', {
            description: 'Kelas mahasiswa'
        })

        // Data Kontak dan Alamat
        t.string('email', {
            description: 'Alamat email mahasiswa'
        })
        t.string('no_hp', {
            description: 'Nomor HP mahasiswa'
        })
        t.string('alamat', {
            description: 'Alamat lengkap mahasiswa'
        })
        t.string('nama_desa', {
            description: 'Nama desa mahasiswa'
        })
        t.string('nama_dusun', {
            description: 'Nama dusun mahasiswa'
        })
        t.string('rt', {
            description: 'RT mahasiswa'
        })
        t.string('rw', {
            description: 'RW mahasiswa'
        })
        t.string('kode_pos', {
            description: 'Kode pos mahasiswa'
        })

        // Data Tambahan
        t.string('riwayat_pendidikan_sma', {
            description: 'Riwayat pendidikan SMA'
        })
        t.string('riwayat_pendidikan_univ', {
            description: 'Riwayat pendidikan universitas'
        })
        t.string('nama_ayah', {
            description: 'Data ayah mahasiswa'
        })
        t.string('nama_ibu', {
            description: 'Data ibu mahasiswa'
        })
        t.string('nama_wali', {
            description: 'Data wali mahasiswa'
        })
        t.string('foto', {
            description: 'URL foto mahasiswa'
        })
        t.string('ijazah', {
            description: 'URL ijazah mahasiswa'
        })
    },
})

export const MahasiswaUpdateInput = inputObjectType({
    name: 'MahasiswaUpdateInput',
    description: 'Input untuk mengupdate data mahasiswa baru',
    definition(t) {
        // Data Pribadi Wajib
        t.string('nama', {
            description: 'Nama lengkap mahasiswa'
        })
        t.string('jenis_kelamin', {
            description: 'Jenis kelamin mahasiswa (L/P)'
        })
        t.int('programStudi_id', {
            description: 'ID program studi mahasiswa'
        })
        t.int('penerimaan_id', {
            description: 'ID penerimaan mahasiswa'
        })
        t.int('jalur_id', {
            description: 'ID jalur penerimaan mahasiswa'
        })

        // Data Pribadi Opsional
        t.string('uuid', {
            description: 'UUID mahasiswa (optional)'
        })
        t.string('nomor_peserta', {
            description: 'Nomor peserta mahasiswa'
        })
        t.boolean('status_kip', {
            description: 'Status KIP mahasiswa'
        })
        t.string('tempat_lahir', {
            description: 'Tempat lahir mahasiswa'
        })
        t.field('tanggal_lahir', {
            type: 'DateTime',
            description: 'Tanggal lahir mahasiswa'
        })
        t.string('golongan_darah', {
            description: 'Golongan darah mahasiswa'
        })
        t.string('nik', {
            description: 'NIK mahasiswa'
        })

        // Relasi IDs
        t.int('agama_id', {
            description: 'ID agama mahasiswa'
        })
        t.int('negara_id', {
            description: 'ID negara mahasiswa'
        })
        t.int('wilayah_id', {
            description: 'ID wilayah mahasiswa'
        })

        // Data Akademik
        t.string('nim_sebelumnya', {
            description: 'NIM sebelumnya (untuk mahasiswa pindahan)'
        })
        t.float('ipk', {
            description: 'IPK mahasiswa'
        })
        t.float('ukt', {
            description: 'Nominal UKT mahasiswa'
        })
        t.float('spp', {
            description: 'Nominal SPP mahasiswa'
        })
        t.boolean('matrikulasi', {
            description: 'Status matrikulasi mahasiswa'
        })
        t.string('kelas', {
            description: 'Kelas mahasiswa'
        })

        // Data Kontak dan Alamat
        t.string('email', {
            description: 'Alamat email mahasiswa'
        })
        t.string('no_hp', {
            description: 'Nomor HP mahasiswa'
        })
        t.string('alamat', {
            description: 'Alamat lengkap mahasiswa'
        })
        t.string('nama_desa', {
            description: 'Nama desa mahasiswa'
        })
        t.string('nama_dusun', {
            description: 'Nama dusun mahasiswa'
        })
        t.string('rt', {
            description: 'RT mahasiswa'
        })
        t.string('rw', {
            description: 'RW mahasiswa'
        })
        t.string('kode_pos', {
            description: 'Kode pos mahasiswa'
        })

        // Data Tambahan
        t.string('riwayat_pendidikan_sma', {
            description: 'Riwayat pendidikan SMA'
        })
        t.string('riwayat_pendidikan_univ', {
            description: 'Riwayat pendidikan universitas'
        })
        t.string('nama_ayah', {
            description: 'Data ayah mahasiswa'
        })
        t.string('nama_ibu', {
            description: 'Data ibu mahasiswa'
        })
        t.string('nama_wali', {
            description: 'Data wali mahasiswa'
        })
        t.string('foto', {
            description: 'URL foto mahasiswa'
        })
        t.string('ijazah', {
            description: 'URL ijazah mahasiswa'
        })

    },
})

export const MahasiswaSyncInput = inputObjectType({
    name: 'MahasiswaSyncInput',
    description: 'Input untuk mengsinkron data mahasiswa dari input kode jalur',
    definition(t) {
        t.nonNull.int('pembukaan_jalur_id', {
            description: 'ID pembukaan jalur pada PMB penerimaan (wajib diisi)'
        });
        t.nonNull.int('penerimaan_id', {
            description: 'ID penerimaan (wajib diisi)'
        });
    },
});

export const MahasiswaWhereInput = inputObjectType({
    name: 'MahasiswaWhereInput',
    description: 'Input type for filtering and pagination of mahasiswa',
    definition(t) {
        t.string('search', {
            description: 'Search term to filter mahasiswa by nama, nomor_peserta, or nik'
        })
        t.string('sortBy', {
            description: 'Field name to sort the results by'
        })
        t.boolean('descending', {
            description: 'Sort in descending order if true, ascending if false'
        })
        t.int('take', {
            description: 'Number of records to take (limit)'
        })
        t.int('skip', {
            description: 'Number of records to skip (offset)'
        })

        // Filter tambahan
        t.int('programStudi_id', {
            description: 'Filter by program studi'
        })
        t.int('penerimaan_id', {
            description: 'Filter by penerimaan'
        })
        t.int('jalur_id', {
            description: 'Filter by jalur'
        })
        t.boolean('status_kip', {
            description: 'Filter by status KIP'
        })
    },
}) 