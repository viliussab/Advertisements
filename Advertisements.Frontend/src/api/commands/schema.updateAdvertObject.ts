import zod from 'zod';
import { fileUpdateSchema } from './primitives/schema.file';
import { updateStatusSchema } from './primitives/schema.updateStatus';

const planeSchema = zod.object({
  partialName: zod.string(),
  isPermitted: zod.boolean(),
  permissionExpiryDate: zod.date().nullable(),
  isPremium: zod.boolean(),
  updateStatus: updateStatusSchema,
  photos: zod.array(fileUpdateSchema),
});

export const updateAdvertObjectSchema = zod.object({
  id: zod.string().nullish(),
  serialCode: zod.string(),
  areaId: zod.string(),
  typeId: zod.string(),
  name: zod.string(),
  latitude: zod.coerce.number().gte(-90).lte(90),
  longitude: zod.coerce.number().gte(-180).lte(180),
  address: zod.string(),
  region: zod.string(),
  illuminated: zod.boolean(),
  planes: zod.array(planeSchema),
});

export type UpdateAdvertObject = zod.TypeOf<typeof updateAdvertObjectSchema>;
