import { queryField, nonNull, intArg } from 'nexus';
import { ApprovalLog } from 'nexus-prisma';
import { ApprovalLogWhereInput } from './inputs';

export const approvalLogGet = queryField('approvalLogGet', {
  type: ApprovalLog.$name,
  description: 'Get a single approvalLog by ID',
  args: {
    id: nonNull(intArg()),
  },
  resolve: async (_, { id }, { prisma }) => {
    const approvalLog = await prisma.approvalLog.findUnique({
      where: { id },
    });
    if (!approvalLog) throw new Error('ApprovalLog not found');
    return approvalLog;
  },
});

export const approvalLogGetList = queryField('approvalLogGetList', {
  type: 'ApprovalLogList',
  description: 'Get a paginated list of approvalLogs with optional filtering and sorting',
  args: {
    where: ApprovalLogWhereInput,
  },
  resolve: async (_, { where }, { prisma }) => {
    const { search, approval_id, penerimaan_id, user_id, sortBy, descending, take = 10, skip = 0 } = where || {};

    const whereClause = search
      ? {
        AND: [
          search ? {
            OR: [
              { name: { contains: search } },
              { description: { contains: search } },
            ],
          } : {},
          approval_id ? { approval_id } : {},
          penerimaan_id ? { penerimaan_id } : {},
          user_id ? { user_id } : {},
        ],
      }
      : {};

    const orderBy = sortBy ? { [sortBy]: descending ? 'desc' : 'asc' } : undefined;

    const [data, total] = await Promise.all([
      prisma.approvalLog.findMany({
        where: whereClause,
        orderBy,
        take,
        skip,
      }),
      prisma.approvalLog.count({ where: whereClause }),
    ]);

    return { data, total };
  },
});
