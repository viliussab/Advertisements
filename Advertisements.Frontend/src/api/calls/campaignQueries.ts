import CampaignsQuery from '../queries/type.CampaignsQuery';
import Campaign from '../responses/type.Campaign';
import CampaignOverview from '../responses/type.CampaignOverview';
import Customer from '../responses/type.Customer';
import PageResponse from '../responses/type.PageResponse';
import api from './api';

const getCustomersAsync = async () => {
  const response = await api.queryAsync({
    url: api.endpoints.common.campaigns.customer,
  });

  return response.data as Customer[];
};

const getCampaignAsync = async (id: string) => {
  const response = await api.queryAsync({
    url: `${api.endpoints.common.campaigns.campaign}/${id}`,
  });

  return response.data as Campaign;
};

const getPagedCampaignsAsync = async (query: CampaignsQuery) => {
  const response = await api.queryAsync({
    url: api.endpoints.common.campaigns.campaign,
    query,
  });

  return response.data as PageResponse<CampaignOverview>;
};

const campaignQueries = {
  customers: {
    fn: getCustomersAsync,
    key: 'customers',
  },
  campaign: {
    fn: getCampaignAsync,
    key: 'campaign',
  },
  pagedCampaigns: {
    fn: getPagedCampaignsAsync,
    key: 'paged_campaigns',
  },
};

export default campaignQueries;
