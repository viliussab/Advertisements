import Campaign from './type.Campaign';
import Customer from './type.Customer';

type CampaignOverview = Campaign & {
  customer: Customer;
  weekCount: number;
  totalNoVat: number;
};

export default CampaignOverview;
