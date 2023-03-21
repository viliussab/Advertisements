import zod from 'zod';
import { updateStatusSchema } from './schema.updateStatus';

export const fileCreateSchema = zod.object({
  mime: zod.string(),
  base64: zod.string(),
  name: zod.string(),
});

export const fileUpdateSchema = zod.object({
  mime: zod.string(),
  base64: zod.string(),
  name: zod.string(),
  updateStatus: updateStatusSchema,
});

export type FileCreate = zod.TypeOf<typeof fileCreateSchema>;
export type FileUpdate = zod.TypeOf<typeof fileUpdateSchema>;
