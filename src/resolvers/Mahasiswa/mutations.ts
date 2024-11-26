import { intArg, mutationField, nonNull } from 'nexus';
import { Mahasiswa } from 'nexus-prisma';
import { MahasiswaCreateInput, MahasiswaUpdateInput } from './inputs';
import { Mahasiswa as MahasiswaModelFromPmb, fetch as qfetchFromPmb } from '../../datasources/pmb/query';

export const mahasiswaCreate = mutationField('mahasiswaCreate', {
    type: Mahasiswa.$name,
    description: 'Membuat data mahasiswa baru',
    args: {
        data: nonNull(MahasiswaCreateInput),
    },
    resolve: async (_, { data }, { prisma }) => {
        try {
            return await prisma.mahasiswa.create({
                data,
            });
        } catch (error) {
            throw new Error('Gagal membuat data mahasiswa: ' + error);
        }
    },
});

export const mahasiswaUpdate = mutationField('mahasiswaUpdate', {
    type: Mahasiswa.$name,
    description: 'Memperbarui data mahasiswa yang sudah ada',
    args: {
        id: nonNull(intArg()),
        data: nonNull(MahasiswaUpdateInput),
    },
    resolve: async (_, { id, data }, { prisma }) => {
        try {
            return await prisma.mahasiswa.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new Error('Gagal memperbarui data mahasiswa: ' + error);
        }
    },
});

export const mahasiswaDelete = mutationField('mahasiswaDelete', {
    type: Mahasiswa.$name,
    description: 'Menghapus data mahasiswa',
    args: {
        id: nonNull(intArg()),
    },
    resolve: async (_, { id }, { prisma }) => {
        try {
            return await prisma.mahasiswa.delete({
                where: { id },
            });
        } catch (error) {
            throw new Error('Gagal menghapus data mahasiswa: ' + error);
        }
    },
});


export const mahasiswaSyncFromPmb = mutationField('mahasiswaSyncFromPmb', {
    type: 'Int',
    description: 'Mengsinkronkan data mahasiswa dari pmb',
    resolve: async (_, { id }, { prisma }) => {
        try {
            // 
            const response1 = await qfetchFromPmb<{ getListPendaftaran: { total: number } }>({ gqlQuery: 'pendaftaranTotal', params: { statusPenerimaan: 9 } });
            const mahasiswaTotal = response1.getListPendaftaran.total;
            // console.log('Total mahasiswa dari PMB:', mahasiswaTotal);
            const response2 = await qfetchFromPmb<{ getListPendaftaran: { data: MahasiswaModelFromPmb[] } }>({ gqlQuery: 'pendaftaranList', params: { statusPenerimaan: 9, take: mahasiswaTotal } });
            const mahasiswaList = response2.getListPendaftaran.data;
            for (const mahasiswa of mahasiswaList) {
                // console.log('mhs', mahasiswa.ProdiTerpilih);
                await prisma.mahasiswa.upsert({
                    where: { uuid: mahasiswa.uuid }, // Menggunakan ID sebagai unique identifier
                    update: {
                        // uuid: mahasiswa.uuid,
                        nomor_peserta: mahasiswa.nomor,
                        nama: mahasiswa.User.DataDiri.nama,
                        tempat_lahir: mahasiswa.User.DataDiri.tempat_lahir,
                        tanggal_lahir: mahasiswa.User.DataDiri.tanggal_lahir
                            ? new Date(mahasiswa.User.DataDiri.tanggal_lahir)
                            : null,
                        jenis_kelamin: mahasiswa.User.DataDiri.jenis_kelamin,
                        golongan_darah: mahasiswa.User.DataDiri.golongan_darah ?? null,
                        agama_id: mahasiswa.User.DataDiri.Agama.id,
                        nik: mahasiswa.User.DataDiri.no_ktp ?? null,
                        negara_id: mahasiswa.User.DataDiri.Negara.id,
                        wilayah_id: mahasiswa.User.DataDiri.Wilayah.id,
                        nama_desa: mahasiswa.User.DataDiri.nama_desa,
                        nama_dusun: mahasiswa.User.DataDiri.nama_dusun ?? null,
                        alamat: mahasiswa.User.DataDiri.alamat,
                        rt: mahasiswa.User.DataDiri.rt ?? null,
                        rw: mahasiswa.User.DataDiri.rw ?? null,
                        kode_pos: mahasiswa.User.DataDiri.kode_pos ?? null,
                        email: mahasiswa.User.email,
                        no_hp: mahasiswa.User.telepon,
                        programStudi_id: mahasiswa.ProdiTerpilih?.ProgramStudi.id ?? null,
                        riwayat_pendidikan_sma: mahasiswa.User.DataPendidikan[0].Sekolah?.nama_sekolah ?? null,
                        riwayat_pendidikan_univ: mahasiswa.User.DataPendidikan[0].Universitas?.nama ?? null,
                        foto: mahasiswa.User.DataDiri.foto_url,
                        ijazah: mahasiswa.User.DataPendidikan[0].Jenjang.nama,
                        // penerimaan_id:  
                    },
                    create: {
                        uuid: mahasiswa.uuid,
                        nomor_peserta: mahasiswa.nomor,
                        nama: mahasiswa.User.DataDiri.nama,
                        tempat_lahir: mahasiswa.User.DataDiri.tempat_lahir,
                        tanggal_lahir: mahasiswa.User.DataDiri.tanggal_lahir
                            ? new Date(mahasiswa.User.DataDiri.tanggal_lahir)
                            : null,
                        jenis_kelamin: mahasiswa.User.DataDiri.jenis_kelamin,
                        golongan_darah: mahasiswa.User.DataDiri.golongan_darah ?? null,
                        agama_id: mahasiswa.User.DataDiri.Agama.id,
                        nik: mahasiswa.User.DataDiri.no_ktp ?? null,
                        negara_id: mahasiswa.User.DataDiri.Negara.id,
                        wilayah_id: mahasiswa.User.DataDiri.Wilayah.id,
                        nama_desa: mahasiswa.User.DataDiri.nama_desa,
                        nama_dusun: mahasiswa.User.DataDiri.nama_dusun ?? null,
                        alamat: mahasiswa.User.DataDiri.alamat,
                        rt: mahasiswa.User.DataDiri.rt ?? null,
                        rw: mahasiswa.User.DataDiri.rw ?? null,
                        kode_pos: mahasiswa.User.DataDiri.kode_pos ?? null,
                        email: mahasiswa.User.email,
                        no_hp: mahasiswa.User.telepon,
                        programStudi_id: mahasiswa.ProdiTerpilih?.ProgramStudi.id ?? null,
                        riwayat_pendidikan_sma: mahasiswa.User.DataPendidikan[0].Sekolah?.nama_sekolah ?? null,
                        riwayat_pendidikan_univ: mahasiswa.User.DataPendidikan[0].Universitas?.nama ?? null,
                        foto: mahasiswa.User.DataDiri.foto_url,
                        ijazah: mahasiswa.User.DataPendidikan[0].Jenjang.nama,
                        // penerimaan_id:  
                    },
                });
            }
            return prisma.mahasiswa.count();
        } catch (error) {
            throw new Error('Gagal sync data mahasiswa dari pmb: ' + error);
        }
    },
});