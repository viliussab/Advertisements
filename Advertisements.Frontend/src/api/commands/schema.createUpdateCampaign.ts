import zod from 'zod';

export const CampaignCreateUpdateSchema = zod.object({
  customerId: zod.string().min(1, 'Pasirinkite užsakovą'),
  name: zod.string().min(1, 'Kampanijos pavadinimas yra būtinas'),
  pricePerPlane: zod.number(),
  periodStart: zod.date(),
  periodEnd: zod.date(),
  price: zod.number(),
  planeAmount: zod.number(),
  requiresPrinting: zod.boolean(),
  discountPercent: zod.number().min(0).max(99),
});

export type CampaignCreateUpdate = zod.TypeOf<
  typeof CampaignCreateUpdateSchema
>;
