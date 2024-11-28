import { objectType } from 'nexus';
import { Approval } from 'nexus-prisma';

export const ApprovalObject = objectType({
    name: Approval.$name,
    description: 'Object representing a approval in the system',
    definition(t) {
        t.field(Approval.id);
        t.field(Approval.nama);
        t.field(Approval.approvalLogList);
        t.field(Approval.penerimaanList);
        t.field(Approval.role);
        t.field(Approval.role_id);
        t.field(Approval.created_at);
        t.field(Approval.updated_at);

    },
});

export const ApprovalListObject = objectType({
    name: 'ApprovalList',
    description: 'Object representing a paginated list of approvals',
    definition(t) {
        t.nonNull.list.nonNull.field('data', {
            type: Approval.$name,
            description: 'Array of approval objects'
        });
        t.nonNull.int('total', {
            description: 'Total count of approvals matching the query'
        });
    },
});