import { objectType } from 'nexus'
import { Wilayah } from 'nexus-prisma'

export const WilayahObject = objectType({
    name: Wilayah.$name,
    description: 'Model untuk data wilayah administratif',
    definition(t) {
        t.field(Wilayah.id)
        t.field(Wilayah.kode_wilayah)
        t.field(Wilayah.parent_id)
        t.field(Wilayah.level)
        t.field(Wilayah.nama)
        t.field(Wilayah.status)

        // Relasi
        t.field(Wilayah.children)
        t.field(Wilayah.mahasiswaList)
        t.field(Wilayah.sekolahList)
        t.field(Wilayah.universitasList)
        t.field(Wilayah.negara)
        t.field(Wilayah.negara_id)

        // Timestamp
        t.field(Wilayah.created_at)
        t.field(Wilayah.updated_at)
        t.field(Wilayah.deleted_at)
    },
})

export const WilayahListObject = objectType({
    name: 'WilayahList',
    description: 'Daftar wilayah dengan paginasi',
    definition(t) {
        t.nonNull.list.nonNull.field('data', {
            type: Wilayah.$name,
            description: 'Daftar data wilayah'
        })
        t.nonNull.int('total', {
            description: 'Jumlah total data wilayah'
        })
    },
}) 