import { queryField, nonNull, intArg } from 'nexus';
import { PembukaanJalur as PembukaanJalurModelFromPmb, fetch as qfetchFromPmb } from '../../datasources/pmb/query';

export const pembukaanJalurGetFromPmb = queryField('pembukaanJalurGetFromPmb', {
    type: "PembukaanJalurList",
    description: 'Mengambil pembukaanJalur dari pmb',
    resolve: async (_, { id }, { prisma }) => {
        try {
            // 
            const response1 = await qfetchFromPmb<{ pembukaanJalurGetList: { total: number } }>({ gqlQuery: 'pembukaanJalurTotal' });
            const pembukaanJalurTotal = response1.pembukaanJalurGetList.total;
            const response2 = await qfetchFromPmb<{ pembukaanJalurGetList: { data: PembukaanJalurModelFromPmb[] } }>({ gqlQuery: 'pembukaanJalurList', params: { take: pembukaanJalurTotal } });
            const pembukaanJalurList = response2.pembukaanJalurGetList.data;
            return { data: pembukaanJalurList, total: pembukaanJalurList.length };
        } catch (error) {
            throw new Error('Gagal sync data pembukaanJalur dari pmb: ' + error);
        }
    },
});