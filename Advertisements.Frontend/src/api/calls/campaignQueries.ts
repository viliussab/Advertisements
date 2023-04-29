import CampaignsQuery from '../queries/type.CampaignsQuery';
import CampaignSummaryQuery from '../queries/type.CampaignSummaryQuery';
import CampaignOption from '../responses/type.CampaignOption';
import CampaignOverview from '../responses/type.CampaignOverview';
import CampaignSummaryWeek from '../responses/type.CampaignSummaryWeek';
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

  return response.data as CampaignOverview;
};

const getPagedCampaignsAsync = async (query: CampaignsQuery) => {
  const response = await api.queryAsync({
    url: api.endpoints.common.campaigns.campaign,
    query,
  });

  return response.data as PageResponse<CampaignOverview>;
};

const getCampaignSummaryAsync = async (query: CampaignSummaryQuery) => {
  const response = await api.queryAsync({
    url: api.endpoints.campaign.summary,
    query,
  });

  return response.data as CampaignSummaryWeek[];
};

const getCampaignOptionsAsync = async () => {
  const response = await api.queryAsync({
    url: api.endpoints.campaign.options,
  });

  return response.data as CampaignOption[];
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
  campaignSummary: {
    fn: getCampaignSummaryAsync,
    key: 'campaign_summary',
  },
  campaignOptions: {
    fn: getCampaignOptionsAsync,
    key: 'campaign_options',
  },
};

export default campaignQueries;
