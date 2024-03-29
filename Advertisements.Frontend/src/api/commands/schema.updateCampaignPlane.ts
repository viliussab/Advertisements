import zod from 'zod';

export const updateCampaignPlaneSchema = zod.object({
  planeId: zod.string(),
  weekFrom: zod.date(),
  weekTo: zod.date(),
});

export type UpdateCampaignPlane = zod.TypeOf<
  typeof updateCampaignPlaneSchema
> & {
  campaignId: string;
};
