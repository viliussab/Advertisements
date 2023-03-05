import zod from 'zod';

const planeSchema = zod.object({
  partialName: zod.string(),

  isPermitted: zod.boolean(),

  permissionExpiryDate: zod.date().nullable(),

  isPremium: zod.boolean(),
});

export const createAdvertObjectSchema = zod.object({
  serialCode: zod.string(),

  areaId: zod.string(),

  typeId: zod.string(),

  name: zod.string(),

  latitude: zod.number().gte(-90).lte(90),

  longitude: zod.number().gte(-180).lte(180),

  address: zod.string(),

  region: zod.string(),

  isIlluminated: zod.boolean(),

  planes: zod.array(planeSchema),
});

export type CreateAdvertObject = zod.TypeOf<typeof createAdvertObjectSchema>;
