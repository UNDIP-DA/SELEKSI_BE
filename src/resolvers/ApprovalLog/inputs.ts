import { inputObjectType } from 'nexus';

export const ApprovalLogCreateInput = inputObjectType({
    name: 'ApprovalLogCreateInput',
    description: 'Input type for creating a new approval',
    definition(t) {
        t.nonNull.int('approval_id', {
            description: 'Approval ID approval log (wajib diisi)'
        });
        t.nonNull.int('penerimaan_id', {
            description: 'Penerimaaan ID approval log (wajib diisi)'
        });
        t.nonNull.int('user_id', {
            description: 'User ID approval log (wajib diisi)'
        });
        t.string('catatan', {
            description: 'Catatan (optional)'
        });
    },
});

export const ApprovalLogUpdateInput = inputObjectType({
    name: 'ApprovalLogUpdateInput',
    description: 'Input type for updating an existing approval',
    definition(t) {
        t.int('approval_id', {
            description: 'Approval ID approval log'
        });
        t.int('penerimaan_id', {
            description: 'Penerimaaan ID approval log'
        });
        t.int('user_id', {
            description: 'User ID approval log'
        });
        t.string('catatan', {
            description: 'Catatan'
        });
    },
});

export const ApprovalLogWhereInput = inputObjectType({
    name: 'ApprovalLogWhereInput',
    description: 'Input type for filtering and pagination of approval logs',
    definition(t) {
        t.string('search', {
            description: 'Search term to filter approval logs by name or description'
        });
        t.int('approval_id', {
            description: 'ID approval'
        })
        t.int('penerimaan_id', {
            description: 'ID penerimaan'
        })
        t.int('user_id', {
            description: 'ID user'
        })
        t.string('sortBy', {
            description: 'Field name to sort the results by'
        });
        t.boolean('descending', {
            description: 'Sort in descending order if true, ascending if false'
        });
        t.int('take', {
            description: 'Number of records to take (limit)'
        });
        t.int('skip', {
            description: 'Number of records to skip (offset)'
        });
    },
});