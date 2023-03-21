import zod from 'zod';

export const updateStatusSchema = zod.enum(['Existing', 'Deleted', 'New']);
