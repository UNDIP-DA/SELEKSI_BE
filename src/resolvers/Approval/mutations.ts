import { mutationField, nonNull, intArg } from 'nexus';
import { Approval } from 'nexus-prisma';
import { ApprovalCreateInput, ApprovalUpdateInput } from './inputs';

export const approvalCreate = mutationField('approvalCreate', {
  type: Approval.$name,
  description: 'Create a new approval',
  args: {
    data: nonNull(ApprovalCreateInput),
  },
  resolve: async (_, { data }, { prisma }) => {
    try {
      return await prisma.approval.create({
        data,
      });
    } catch (error) {
      throw new Error('Failed to create approval: ' + error);
    }
  },
});

export const approvalUpdate = mutationField('approvalUpdate', {
  type: Approval.$name,
  description: 'Update an existing approval',
  args: {
    id: nonNull(intArg()),
    data: nonNull(ApprovalUpdateInput),
  },
  resolve: async (_, { id, data }, { prisma }) => {
    try {
      return await prisma.approval.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new Error('Failed to update approval: ' + error);
    }
  },
});

export const approvalDelete = mutationField('approvalDelete', {
  type: Approval.$name,
  description: 'Delete an existing approval',
  args: {
    id: nonNull(intArg()),
  },
  resolve: async (_, { id }, { prisma }) => {
    try {
      return await prisma.approval.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error('Failed to delete approval: ' + error);
    }
  },
});