import AdvertPlaneOverview from './type.AdvertPlaneOverview';
import Campaign from './type.Campaign';
import PageResponse from './type.PageResponse';

type PlaneSummary = PageResponse<AdvertPlaneOfSummary> & {
  weeks: string[];
};

export type AdvertPlaneOfSummary = AdvertPlaneOverview & {
  occupyingCampaigns: PlaneWeekCampaign[];
};

type PlaneWeekCampaign = Campaign & {
  week: string;
};

export default PlaneSummary;
