import zod from 'zod';

export const CampaignCreateUpdateSchema = zod.object({
  customerId: zod.string().min(1, 'Pasirinkite užsakovą'),
  name: zod.string().min(1, 'Kampanijos pavadinimas yra būtinas'),
  pricePerPlane: zod.coerce.number(),
  start: zod.date(),
  end: zod.date(),
  planeAmount: zod.coerce.number(),
  requiresPrinting: zod.boolean(),
  discountPercent: zod.coerce.number().min(0).max(99),
});

export type CampaignCreateUpdate = zod.TypeOf<
  typeof CampaignCreateUpdateSchema
>;
