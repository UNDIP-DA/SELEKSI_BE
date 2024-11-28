import { objectType } from 'nexus';
import { ApprovalLog } from 'nexus-prisma';

export const ApprovalLogObject = objectType({
    name: ApprovalLog.$name,
    description: 'Object representing a approval log in the system',
    definition(t) {
        t.field(ApprovalLog.id);
        t.field(ApprovalLog.approval);
        t.field(ApprovalLog.approval_id);
        t.field(ApprovalLog.penerimaan);
        t.field(ApprovalLog.penerimaan_id);
        t.field(ApprovalLog.user);
        t.field(ApprovalLog.user_id);
        t.field(ApprovalLog.created_at);
        t.field(ApprovalLog.updated_at);

    },
});

export const ApprovalLogListObject = objectType({
    name: 'ApprovalLogList',
    description: 'Object representing a paginated list of approval logs',
    definition(t) {
        t.nonNull.list.nonNull.field('data', {
            type: ApprovalLog.$name,
            description: 'Array of approval log objects'
        });
        t.nonNull.int('total', {
            description: 'Total count of approval logs matching the query'
        });
    },
});