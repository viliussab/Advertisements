import zod from 'zod';

export const updateStatusSchema = zod.enum(['Existing', 'Deleted', 'New']);
export type UpdateStatus = zod.TypeOf<typeof updateStatusSchema>;
