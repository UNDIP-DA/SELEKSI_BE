import { queryField, nonNull, intArg } from 'nexus';
import { Approval } from 'nexus-prisma';
import { ApprovalWhereInput } from './inputs';

export const approvalGet = queryField('approvalGet', {
  type: Approval.$name,
  description: 'Get a single approval by ID',
  args: {
    id: nonNull(intArg()),
  },
  resolve: async (_, { id }, { prisma }) => {
    const approval = await prisma.approval.findUnique({
      where: { id },
    });
    if (!approval) throw new Error('Approval not found');
    return approval;
  },
});

export const approvalGetList = queryField('approvalGetList', {
  type: 'ApprovalList',
  description: 'Get a paginated list of approvals with optional filtering and sorting',
  args: {
    where: ApprovalWhereInput,
  },
  resolve: async (_, { where }, { prisma }) => {
    const { search, role_id, sortBy, descending, take = 10, skip = 0 } = where || {};

    const whereClause = search
      ? {
        AND: [
          search ? {
            OR: [
              { name: { contains: search } },
              { description: { contains: search } },
            ],
          } : {},
          role_id ? { role_id } : {},
        ],
      }
      : {};

    const orderBy = sortBy ? { [sortBy]: descending ? 'desc' : 'asc' } : undefined;

    const [data, total] = await Promise.all([
      prisma.approval.findMany({
        where: whereClause,
        orderBy,
        take,
        skip,
      }),
      prisma.approval.count({ where: whereClause }),
    ]);

    return { data, total };
  },
});
