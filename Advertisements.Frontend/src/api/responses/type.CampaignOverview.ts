import Campaign from './type.Campaign';
import CampaignPlane from './type.CampaignPlane';
import Customer from './type.Customer';

type CampaignOverview = Campaign & {
  customer: Customer;
  weekCount: number;
  totalNoVat: number;
  weeklyPrice: number;
  campaignPlanes: CampaignPlane[];
};

export default CampaignOverview;
