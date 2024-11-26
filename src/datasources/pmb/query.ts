import { GraphQLClient, Variables } from 'graphql-request';
import { readFileSync } from 'fs';
import { join } from 'path';

const PMB_ENDPOINT = process.env.PMB_ENDPOINT || '';
const PMB_USERNAME = process.env.PMB_USERNAME || '';
const PMB_PASSWORD = process.env.PMB_PASSWORD || '';

const client = new GraphQLClient(PMB_ENDPOINT, {
    headers: {
        Authorization: `Bearer YOUR_API_TOKEN`,
    },
});

const loginAndGetToken = async () => {
    const client = new GraphQLClient(PMB_ENDPOINT);

    try {
        const loginMutation = readFileSync(join(__dirname, './mutations/login.graphql'), 'utf8');
        const response = await client.request(loginMutation, { email: PMB_USERNAME, password: PMB_PASSWORD });
        const typedResponse = response as { signIn: { token: string } };
        return typedResponse.signIn.token; // Ambil token dari response
    } catch (error) {
        throw new Error('Error during login: ' + error);
    }
};

const createAuthenticatedClient = (token: string) => {
    return new GraphQLClient(PMB_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export interface Negara {
    id: number;
    nama: string;
    country_code: string;
    tel_code: string;
    status: number;
}

export interface Wilayah {
    id: number;
    kode: string;
    level: number;
    nama: string;
    parent_kode: string;
    ref_negara_id: number;
}

export interface Strata {
    id: number;
    strata: string;
    keterangan: string;
}

export interface Fakultas {
    id: number;
    nama: string;
}

export interface ProgramStudi {
    id: number;
    fakultas_id: number;
    strata_id: number;
    nama: string;
    status: number;
    uuid: string;
}

export interface Agama {
    id: number;
    agama: string;
}

export interface Mahasiswa {
    id: number;
    uuid: string;
    nomor: string;
    User: User;
    ProdiTerpilih?: ProdiTerpilih;
    PembukaanJalur: PembukaanJalur;
    status_penerimaan: number;
    StatusPenerimaan: StatusPenerimaan;
}

interface User {
    id: number;
    uuid: string;
    DataDiri: DataDiri;
    email: string;
    telepon: string;
    DataPendidikan: DataPendidikan[];
}

interface DataDiri {
    id: number;
    nama: string;
    tempat_lahir: string;
    tanggal_lahir: string; // Format date string
    jenis_kelamin: string;
    golongan_darah: string;
    Agama: Agama;
    no_ktp: string;
    Negara: Negara;
    Wilayah: Wilayah;
    nama_desa: string;
    nama_dusun: string;
    alamat: string;
    rt: string;
    rw: string;
    kode_pos: string;
    foto_url: string;
}

interface DataPendidikan {
    Jenjang: Jenjang;
    Sekolah?: Sekolah | null;
    Universitas?: Universitas | null;
}

interface Jenjang {
    id: number;
    nama: string;
}

export interface Sekolah {
    id: number;
    kode_sekolah: string;
    nama_sekolah: string;
    alamat: string;
    kelurahan: string;
    Wilayah?: Wilayah | null; // Wilayah bisa null atau undefined
    akreditasi: string;
    status: number;
    tipe: string;
}

export interface Universitas {
    id: number;
    id_pt: string;
    kode_pt: string;
    nama: string;
    Wilayah?: Wilayah | null; // Wilayah bisa null atau undefined
    status: number;
}

interface ProdiTerpilih {
    ProgramStudi: ProgramStudi;
}

export interface PembukaanJalur {
    id: number;
    uuid: string;
    nama_custom: string;
    Jalur: Jalur;
}

export interface Jalur {
    id: number;
    nama_jalur: string;
    kode_jalur: number;
}

interface StatusPenerimaan {
    id: number;
    nama: string;
}

export const fetch = async<T>(
    { gqlQuery, params }: { gqlQuery: string; params?: Variables }
): Promise<T> => {
    try {
        const query = readFileSync(join(__dirname, './queries/' + gqlQuery + '.graphql'), 'utf8');
        const authClient = createAuthenticatedClient(await loginAndGetToken());
        const response = await authClient.request(query, params);
        return response as T;
    } catch (error) {
        throw new Error('Error during fetch: ' + error);
    }
};