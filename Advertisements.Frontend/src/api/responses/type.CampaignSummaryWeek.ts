import CampaignOverview from './type.CampaignOverview';

type CampaignSummaryWeek = {
  week: string;
  reservedTotalPrice: number;
  confirmedTotalPrice: number;
  campaigns: CampaignOverview[];

  planesConfirmedTotalCount: number;
  planesReservedTotalCount: number;
  planeTotalCount: number;
  planeFreeTotalCount: number;
  planeOccupancyPercent: number;
};

export default CampaignSummaryWeek;
