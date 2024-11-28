import { mutationField, nonNull, intArg } from 'nexus';
import { ApprovalLog } from 'nexus-prisma';
import { ApprovalLogCreateInput, ApprovalLogUpdateInput } from './inputs';

export const approvalLogCreate = mutationField('approvalLogCreate', {
  type: ApprovalLog.$name,
  description: 'Create a new approvalLog',
  args: {
    data: nonNull(ApprovalLogCreateInput),
  },
  resolve: async (_, { data }, { prisma }) => {
    try {
      return await prisma.approvalLog.create({
        data,
      });
    } catch (error) {
      throw new Error('Failed to create approvalLog: ' + error);
    }
  },
});

export const approvalLogUpdate = mutationField('approvalLogUpdate', {
  type: ApprovalLog.$name,
  description: 'Update an existing approvalLog',
  args: {
    id: nonNull(intArg()),
    data: nonNull(ApprovalLogUpdateInput),
  },
  resolve: async (_, { id, data }, { prisma }) => {
    try {
      return await prisma.approvalLog.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new Error('Failed to update approvalLog: ' + error);
    }
  },
});

export const approvalLogDelete = mutationField('approvalLogDelete', {
  type: ApprovalLog.$name,
  description: 'Delete an existing approvalLog',
  args: {
    id: nonNull(intArg()),
  },
  resolve: async (_, { id }, { prisma }) => {
    try {
      return await prisma.approvalLog.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error('Failed to delete approvalLog: ' + error);
    }
  },
});