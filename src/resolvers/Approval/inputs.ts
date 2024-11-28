import { inputObjectType } from 'nexus';

export const ApprovalCreateInput = inputObjectType({
    name: 'ApprovalCreateInput',
    description: 'Input type for creating a new approval',
    definition(t) {
        t.nonNull.string('nama', {
            description: 'Nama approval (wajib diisi)'
        });
        t.nonNull.int('role_id', {
            description: 'Role ID approval (wajib diisi)'
        });
    },
});

export const ApprovalUpdateInput = inputObjectType({
    name: 'ApprovalUpdateInput',
    description: 'Input type for updating an existing approval',
    definition(t) {
        t.string('nama', {
            description: 'Nama approval'
        });
        t.int('role_id', {
            description: 'Role ID approval'
        });
    },
});

export const ApprovalWhereInput = inputObjectType({
    name: 'ApprovalWhereInput',
    description: 'Input type for filtering and pagination of approvals',
    definition(t) {
        t.string('search', {
            description: 'Search term to filter approvals by name or description'
        });
        t.int('role_id', {
            description: 'ID role'
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