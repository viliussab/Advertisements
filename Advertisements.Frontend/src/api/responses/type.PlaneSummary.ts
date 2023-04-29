import AdvertPlaneOverview from './type.AdvertPlaneOverview';
import Campaign from './type.Campaign';
import CampaignOverview from './type.CampaignOverview';
import CampaignPlane from './type.CampaignPlane';
import PageResponse from './type.PageResponse';

type PlaneSummary = PageResponse<AdvertPlaneOfSummary> & {
  weeks: string[];
};

export type AdvertPlaneOfSummary = AdvertPlaneOverview & {
  occupyingCampaigns: PlaneWeekCampaign[];
};

type PlaneWeekCampaign = Campaign & {
  campaignPlanes: CampaignPlane[];
  week: string;
};

export default PlaneSummary;
