import { objectType } from 'nexus'
import { Mahasiswa } from 'nexus-prisma'

export const MahasiswaObject = objectType({
    name: Mahasiswa.$name,
    description: 'Object representing a mahasiswa in the system',
    definition(t) {
        // ID dan UUID
        t.field(Mahasiswa.id)
        t.field(Mahasiswa.uuid)

        // Data Pribadi
        t.field(Mahasiswa.nomor_peserta)
        t.field(Mahasiswa.nama)
        t.field(Mahasiswa.status_kip)
        t.field(Mahasiswa.tempat_lahir)
        t.field(Mahasiswa.tanggal_lahir)
        t.field(Mahasiswa.jenis_kelamin)
        t.field(Mahasiswa.golongan_darah)
        t.field(Mahasiswa.nik)

        // Relasi Agama
        t.field(Mahasiswa.agama)
        t.field(Mahasiswa.agama_id)

        // Relasi Negara dan Wilayah
        t.field(Mahasiswa.negara)
        t.field(Mahasiswa.negara_id)
        t.field(Mahasiswa.wilayah)
        t.field(Mahasiswa.wilayah_id)

        // Alamat
        t.field(Mahasiswa.nama_desa)
        t.field(Mahasiswa.nama_dusun)
        t.field(Mahasiswa.alamat)
        t.field(Mahasiswa.rt)
        t.field(Mahasiswa.rw)
        t.field(Mahasiswa.kode_pos)

        // Kontak
        t.field(Mahasiswa.email)
        t.field(Mahasiswa.no_hp)

        // Akademik
        t.field(Mahasiswa.nim_sebelumnya)
        t.field(Mahasiswa.programStudi)
        t.field(Mahasiswa.programStudi_id)
        t.field(Mahasiswa.ipk)
        t.field(Mahasiswa.ukt)
        t.field(Mahasiswa.spp)
        t.field(Mahasiswa.matrikulasi)
        t.field(Mahasiswa.kelas)

        // Riwayat Pendidikan
        t.field(Mahasiswa.riwayat_pendidikan_sma)
        t.field(Mahasiswa.riwayat_pendidikan_univ)

        // Data Keluarga
        t.field(Mahasiswa.data_ayah)
        t.field(Mahasiswa.data_ibu)
        t.field(Mahasiswa.data_wali)

        // Dokumen
        t.field(Mahasiswa.foto)
        t.field(Mahasiswa.ijazah)

        // Relasi Penerimaan dan Jalur
        t.field(Mahasiswa.penerimaan)
        t.field(Mahasiswa.penerimaan_id)
        // t.field(Mahasiswa.jalur)
        // t.field(Mahasiswa.jalur_id)

        // Timestamp
        t.field(Mahasiswa.created_at)
        t.field(Mahasiswa.updated_at)
    },
})

export const MahasiswaListObject = objectType({
    name: 'MahasiswaList',
    description: 'Object representing a paginated list of mahasiswa',
    definition(t) {
        t.nonNull.list.nonNull.field('data', {
            type: Mahasiswa.$name,
            description: 'Array of mahasiswa objects'
        })
        t.nonNull.int('total', {
            description: 'Total count of mahasiswa matching the query'
        })
    },
}) 