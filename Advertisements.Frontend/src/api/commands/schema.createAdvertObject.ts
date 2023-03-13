import zod from 'zod';

const imageSchema = zod.object({
  mime: zod.string(),
  base64: zod.string(),
  name: zod.string(),
});

const planeSchema = zod.object({
  partialName: zod.string(),

  isPermitted: zod.boolean(),

  permissionExpiryDate: zod.date().nullable(),

  isPremium: zod.boolean(),

  images: zod.array(imageSchema),
});

export const createAdvertObjectSchema = zod.object({
  serialCode: zod.string(),

  areaId: zod.string(),

  typeId: zod.string(),

  name: zod.string(),

  latitude: zod.coerce.number().gte(-90).lte(90),

  longitude: zod.coerce.number().gte(-180).lte(180),

  address: zod.string(),

  region: zod.string(),

  isIlluminated: zod.boolean(),

  planes: zod.array(planeSchema),
});

export type CreateAdvertObjectImage = zod.TypeOf<typeof imageSchema>;

export type CreateAdvertObject = zod.TypeOf<typeof createAdvertObjectSchema>;
